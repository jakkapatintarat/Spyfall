import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux';
import { roomCreated, setError, userJoined } from '../features/room/roomSlice';

function Lobby() {
    const dispatch = useDispatch();
    const socket = useSocket();
    const { roomName, users, error } = useSelector(state => state.room);
    const [inputRoomName, setInputRoomName] = useState('');
    const [inputUserName, setInputUserName] = useState('');

    useEffect(() => {
        if (!socket) return;

        socket.on('roomCreated', (roomName) => { //รับ res(roomName) มาจาก server 
            dispatch(roomCreated(roomName)); // เอามาเข้า payload
        });

        socket.on('roomJoined', (users) => { //รับ res(users) มาจาก server 
            dispatch(userJoined(users)); // เอามาเข้า payload
        });

        socket.on('userJoined', (users) => { //รับ res(users) มาจาก server 
            dispatch(userJoined(users)); // เอามาเข้า payload
        });

        socket.on('error', (error) => { //รับ res(error) มาจาก server 
            dispatch(setError(error)); // เอาเข้า payload
        })

        return () => {
            socket.off('roomCreated');
            socket.off('roomJoined');
            socket.off('userJoined');
        };
    }, [dispatch, socket]);

    const handleCreateRoom = () => {
        if (socket) {
            socket.emit('createRoom', { roomName: inputRoomName, userName: inputUserName });
        }
    };

    const handleJoinRoom = () => {
        if (socket) {
            socket.emit('joinRoom', { roomName: inputRoomName, userName: inputUserName });
        }
    };

    return (
        <>
            <div>
                <h1>Spyfall Game</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={inputRoomName}
                        onChange={(e) => setInputRoomName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="User Name"
                        value={inputUserName}
                        onChange={(e) => setInputUserName(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <button onClick={handleJoinRoom}>Join Room</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    )
}

export default Lobby