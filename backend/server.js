require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const server = http.createServer(app);
const db = require('./db/config');

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('likes', (notifications) => {
       console.log("message from socket",notifications)
       io.emit('notification',notifications)
    });

    // socket.on('send_notification', (notifications) => {
    //     // Handle send_notification event
    // });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// module.exports = { io };