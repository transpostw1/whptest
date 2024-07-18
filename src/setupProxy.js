const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://whpapi.transpost.co/api',
      changeOrigin: true,
    })
  );
};