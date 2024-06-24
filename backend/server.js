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

    socket.on('createRoom', (data) => {
        const { roomName, playerName } = data;
        if (!rooms[roomName]) { // ตรวจสอบว่าห้อง roomName ยังไม่ถูกสร้าง
            rooms[roomName] = []; // สร้างห้องใหม่โดยเพิ่มชื่อลงใน object 'roooms'
            socket.join(roomName); // ให้ join ห้องที่ชื่อ roomName
            rooms[roomName].push({ id: socket.id, name: playerName }); // เพิ่มผู้เล่นเข้าไปในห้อง
            socket.emit('roomCreated', { roomName, playerName }); // ส่งกลับไป client ที่เรียกใช้งานว่าห้องถูกสร้างแล้ว
            console.log(`Room ${roomName} created`);
            console.log(rooms);
        } else {
            socket.emit('error', 'Room already exist');
        }
    });

    socket.on('joinRoom', (data) => {
        const { roomName, playerName } = data;
        if (rooms[roomName]) {
            socket.join(roomName);
            rooms[roomName].push({ id: socket.id, name: playerName });
            io.in(roomName).emit('updatePlayers', rooms[roomName]); // ส่งข้อมูลเกี่ยวกับผู้เล่นในห้องไปยังทุกคนที่อยู่ในห้อง
            console.log(`${playerName} joined room: ${roomName}`);
            console.log(rooms);
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