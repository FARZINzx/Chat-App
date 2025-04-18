# Chat Application

A real-time chat application built with modern web technologies.

## Features

- Real-time messaging
- User authentication
- Private and group chats
- Message history
- Online/offline status
- Responsive design

## Tech Stack

### Frontend
- React.js
- TypeScript
- Socket.io-client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Chat-App
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Chat-App/
├── client/           # Frontend React application
├── server/           # Backend Node.js server
└── document/         # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 