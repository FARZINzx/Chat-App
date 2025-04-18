const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    const clientPort = req.socket.remotePort;
    console.log(`Client connected on port: ${clientPort}`);
    
    ws.send({
        type : "port",
        port : clientPort
    })

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Hi client ${clientPort}`);
    });

    ws.on('close', () => {
        console.log(`Client ${clientPort} disconnected`);
    });
});

console.log('WebSocket server running on ws://localhost:8080');