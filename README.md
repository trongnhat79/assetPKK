# AssetPKK — Quản lý tài sản IT

Giao diện quản lý tài sản nội bộ, bố trí theo mẫu Excel hiện có của PKK.

## Các trường dữ liệu
- No
- Họ Và Tên
- MSNV
- Chức vụ
- Phòng ban
- Ghi chú
- Ngày cấp
- MTS1
- S/N1
- Loại TS1
- Model1

## Chức năng giao diện hiện tại
- Dashboard thống kê tổng tài sản, đang sử dụng, sẵn sàng, đang sửa chữa.
- Tìm kiếm theo nhân viên, MSNV, mã tài sản, serial, loại thiết bị, model, phòng ban.
- Lọc theo trạng thái, loại tài sản và phòng ban.
- Thêm, sửa, xóa bản ghi tài sản.
- Xuất danh sách đã lọc thành CSV UTF-8 mở được bằng Excel.
- Responsive cho màn hình máy tính bảng và điện thoại.

## Chạy thử trên máy tính
Yêu cầu Node.js LTS.

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Lưu ý quan trọng
Đây mới là **bản giao diện thử nghiệm** với dữ liệu minh họa. Các thao tác thêm/sửa/xóa chỉ giữ trong bộ nhớ của trình duyệt và sẽ mất khi tải lại trang. Chưa kết nối cơ sở dữ liệu, đăng nhập Microsoft Entra ID, phân quyền, nhật ký bàn giao hoặc nhập dữ liệu Excel thật. Không sử dụng dữ liệu nhân viên/tài sản thật cho đến khi hoàn thiện các phần này.

## Các bước tiếp theo
1. Xác nhận cách tổ chức nhiều tài sản cho một nhân viên (MTS1/SN1/Loại TS1/Model1, có thể tiếp tục MTS2...).
2. Thiết kế cơ sở dữ liệu chuẩn hóa tài sản và nhân viên.
3. Thêm import Excel, lịch sử cấp phát/thu hồi, xác thực Microsoft 365 và phân quyền.
4. Triển khai ứng dụng lên môi trường nội bộ an toàn.
