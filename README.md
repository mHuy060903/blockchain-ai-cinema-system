# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


# Cinema Ticket Booking System  

## Giới thiệu  
Cinema Ticket Booking System là một ứng dụng web cho phép người dùng tìm kiếm, đặt vé và quản lý thông tin vé xem phim trực tuyến. Hệ thống được xây dựng với giao diện thân thiện và chức năng tiện ích, giúp người dùng dễ dàng trải nghiệm dịch vụ mua vé xem phim nhanh chóng.  

## Công nghệ sử dụng  
- **Frontend**: ReactJS  
- **Backend**: Node.js  
- **Cơ sở dữ liệu**: Supabase  
![image](https://github.com/user-attachments/assets/c2a4a01e-7a94-445b-8a00-4cb519ad5781)

## Các tính năng chính  
1. **Đăng ký và đăng nhập**:  
   - Người dùng có thể đăng ký tài khoản mới và đăng nhập để sử dụng các chức năng của hệ thống.  
   - Xác thực người dùng qua Supabase.  

2. **Tìm kiếm phim**:  
   - Xem danh sách phim hiện đang chiếu.  
   - Xem thông tin chi tiết về từng bộ phim (thời lượng, thể loại, mô tả).  

3. **Đặt vé xem phim**:  
   - Lựa chọn rạp chiếu, thời gian, và ghế ngồi.  
   - Hiển thị trạng thái ghế đã đặt hoặc còn trống.  
![image](https://github.com/user-attachments/assets/0d943480-2bb9-4b16-bc41-c849487525de)
![image](https://github.com/user-attachments/assets/56b617bc-dcba-49a2-9302-24e671b9adde)

4. **Thanh toán**:  
   - Hỗ trợ các phương thức thanh toán trực tuyến.  
![image](https://github.com/user-attachments/assets/25c6738e-9e3f-4102-9f70-7ad9617a16b7)

5. **Quản lý đặt chỗ**:  
   - Xem danh sách các vé đã đặt.  
   - Hủy vé (nếu cần).  
![image](https://github.com/user-attachments/assets/a18526b1-d43a-4e58-8ddb-fcc2bb775875)

6. **Chức năng quản trị**:  
   - Quản lý danh sách phim, rạp chiếu, lịch chiếu và ghế ngồi.
![Screenshot 2024-12-18 085754](https://github.com/user-attachments/assets/d5f5b92c-2a9e-48a3-9494-b8336f1df469)

![image](https://github.com/user-attachments/assets/85c7463b-76df-4f02-976f-af4ecd85a306)
7. **Chức năng Scan Qrcode**: 
- Có thể scan bằng camera hoặc hình ảnh
![image](https://github.com/user-attachments/assets/e5d14b9c-dce8-4417-9f6c-ad1271bd1be2)
8. **Sử dụng map để hiển thị location cinema**: 
![image](https://github.com/user-attachments/assets/679e5be1-6031-4c0c-ae2e-48b22f5a322a)
9. **Light mode và dark mode**:
10. **Chat realtime giữa người dùng và quản trị viên**:
  ![image](https://github.com/user-attachments/assets/8cb5f720-0e7b-457d-8dbd-11bd186af3df)
![image](https://github.com/user-attachments/assets/6530d168-1e3f-4299-8cc4-720e641ef854)

11.**Customize seat trong một rạp chiếu phim**:
  ![image](https://github.com/user-attachments/assets/0fbca188-ac31-414c-9a28-aa3409cd1b86)

## Cài đặt và chạy dự án  

### Yêu cầu  
- Node.js v16 trở lên  
- Supabase account  

### Các bước cài đặt  
1. Clone repository:  
   ```bash  
   git clone https://github.com/mHuy060903/cinema_ticket_booking_system.git  
   cd cinema_ticket_booking_system  
   ```  

2. Cài đặt các package:  
   ```bash  
   npm install  
   ```  

3. Thiết lập biến môi trường:  
   - Tạo tệp `.env` trong thư mục chính.  
   - Thêm các biến môi trường cần thiết để kết nối với Supabase.  
     ```env  
     REACT_APP_SUPABASE_URL=your_supabase_url  
     REACT_APP_SUPABASE_KEY=your_supabase_key  
     ```  

4. Chạy ứng dụng:  
   ```bash  
   npm start  
   ```  
   - Truy cập ứng dụng tại [http://localhost:3000](http://localhost:3000).  



---  

