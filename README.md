# BT3: LẬP TRÌNH ỨNG DỤNG WEB Trên Nền Linux - Môn: Phát triển ứng dụng trên nền web
# Nguyễn Mạnh Hiếu - K225480106020
## Yêu cầu:
1. Cài đặt môi trường linux: SV chọn 1 trong các phương án
 - enable wsl: cài đặt docker desktop
 - enable wsl: cài đặt ubuntu
 - sử dụng Hyper-V: cài đặt ubuntu
 - sử dụng VMware : cài đặt ubuntu
 - sử dụng Virtual Box: cài đặt ubuntu

==> chọn: enable wsl: cài đặt docker desktop

2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)
3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)
4. Lập trình web frontend+backend:
 
 SV chọn 1 trong các web sau:
 
 4.1 Web thương mại điện tử
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session
   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.
 - Có tính năng liệt kê các sản phẩm bán chạy ra trang chủ
 - Có tính năng liệt kê các nhóm sản phẩm
 - Có tính năng liệt kê sản phẩm theo nhóm
 - Có tính năng tìm kiếm sản phẩm
 - Có tính năng chọn sản phẩm (đưa sản phẩm vào giỏ hàng, thay đổi số lượng sản phẩm trong giỏ, cập nhật tổng tiền)
 - Có tính năng đặt hàng, nhập thông tin giao hàng => được 1 đơn hàng.
 - Có tính năng dành cho admin: Thống kê xem có bao nhiêu đơn hàng, call để xác nhận và cập nhật thông tin đơn hàng. chuyển cho bộ phận đóng gói, gửi bưu điện, cập nhật mã COD, tình trạng giao hàng, huỷ hàng,...
 - Có tính năng dành cho admin: biểu đồ thống kê số lượng mặt hàng bán được trong từng ngày. (sử dụng grafana)
 - backend: sử dụng nodered xử lý request gửi lên từ javascript, phản hồi về json.
5. Nginx làm web-server
 - Cấu hình nginx để chạy được website qua url http://fullname.com  (thay fullname bằng chuỗi ko dấu viết liền tên của bạn)
 - Cấu hình nginx để http://fullname.com/nodered truy cập vào nodered qua cổng 80, (dù nodered đang chạy ở port 1880)
 - Cấu hình nginx để http://fullname.com/grafana truy cập vào grafana qua cổng 80, (dù grafana đang chạy ở port 3000)
_____
1. Cài đặt môi trường linux: enable wsl: cài đặt docker desktop

- Kích hoạt WSL: Mở CMD với quyền Administrator chạy lệnh wsl --install --> Restart

<img width="1216" height="419" alt="image" src="https://github.com/user-attachments/assets/a816c3b9-d370-4f6c-8bcd-5a529b1f2cdc" />

- Cài đặt một bản phân phối Linux: chạy lệnh wsl --install -d Ubuntu --> Tạo User

<img width="1085" height="486" alt="Screenshot 2025-11-04 215622" src="https://github.com/user-attachments/assets/8ae5f0c7-a69e-4bab-8004-15e618c7301b" />

2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)

- Tải và cài đặt docker desktop --> Restart

<img width="913" height="645" alt="image" src="https://github.com/user-attachments/assets/75209cd4-8a2f-463b-9b0a-520a4906b49b" />

<img width="1006" height="632" alt="image" src="https://github.com/user-attachments/assets/cbe44d9a-9481-4c3f-96d4-0252662f1721" />

3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)

- Tạo thư mục trong ổ E: cd /mnt/e --> Tạo thư mục dự án: mkdir tnut_food cd tnut_food --> Tạo cấu trúc thư mục: mkdir data config frontend mkdir config/nginx

<img width="1103" height="439" alt="Screenshot 2025-11-05 154227" src="https://github.com/user-attachments/assets/12050b1c-f88c-41fe-93b3-399ffc10704f" />

- Tạo file nano docker-compose.yml và cấu hình:

<img width="1274" height="711" alt="image" src="https://github.com/user-attachments/assets/81d14627-2c4c-4ac1-8c1f-f4b76b793a06" />

- Cấu hình Nginx: Tạo file bằng lệnh nano config/nginx/nginx.conf --> Cấu hình

<img width="1363" height="685" alt="image" src="https://github.com/user-attachments/assets/0b558fb7-2ee0-4cea-ac23-eb965b962e75" />

- Chạy Docker Compose và Kiểm tra: docker-compose up -d

<img width="1463" height="276" alt="image" src="https://github.com/user-attachments/assets/6f3b9f90-4eff-498c-9422-4729a9b8ea7b" />

- Cấu hình File Hosts: Mở Notepad với quyền Administrator mở file C:\Windows\System32\drivers\etc\hosts và thêm 127.0.0.1 nguyenmanhhieu.com

- Kiểm tra: http://localhost:8080 , http://nguyenmanhhieu.com/nodered/ , http://nguyenmanhhieu.com/grafana/

<img width="1904" height="1027" alt="Screenshot 2025-11-05 163615" src="https://github.com/user-attachments/assets/c7bd4976-878e-47b4-ae13-ea7daf867be8" />

<img width="1919" height="1027" alt="image" src="https://github.com/user-attachments/assets/02c46af9-f818-49e7-a9b7-5ab9b4e6e46b" />

<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/fea5574b-7aba-41f3-a488-3bc895ded958" />

4. Lập trình web frontend+backend: Website đặt đồ ăn online cho của hàng TNUT

- Chuẩn bị database: truy cập PhpMyAdmin: http://localhost:8080 --> Chọn database tnut_food được tạo bởi docker-compose

- Tạo các bảng: users(người dùng), categories(nhóm sản phẩm), products(sản phẩm), orders(đơn hàng), và order_items(chi tiết đơn hàng)

<img width="1276" height="206" alt="Screenshot 2025-11-06 204034" src="https://github.com/user-attachments/assets/099705e1-5db7-4715-8d00-9d4ddc7e4138" />

- Thêm dữ liệu vào các bảng:

<img width="450" height="180" alt="image" src="https://github.com/user-attachments/assets/29bf995e-a64d-4be2-bc2b-75606354bd6f" />

<img width="1035" height="173" alt="image" src="https://github.com/user-attachments/assets/d9e06417-92a8-44a3-a3ad-d0ece83c2251" />

- Truy cập Nodered --> cài đặt node-red-contrib-mysql và node-red-contrib-bcrypt

<img width="952" height="704" alt="Screenshot 2025-11-06 204821" src="https://github.com/user-attachments/assets/daab8354-1785-4498-a048-7799bf7b1979" />

<img width="960" height="606" alt="image" src="https://github.com/user-attachments/assets/b89f274a-a73d-4ea8-8326-798e476da65f" />

- Tạo luồng flow1: API đăng ký User

<img width="1314" height="377" alt="image" src="https://github.com/user-attachments/assets/8d7449ca-65f0-4c87-b9e3-ef10ade9adc5" />

- Kiểm thử bằng Postman: Request: POST đến http://nguyenmanhhieu.com/nodered/api/register và Body (raw/json): Gửi thông tin user admin và password (dạng plain-text)

<img width="1055" height="807" alt="image" src="https://github.com/user-attachments/assets/7a249879-00d6-4cfe-ac30-e78bd3952ffa" />

--> : Sau khi Postman báo thành công vào PhpMyAdmin kiểm tra --> bảng users đã có 1 hàng mới

<img width="1428" height="257" alt="image" src="https://github.com/user-attachments/assets/4ba318f5-5853-4307-b6e1-ac9e029eb4bf" />

- Tạo luồng flow2: API đăng nhập

<img width="1259" height="780" alt="image" src="https://github.com/user-attachments/assets/bc9d3289-c628-4c71-b2c8-ab441afa3edb" />

- Kiểm thử: với mật khẩu sai và đúng

<img width="1064" height="842" alt="image" src="https://github.com/user-attachments/assets/cb6a177a-d3a1-44d9-8fc5-6f39ea287cb6" />

<img width="1077" height="810" alt="image" src="https://github.com/user-attachments/assets/5c71b076-5ba8-4c5b-909e-6cfffc14fa7c" />

- Tạo API Liệt Kê Danh Sách Sản Phẩm:

<img width="1089" height="390" alt="image" src="https://github.com/user-attachments/assets/06a548fb-52c5-4fd4-9462-7371992e8553" />

- Truy cập http://nguyenmanhhieu.com/nodered/api/products để kiểm tra

<img width="466" height="643" alt="image" src="https://github.com/user-attachments/assets/e2c4adfb-00c5-42db-86d0-973283b0ae5c" />

- Tạo API Liệt Kê Nhóm Sản Phẩm:

<img width="1164" height="308" alt="image" src="https://github.com/user-attachments/assets/631ab1e8-d7eb-4903-baaf-06f3bc04a4ef" />

- Truy cập http://nguyenmanhhieu.com/nodered/api/categories để kiểm tra

<img width="251" height="418" alt="image" src="https://github.com/user-attachments/assets/e233e6ac-39a0-4573-bc19-a1304c10f5d6" />

--> Sửa API Lấy Danh Sách Sản Phẩm để có thể tìm kiếm theo sản phẩm

<img width="814" height="484" alt="image" src="https://github.com/user-attachments/assets/ff0c1ba7-b564-445b-ab10-8fbec6774968" />

- Tạo API Đặt hàng:

<img width="1180" height="574" alt="image" src="https://github.com/user-attachments/assets/df52e05a-11a9-420c-9185-badeb60447b3" />

- Web đặt đồ ăn online:

<img width="1917" height="997" alt="image" src="https://github.com/user-attachments/assets/84d126fc-8e08-43e0-8e59-04c9ba3a6c88" />
