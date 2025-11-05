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

- Kiểm tra: http://localhost:8080 , http://nguyenmanhhieu.com/nodered , http://nguyenmanhhieu.com/grafana

<img width="1904" height="1027" alt="Screenshot 2025-11-05 163615" src="https://github.com/user-attachments/assets/c7bd4976-878e-47b4-ae13-ea7daf867be8" />
