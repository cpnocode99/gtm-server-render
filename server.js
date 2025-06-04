const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID || 'GTM-XXXXXXX';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(
  '/',
  createProxyMiddleware({
    target: `https://region1.google-analytics.com/g/collect?gtm=${GTM_CONTAINER_ID}`,
    changeOrigin: true,
    pathRewrite: {
      '^/': '/',
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[GTM-Proxy] ${req.method} ${req.url}`);
    }
  })
);
app.get('/healthy', (req, res) => {
  res.status(200).send('OK');
});
app.listen(PORT, () => {
  console.log(`GTM Server Container proxy chạy tại http://localhost:${PORT}`);
});
