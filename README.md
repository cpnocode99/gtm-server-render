# GTM Server Render

Triển khai Google Tag Manager Server container trên Render.com

## Hướng dẫn triển khai

1. Fork repo này về GitHub của bạn
2. Tạo Web Service trên [https://dashboard.render.com](https://dashboard.render.com)
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Thêm biến môi trường:
   - `GTM_CONTAINER_ID=GTM-XXXXXXX` (ID container GTM Server-side)
4. Dùng domain Render tạo ra (ví dụ: `https://gtm-server-xyz.onrender.com`) để cấu hình trong GTM Web
5. (Khuyến nghị) Ping `/healthy` mỗi 10 phút để tránh sleep
****
