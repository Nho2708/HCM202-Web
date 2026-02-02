# Hướng dẫn chạy Dự án Online (Hybrid: ngrok + localtunnel)

Vì tài khoản ngrok miễn phí chỉ cho phép 1 tunnel, chúng ta sẽ sử dụng kết hợp:
- **Backend (API):** Dùng `ngrok` (Cổng 5001)
- **Frontend (Web):** Dùng `localtunnel` (Cổng 5173)

---

## Bước 1: Khởi chạy các dịch vụ nội bộ
Đảm bảo bạn đã mở 2 terminal để chạy dự án:
1. **Backend:** `cd backend && npm start`
2. **Frontend:** `npm run dev`

---

## Bước 2: Chạy ngrok cho Backend
Mở một terminal mới (Terminal 3) và chạy:
```bash
npm run ngrok
```
- Bạn sẽ nhận được một URL ngrok (ví dụ: `https://xyz-456.ngrok-free.app`).
- **Copy URL này.**

---

## Bước 3: Cập nhật biến môi trường (.env)
Dán URL ngrok vừa copy vào file `.env` ở thư mục gốc:
```env
VITE_API_BASE_URL=https://xyz-456.ngrok-free.app
```
**Lưu ý:** Phải lưu file `.env` thì bước tiếp theo mới có tác dụng.

---

## Bước 4: Chạy localtunnel cho Frontend
Mở một terminal mới (Terminal 4) và chạy:
```bash
npm run lt
```
- Bạn sẽ nhận được một URL localtunnel (ví dụ: `https://curvy-cats-run.loca.lt`).
- Khi truy cập link này lần đầu, nó sẽ yêu cầu bạn nhập **IP Public** của máy bạn để xác thực.
- Cách lấy IP: Truy cập [https://localtunnel.me/tunnel-use-tips/](https://localtunnel.me/tunnel-use-tips/) hoặc gõ `curl ifconfig.me` vào terminal.

---

## Tóm tắt quy trình:
1. Chạy Backend & Frontend.
2. Chạy `npm run ngrok` -> Lấy URL Backend.
3. Dán URL Backend vào `.env`.
4. Chạy `npm run lt` -> Lấy URL Frontend để gửi cho người khác.
