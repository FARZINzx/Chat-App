# 🚀 WebSocket Chat Application 📝

## 📖 Overview

This project is a simple real-time chat application built with **Node.js**, **WebSockets**, and **Tailwind CSS**. It consists of two main components:

- **Client:** A static HTML/CSS/JavaScript interface that connects to the server via WebSockets to send and receive messages and display the list of connected users. 🤝
- **Server:** A lightweight WebSocket server powered by the `ws` library that handles client connections, broadcasts messages, and manages user sessions. 💻

The aim is to provide a clean, modular codebase that demonstrates core JavaScript concepts and real-time communication without the overhead of a full framework.

 ## 📸 Screenshots

![image](https://github.com/user-attachments/assets/0ed2e5ba-b725-4b68-b04b-53571d197341)

---

## ✨ Features

- 💬 Real-time, bidirectional messaging between clients and server
- 👥 Dynamic user list sidebar showing connected clients
- 🔄 Automatic scrolling of chat window on new messages
- 🎨 Clean, responsive UI styled with Tailwind CSS
- 📦 Simple, modular codebase to illustrate pure JS + WebSocket usage
- 🧑‍🤝‍🧑 **Group Chat Support:** Users can create or join named chat groups
- 🔁 **Rejoin Groups:** Rejoin a previously joined group using `/join <group-name>`
- 🚪 **Leave Group:** Exit from a group anytime using `/exit`
- 🧠 **Command System:** Built-in support for slash commands like `/join`, `/exit`
- 🆔 **Unique Usernames:** Users are prompted to choose unique names at join time
- ⚠️ **System Notifications:** Real-time feedback on joins, exits, and system messages

### 💬 Chat Types
1. **Server Chat**
   - Sends a message that triggers a server echo
   - Default tab on app load

2. **Private Chat**
   - Select another user to start a one-on-one conversation
   - Only the selected user receives the message

3. **Group Chat**
   - Send messages to all group members
   - Commands:
     - `/exit`: leave the group (you stop receiving messages)
     - `/join`: rejoin the group (you start receiving again)

    ### ⚙️ Backend Features
- Express static server to serve frontend
- WebSocket server on port `8080`
- Client health checking via `ping/pong` every 30s
- Auto-removal of disconnected clients
- Broadcasts updated client list to all users

---

## ⚙️ Technical Details

- **Server:**
  - 🏃‍♂️ **Runtime:** Node.js (v14+)
  - 📡 **WebSocket Library:** `ws`
  - 🌐 **Port:** 8080 (configurable)
  - 🛠️ **Core Logic:** Handles `connection`, `message`, and `close` events, and emits JSON messages for client updates.

- **Client:**
  - 🏷️ **Markup:** `app.html` with two-pane layout (sidebar and chat area)
  - 💅 **Styling:** Tailwind CSS (via CLI build in `output.css`)
  - 🔌 **WebSocket API:** Native `WebSocket` for establishing and managing socket connection
  - 🖥️ **DOM Manipulation:** Vanilla JS for rendering messages and user list

---

## 🗂️ Project Structure

```plaintext
├── client/
│   ├── node_modules/          # Tailwind and other dependencies 📦
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/         # SVG avatars 🖼️
│   │   ├── app.html           # Main client HTML 🏷️
│   │   ├── style.css          # (optional custom CSS) 💅
│   │   └── output.css         # Built Tailwind CSS 🛠️
│   ├── package.json           # Client dependencies (Tailwind CLI)
│   └── package-lock.json      # Lockfile 🔒
│
├── server/
│   ├── node_modules/          # Server dependencies 📦
│   ├── server.js              # WebSocket server entry point 🚪
│   ├── package.json           # Server dependencies (`ws`)
│   └── package-lock.json      # Lockfile 🔒
│
├── .gitignore                 # Ignored files 🚫
└── README.md                  # This documentation file 📄
```
---

## 🧪 Example Usage
### Private Chat
  - Click a user from the sidebar to start chatting
  - Only that user sees your messages
  - Tab switches automatically when a private message arrives

### Group Chat
  - Switch to Group tab
  - Everyone in the group will receive your message
  - Use `/exit` to leave the group, `/join` to rejoin

### Server Chat
  - Default tab
  - Sends a message to the server and gets a confirmation echo

## 🚀 Getting Started

### 🔧 Prerequisites
 - Node.js v14 or higher

 - npm (comes with Node.js)

### ⚙️ Installation

 1. Clone the repository
```bash
git clone https://github.com/yourusername/websocket-chat.git
cd Chat-App
```
2. Install server dependencies
```bash
cd server
npm install
```
3. Install client dependencies
```bash
cd ../client
npm install
```
4. Start the WebSocket server
```bash
cd ../server
node server.js
```
5. Open the client
  Simply open client/src/app.html in your browser (or serve it with any static file server). 🌐

---

## Notes
  - Each client is identified by their TCP remotePort
  - No authentication is implemented — this is a local-only demo

## 📚 Additional Resources
 - [Node.js Documentation](https://nodejs.org/en)

 - [ws - WebSocket Library for Node.js](https://websocket.org/)

 - [Tailwind CSS Documentation](https://tailwindcss.com/)

 - [MDN WebSocket AP](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

--
## 👤 Author
- [Farzin Hamzehi](https://github.com/FARZINzx "Visit Farzin profile")
