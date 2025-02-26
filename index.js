const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3000
const wss = new WebSocketServer({ port });
const HEARTBEAT_INTERVAL = 30000; // 30秒发送一次Ping
wss.on('connection', (ws) => {
    const clinetId = uuidv4();
    console.log(`Connection from client`, clinetId);
    ws.send(`Welcome to Websocket Service`);

    ws.on('message', (data) => {
        const message = data.toString();
        console.log(`Received %s`, message);
        ws.send(message.toUpperCase());
    });

    ws.on('close', () => {
        console.log(`Websocket client ${ws} has been disconnected`);
    });
    // 发送Ping帧
  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
      console.log('服务端发送了Ping');
    }
  }, HEARTBEAT_INTERVAL);

  // 监听Pong响应
  ws.on('pong', () => {
    lastPong = Date.now();
    console.log('服务端收到Pong');
  });
});

wss.on('open', () => {
    console.log('---OPEN---')
});

wss.on('error', (error) => {
    console.error(error);
});

  


// private methods
// function to generate a unique client ID
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

console.log(`Websocket server listening on PORT ws://localhost:${port}`);
