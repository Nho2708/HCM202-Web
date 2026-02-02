# Hướng dẫn cấu hình và chạy ngrok cho dự án HCM Learning

Dự án này đã được cấu hình để chạy ngrok cho cả **Frontend (Port 5173)** và **Backend (Port 5001)**.

## Bước 1: Cài đặt ngrok
Nếu bạn chưa có ngrok, hãy tải và cài đặt tại: [https://ngrok.com/download](https://ngrok.com/download)

## Bước 2: Thiết lập Authtoken
1. Đăng nhập vào [ngrok Dashboard](https://dashboard.ngrok.com/).
2. Copy **Your Authtoken**.
3. Mở file `ngrok.yml` trong thư mục gốc của dự án và dán token vào chỗ `YOUR_AUTHTOKEN_HERE`.
   - Hoặc chạy lệnh: `& "C:\Program Files\ngrok-v3\ngrok.exe" config add-authtoken <TOKEN_CỦA_BẠN>` (Nếu dùng PowerShell/Terminal).
   - Nếu dùng CMD: `"C:\Program Files\ngrok-v3\ngrok.exe" config add-authtoken <TOKEN_CỦA_BẠN>`

## Bước 3: Chạy dự án
Đảm bảo cả Frontend và Backend đều đang chạy:
- Terminal 1 (Backend): `cd backend && npm start`
- Terminal 2 (Frontend): `npm run dev`

## Bước 4: Chạy ngrok
Mở một Terminal mới và chạy lệnh:
```bash
npm run ngrok
```
Sau khi chạy, ngrok sẽ cung cấp cho bạn 2 đường dẫn (Forwarding):
- Một đường dẫn cho **Frontend** (ví dũ: `https://abc-123.ngrok-free.app`)
- Một đường dẫn cho **Backend** (ví dụ: `https://xyz-456.ngrok-free.app`)

## Bước 5: Cập nhật biến môi trường (.env)
Sau khi có các URL từ ngrok, bạn cần cập nhật file `.env` ở thư mục gốc để Frontend có thể gọi API từ Backend thông qua ngrok:

1. Copy URL ngrok của **Backend**.
2. Mở file `.env` ở thư mục gốc.
3. Cập nhật dòng `VITE_API_BASE_URL`:
   ```env
   VITE_API_BASE_URL=https://xyz-456.ngrok-free.app
   ```
4. Lưu file và tải lại trang web (F5).

---
**Lưu ý:** 
- Nếu bạn dùng tài khoản ngrok miễn phí, URL sẽ thay đổi mỗi khi bạn khởi động lại ngrok. Bạn sẽ cần cập nhật lại file `.env` tương ứng.
- Để sử dụng ổn định hơn, bạn có thể cân nhắc đăng ký gói trả phí của ngrok để có subdomain cố định.
