require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const server = http.createServer(app);
const db = require('./db/config');
const { notifications } = require('./controllers/user.controller');

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

