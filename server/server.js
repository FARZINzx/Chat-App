const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({noServer: true});

// Map of clients: port -> { ws, name, isAlive }
const clients = new Map();

// Helper: get current HH:MM:SS timestamp
function timestamp() {
    return new Date().toLocaleTimeString('en-GB');
}

// Helper: send JSON payload over ws if open
function send(ws, payload) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
    }
}

// Broadcast payload to all connected clients
function broadcast(payload) {
    const data = JSON.stringify(payload);
    for (const {ws} of clients.values()) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    }
}

// Send updated client list to everyone
function broadcastClientList() {
    const list = Array.from(clients.entries()).map(
        ([port, {name}]) => ({port, name})
    );
    broadcast({type: 'clients', clients: list});
}

// Ping/pong heartbeat to drop dead connections
setInterval(() => {
    for (const [port, client] of clients.entries()) {
        if (!client.isAlive) {
            client.ws.terminate();
            clients.delete(port);
            broadcastClientList();
            continue;
        }
        client.isAlive = false;
        client.ws.ping();
    }
}, 30000);

// HTTP -> WebSocket upgrade handling
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

// WebSocket connection handler
wss.on('connection', (ws, req) => {
        const port = req.socket.remotePort;
        const defaultName = `User-${port}`;
        clients.set(port, {ws, name: defaultName, isAlive: true, inGroup: true});

        // Respond to pongs
        ws.on('pong', () => {
            const client = clients.get(port);
            if (client) client.isAlive = true;
        });

        // Send welcome
        send(ws, {type: 'welcome', port});
        broadcastClientList();

        ws.on('message', (raw) => {
                let msg;
                try {
                    msg = JSON.parse(raw);
                } catch (e) {
                    return;
                }

                const time = timestamp();
                switch (msg.type) {
                    case 'set_name':
                        clients.get(port).name = msg.name || defaultName;
                        broadcastClientList();
                        break;
                    case 'server':
                        send(ws, {
                            type: 'server',
                            port,
                            time,
                            text: `Server echo: your port is ${port}`
                        });
                        break;

                    case 'private': {
                        const me = clients.get(port);
                        const you = clients.get(msg.toPort);
                        if (!you) {
                            return send(ws, {type: 'info', time, text: 'User offline.'});
                        }
                        const payload = {
                            type: 'private',
                            fromPort: port,
                            fromName: me.name,
                            time,
                            text: msg.text
                        };
                        send(you.ws, payload);
                        send(ws, {...payload, fromName: 'You'});
                        break;
                    }
                    case 'group':
                        const sender = clients.get(port);
                        const senderName = sender.name;
                        if (msg.text === '/exit') {
                            if (!sender.inGroup) {
                                send(ws, { type: 'info', time, text: 'You already left the group.' });
                                break;
                            }
                            sender.inGroup = false;
                            send(ws, { type: 'info', time, text: 'You left the group.' });

                            // notify others
                            clients.forEach(({ ws: clientWs, inGroup }, otherPort) => {
                                if (inGroup && clientWs.readyState === WebSocket.OPEN && otherPort !== port) {
                                    clientWs.send(JSON.stringify({
                                        type: 'info',
                                        time,
                                        text: `${senderName} left the group.`
                                    }));
                                }
                            });

                        } else if (msg.text === '/join') {
                            if (sender.inGroup) {
                                send(ws, { type: 'info', time, text: 'You are already in the group.' });
                                break;
                            }
                            sender.inGroup = true;
                            send(ws, { type: 'info', time, text: 'You rejoined the group.' });

                            // notify others
                            clients.forEach(({ ws: clientWs, inGroup }, otherPort) => {
                                if (inGroup && clientWs.readyState === WebSocket.OPEN && otherPort !== port) {
                                    clientWs.send(JSON.stringify({
                                        type: 'info',
                                        time,
                                        text: `${senderName} rejoined the group.`
                                    }));
                                }
                            });

                        } else {
                            // normal group message — send to group members only
                            clients.forEach(({ ws: clientWs, inGroup }) => {
                                if (inGroup && clientWs.readyState === WebSocket.OPEN) {
                                    clientWs.send(JSON.stringify({
                                        type: 'group',
                                        fromPort: port,
                                        fromName: senderName,
                                        time,
                                        text: msg.text
                                    }));
                                }
                            });
                        }
                        break;
                    default:
                        // Unknown type
                        send(ws, {type: 'info', time, text: 'Unknown message type.'});
                }
            }
        )
        ;

        ws.on('close', () => {
            clients.delete(port);
            broadcastClientList();
        });
    }
)
;

const PORT = 8080;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
