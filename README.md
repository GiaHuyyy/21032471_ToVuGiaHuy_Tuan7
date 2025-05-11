flowchart TD
    Start([Bắt đầu]) --> AccessRegPage[Truy cập trang đăng ký]
    AccessRegPage --> DisplayForm[Hiển thị form đăng ký]
    DisplayForm --> InputInfo[Nhập thông tin]
    InputInfo --> ClickRegister[Nhấn nút Đăng ký]
    ClickRegister --> ValidateData{Kiểm tra tính hợp lệ của dữ liệu}
    ValidateData -->|Không hợp lệ| ShowInvalidError[Hiển thị thông báo lỗi]
    ShowInvalidError --> InputInfo
    ValidateData -->|Hợp lệ| CheckExisting{Kiểm tra email/SĐT đã tồn tại}
    CheckExisting -->|Đã tồn tại| ShowExistError[Hiển thị lỗi đã tồn tại]
    ShowExistError --> InputInfo
    CheckExisting -->|Chưa tồn tại| HashPassword[Mã hóa mật khẩu]
    HashPassword --> SaveUserInfo[Lưu thông tin vào CSDL]
    SaveUserInfo --> CreateAvatar[Tạo ảnh đại diện mặc định]
    CreateAvatar --> ShowSuccess[Hiển thị thông báo thành công]
    ShowSuccess --> RedirectLogin[Chuyển đến trang đăng nhập]
    RedirectLogin --> UserLogin[Người dùng đăng nhập]
    UserLogin --> End([Kết thúc])
    
    AccessRegPage -->|Đã có tài khoản| GoToLogin[Chọn đăng nhập]
    GoToLogin --> RedirectLogin
