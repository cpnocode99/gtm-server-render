# gtm-server-render

Triển khai Google Tag Manager Server Container trên Render.com

## Cài đặt

1. Fork repo về GitHub
2. Deploy trên Render (Web Service):
   - Build: `npm install`
   - Start: `npm start`
   - Node 16+
3. Thêm biến môi trường:
   - `GTM_CONTAINER_ID=GTM-XXXXXXX`
4. Dùng URL Render tạo ra để cấu hình cho GTM Web Container
5. (Khuyên dùng) Ping cron `https://your-app.onrender.com/healthy` mỗi 10 phút để tránh sleep
