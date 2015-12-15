var httpProxy = require('http-proxy'),
    connect   = require('connect'),
    endpoint  = {
      host:   'www.local.rtbf.be', // or IP address
      port:   80,
      prefix: '/'
    },
    staticDir = 'public';
 
var proxy = new httpProxy.createProxyServer();

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', endpoint.host);
  console.log('RAW Request header ', JSON.stringify(proxyReq.headers, true, 2));
});
proxy.on('proxyRes', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', endpoint.host);
  console.log('RAW Response header ', JSON.stringify(proxyRes.headers, true, 2));
});

var app = connect()
  .use(connect.logger('dev'))
  .use(function(req, res) {
    if (req.url.indexOf(endpoint.prefix) === 0) {
      proxy.proxyRequest(req, res, endpoint);
    }
  })
  .use(connect.static(staticDir))
  .listen(4242);

