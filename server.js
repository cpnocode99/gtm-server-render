const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

// Đọc GTM Container ID từ biến môi trường (đặt trong Render Dashboard)
const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID;

if (!GTM_CONTAINER_ID) {
  console.error('❌ Thiếu GTM_CONTAINER_ID. Vui lòng cấu hình trong Render Environment Variables.');
  process.exit(1);
}

// Proxy toàn bộ request đến GTM server endpoint
app.use(
  '/',
  createProxyMiddleware({
    target: `https://gtm-server-tag.google.com/`,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return `/${GTM_CONTAINER_ID}${path}`;
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[GTM-Proxy] ${req.method} ${req.url}`);
    }
  })
);

// Endpoint ping cron job để giữ server không sleep
app.get('/healthy', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 GTM Server Container proxy is running on port ${PORT}`);
});
