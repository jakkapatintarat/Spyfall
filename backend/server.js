const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

app.use(cors());

let rooms = {} //เก็บข้อมูลห้องทั้งหมด

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    // สร้างห้อง
    socket.on('createRoom', (data) => {
        const { roomName, userName } = data
        if (!rooms[roomName]) {
            rooms[roomName] = {
                users: [{ id: socket.id, user: userName }]
            };
            socket.join(roomName);
            io.to(roomName).emit('userJoined', rooms[roomName].users);
            io.to(socket.id).emit('roomCreated', roomName);
            // console.log(`room created: ${JSON.stringify(roomName)}`);
        } else {
            io.to(socket.id).emit('error', 'Room already exists');
        }
    })

    //เข้าร่วมห้อง
    socket.on('joinRoom', (roomName, userName) => {
        if (rooms[roomName]) {
            rooms[roomName].users.push({ id: socket.id, name: userName });
            socket.join(roomName);
            io.to(roomName).emit('userJoined', rooms[roomName].users);
            io.to(socket.id).emit('roomJoined', rooms[roomName].users);
            console.log(`user joined to room${roomName}: ${JSON.stringify(rooms[roomName])}`);
        } else {
            io.to(socket.id).emit('error', 'Room does not exist');
        }
    })

    // ตัดการเชื่อมต่อ
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
    })
})

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})