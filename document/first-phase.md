# Phase 1 Documentation: WebSocket Chat Application 🚀

## 📌 Overview
A real-time chat application with WebSocket communication between a Node.js server and a web client.  
**Achievements**: Basic messaging, dynamic user list, Tailwind CSS styling , **Return the client's port number to the sender when they send a message.**.

---

## 🛠️ How to Rebuild Phase 1

### 1. Prerequisites
- Node.js v14+
- Modern web browser
- Code editor (VS Code recommended)

---

### 2. Project Setup

#### Server Setup (`/server` folder)
1. Create `server.js`:
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  const clientPort = req.socket.remotePort;
  console.log(`Client connected: ${clientPort}`);
  
  ws.send(JSON.stringify({ type: "port", port: clientPort }));

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server: ${message}`);
  });

  ws.on('close', () => console.log(`Client ${clientPort} disconnected`));
});

console.log('Server running at ws://localhost:8080');
```

1. Create `package.json`:
```json
{
  "name": "websocket-server",
  "dependencies": {
    "ws": "^8.16.0"
  }
}
```

##Client Setup (/client folder)

1. Create `app.html` :
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WebSocket Chat</title>
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <!-- Include full HTML structure from previous code -->
  <!-- Add WebSocket JavaScript logic from previous code -->
</body>
</html>
```

2. Installation & Execution :
```bash
# Server
cd server
npm install
node server.js

# Client (in new terminal)
cd client
npm install
npx tailwindcss -i ./src/style.css -o ./src/output.css --watch
```




