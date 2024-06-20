const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('createRoom', (roomName) => {
        if (!rooms[roomName]) {
            rooms[roomName] = [];
            socket.join(roomName);
            rooms[roomName].push(socket.id);
            socket.emit('roomCreated', roomName);
            console.log(`Room ${roomName} created`);
        } else {
            socket.emit('error', 'Room already exist');
        }
    });

    socket.on('joinRoom', (roomName) => {
        if (rooms[roomName]) {
            socket.join(roomName);
            rooms[roomName].push(socket.id);
            socket.emit('roomJoined', roomName);
            console.log(`Client joined room ${roomName}`);
        } else {
            socket.emit('error', 'Room not exist');
        }
    })

    socket.on('disconect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));