const http = require('http');
const httpProxy = require('http-proxy');

// 1. Point this to your HOME Cloudflare URL (the one that works right now)
const target = 'wss://mc.yourdomain.com';

const proxy = httpProxy.createProxyServer({
    target: target,
    changeOrigin: true,
    ws: true,
    secure: true // Since your home uses WSS
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Stealth Proxy is running.');
});

// Handle the WebSocket upgrade
server.on('upgrade', (req, socket, head) => {
    console.log('Forwarding connection to home...');
    proxy.ws(req, socket, head);
});

server.listen(8081);
console.log('Stealth Proxy listening on port 8081');
