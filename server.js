const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 8080;

const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID;
if (!GTM_CONTAINER_ID) {
  console.error("❌ GTM_CONTAINER_ID is not set");
  process.exit(1);
}

const targetUrl = `https://gtm-server-tag.google.com/${GTM_CONTAINER_ID}`;

// Forward các route thường dùng
const routesToProxy = ["/collect", "/g/collect", "/api/event", "/debug", "/r/collect"];

routesToProxy.forEach((route) => {
  app.use(route, createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: (path) => path,
    onProxyReq: (proxyReq, req) => {
      console.log(`[GTM] Proxy ${req.method} ${req.originalUrl}`);
    },
  }));
});

// Health check
app.get("/healthy", (req, res) => res.send("OK"));

app.listen(PORT, () => {
  console.log(`✅ GTM Wrapper is running on port ${PORT}`);
});
