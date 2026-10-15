# AssetPKK — Quản lý tài sản IT

Ứng dụng web nội bộ để theo dõi máy tính, màn hình và thiết bị IT theo mã tài sản/serial, người sử dụng, tình trạng và lịch sử bàn giao.

## Công nghệ
- Next.js + TypeScript
- Tailwind CSS
- Lucide icons

## Chạy ở máy cá nhân
1. Cài Node.js bản LTS.
2. Mở terminal tại thư mục dự án.
3. Chạy `npm install`.
4. Chạy `npm run dev`.
5. Mở http://localhost:3000.

## Trạng thái hiện tại
Bản khởi tạo giao diện dashboard với dữ liệu minh họa phía trình duyệt. Chưa kết nối cơ sở dữ liệu, đăng nhập Microsoft Entra ID hoặc lưu trữ dùng chung. Không nhập dữ liệu tài sản thật cho đến khi hoàn tất phần xác thực và cơ sở dữ liệu.

## Lộ trình tiếp theo
- Kết nối PostgreSQL/Supabase và thiết lập phân quyền.
- Đăng nhập Microsoft Entra ID.
- CRUD tài sản, nhân viên và bàn giao.
- Nhật ký thay đổi, nhập/xuất Excel và triển khai môi trường production.
