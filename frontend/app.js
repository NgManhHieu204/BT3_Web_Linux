const app = document.getElementById('app-container');

const apiUrl = 'http://nguyenmanhhieu.com/nodered/api';

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

function navigate() {
    // 1. Cập nhật UI 
    checkLoginUI();
    
    // 2. Lấy "hash" từ URL 
    const hash = window.location.hash || '#/';
    
    // 3. Quyết định "vẽ" trang nào
    if (hash === '#/') {
        loadHomePage();
    } else if (hash === '#/login') {
        loadLoginPage();
    } else if (hash.startsWith('#/category/')) {
        const categoryId = hash.split('/')[2];
        loadProductsPage(categoryId);
    } else if (hash === '#/cart') {
        loadCartPage();
    } else if (hash === '#/admin') {
        loadAdminPage();
    } else if (hash === '#/logout') {
        handleLogout();
    }
}


// Vẽ Trang Chủ
async function loadHomePage() {
    app.innerHTML = '<h2>Đang tải thực đơn...</h2>';
    try {
        // Gọi API /api/products (Món 3)
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();
        
        let html = '<h2>Thực Đơn Hôm Nay</h2>';
        html += '<div class="product-list">';
        
        products.forEach(p => {
           html += `
                <div class="product-item">
                <img src="${ p.image_url || 'https://via.placeholder.com/200x150.png?text=No+Image' }" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <div class="price">${p.price} VNĐ</div>
                    <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Thêm vào giỏ</button>
                </div>
            `;
        });
        
        html += '</div>';
        app.innerHTML = html;

    } catch (err) {
        app.innerHTML = '<h2>Lỗi tải dữ liệu từ API. Sếp check lại "con ma 504" đi.</h2>';
    }
}

// Vẽ Trang Đăng Nhập
function loadLoginPage() {
    app.innerHTML = `
        <h2>Đăng Nhập</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="username">Tên đăng nhập:</label>
                <input type="text" id="username" required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit" class="btn">Đăng nhập</button>
        </form>
    `;
    
    // Gắn "bộ nghe" sự kiện submit
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Vẽ Trang Giỏ Hàng & Đặt Hàng
function loadCartPage() {
    if (cart.length === 0) {
        app.innerHTML = '<h2>Giỏ hàng của bạn đang trống.</h2><p>Ra <a href="#/">trang chủ</a> chọn món đi!</p>';
        return;
    }

    let html = '<h2>Giỏ Hàng Của Bạn</h2>';
    let totalMoney = 0;

    // "Vẽ" các món trong giỏ
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalMoney += itemTotal;
        html += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>${itemTotal} VNĐ</span>
            </div>
        `;
    });

    html += `<h3>Tổng cộng: ${totalMoney} VNĐ</h3>`;
    
    // "Vẽ" form đặt hàng (Yêu cầu đề bài)
    html += `
        <hr>
        <h2>Thông Tin Giao Hàng</h2>
        <form id="order-form">
            <div class="form-group">
                <label for="customer_name">Họ tên:</label>
                <input type="text" id="customer_name" required>
            </div>
            <div class="form-group">
                <label for="customer_phone">Số điện thoại:</label>
                <input type="tel" id="customer_phone" required>
            </div>
            <div class="form-group">
                <label for="customer_address">Địa chỉ (Phòng, Ký túc xá):</label>
                <input type="text" id="customer_address" required>
            </div>
            <button type="submit" class="btn">Xác Nhận Đặt Hàng</button>
        </form>
    `;
    
    app.innerHTML = html;
    
    // Gắn "bộ nghe" sự kiện submit cho form đặt hàng
    document.getElementById('order-form').addEventListener('submit', handlePlaceOrder);
}

// Vẽ Trang Quản Trị
async function loadAdminPage() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    // 1. Kiểm tra "giấy tờ"
    if (!user || user.role !== 'admin') {
        app.innerHTML = '<h2>LỖI TRUY CẬP</h2><p>Chỉ có Admin mới được vào đây. Vui lòng <a href="#/login">đăng nhập</a>.</p>';
        return;
    }
    
    // 2. "Vẽ" trang
    app.innerHTML = `
        <h2>Chào sếp, ${user.username}!</h2>
        <div class="admin-panel">
            
            <div class="grafana-chart">
                <h3>Thống kê doanh thu</h3>
                <iframe 
                    src="http://nguyenmanhhieu.com/grafana/d-solo/your_dashboard_id_here/your-dashboard-name?orgId=1&panelId=2&theme=light" 
                    width="100%" 
                    height="300" 
                    frameborder="0">
                </iframe>
                <p></p>
            </div>
            
            <div class="admin-orders">
                <h3>Quản lý đơn hàng</h3>
                <table id="orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        <tr><td colspan="7">Đang tải đơn hàng...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // 5. Gọi API lấy đơn hàng
    try {
        const response = await fetch(`${apiUrl}/admin/orders`);
        const orders = await response.json();
        const tbody = document.getElementById('orders-tbody');
        
        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">Chưa có đơn hàng nào.</td></tr>';
            return;
        }
        
        let ordersHtml = '';
        orders.forEach(order => {
            ordersHtml += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.customer_phone}</td>
                    <td>${order.customer_address}</td>
                    <td>${order.total_price} VNĐ</td>
                    <td>${order.status}</td>
                    <td>
                        <button class="btn-danger" onclick="updateOrderStatus(${order.id}, 'cancelled')">Huỷ đơn</button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = ordersHtml;
        
    } catch (err) {
        document.getElementById('orders-tbody').innerHTML = '<tr><td colspan="7">Lỗi tải đơn hàng.</td></tr>';
    }
}


// Xử lý khi nhấn nút "Đăng nhập"
async function handleLogin(event) {
    event.preventDefault(); // Ngăn form tự reload
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.status === 200) { // Đăng nhập OK
            alert(data.message);
            // Lưu "vé" vào ví (SessionStorage)
            sessionStorage.setItem('user', JSON.stringify(data.user));
            // Lưu "vé" vào túi (Cookie) (Yêu cầu đề bài)
            document.cookie = `isLoggedIn=true; max-age=86400; path=/`; // 86400s = 1 ngày
            
            // Bay về trang chủ
            window.location.hash = '#/';
            
        } else if (response.status === 401) { // Sai pass
            alert(data.message); // Báo lỗi (Sai pass)
        } else {
            alert('Lỗi 504! "Con ma" Time-out lại xuất hiện!');
        }
        
    } catch (err) {
        alert('Lỗi kết nối tới API. Chắc chắn là "con ma 504" rồi.');
    }
}

// Xử lý khi nhấn nút "Đăng xuất"
function handleLogout() {
    sessionStorage.removeItem('user');
    document.cookie = 'isLoggedIn=; max-age=0; path=/';
    alert('Đã đăng xuất');
    navigate();
}

// Xử lý khi nhấn nút "Xác Nhận Đặt Hàng"
async function handlePlaceOrder(event) {
    event.preventDefault();
    
    // 1. Lấy thông tin khách
    const customer = {
        name: document.getElementById('customer_name').value,
        phone: document.getElementById('customer_phone').value,
        address: document.getElementById('customer_address').value,
    };
    
    // 2. Gom "gói hàng"
    const orderData = {
        customer: customer,
        cart: cart // Biến "trí nhớ" toàn cục
    };
    
    try {
        // 3. Gửi "gói hàng" về "bếp"
        const response = await fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (response.status === 201) { // Đặt hàng OK
            alert(`Đặt hàng thành công! Mã đơn của bạn là: ${data.order_id}`);
            // Xoá giỏ hàng
            cart = [];
            sessionStorage.removeItem('cart');
            updateCartCount();
            
            // Bay về trang chủ
            window.location.hash = '#/';
        } else {
            alert('Lỗi! Không thể đặt hàng. Sếp kiểm tra lại "ma 504" đi.');
        }
    } catch (err) {
        alert('Lỗi 504. API Đặt Hàng bị treo.');
    }
}

async function updateOrderStatus(orderId, newStatus) {
    if (!confirm(`Bạn có chắc muốn đổi trạng thái đơn ${orderId} thành "${newStatus}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}/admin/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        
        const data = await response.json();
        alert(data.message);
        loadAdminPage();
        
    } catch (err) {
        alert('Lỗi 504... Lại là nó.');
    }
}

// Thêm món vào "trí nhớ" giỏ hàng
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Đã thêm "${name}" vào giỏ!`);
}

// Cập nhật số (0) trên icon giỏ hàng
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Kiểm tra và đổi nút Login/Logout/Admin
function checkLoginUI() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navLogin = document.getElementById('nav-login');
    const navAdmin = document.getElementById('nav-admin');
    const navLogout = document.getElementById('nav-logout');
    
    if (user) {
        // Đã đăng nhập
        navLogin.style.display = 'none';
        navLogout.style.display = 'inline';
        if (user.role === 'admin') {
            navAdmin.style.display = 'inline';
        } else {
            navAdmin.style.display = 'none';
        }
    } else {
        // Chưa đăng nhập
        navLogin.style.display = 'inline';
        navLogout.style.display = 'none';
        navAdmin.style.display = 'none';
    }
    
    // Cập nhật giỏ hàng luôn
    updateCartCount();
}