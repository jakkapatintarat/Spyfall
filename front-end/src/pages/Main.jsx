import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux';
import { roomCreated, setError, userJoined } from '../features/room/roomSlice';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const dispatch = useDispatch();
    const socket = useSocket();
    const { roomName, users, error } = useSelector(state => state.room);
    const [inputRoomName, setInputRoomName] = useState('');
    const [inputUserName, setInputUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        socket.on('roomCreated', (roomName) => { //รับ res(roomName) มาจาก server 
            dispatch(roomCreated(roomName)); // เอามาเข้า payload
            navigate(`/room/${roomName}`);
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
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* main */}
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="uppercase text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Spyfall <span className='text-xl'>Thailand</span>
                        </h1>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <form className="w-full max-w-lg">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-white text-xs font-extrabold mb-2" htmlFor="roomName">
                                            Room name
                                        </label>
                                        <input
                                            value={inputRoomName}
                                            onChange={(e) => setInputRoomName(e.target.value)}
                                            autoComplete="off"
                                            className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${error ? 'border border-red-500' : ''}`}
                                            id="roomName"
                                            type="text"
                                            placeholder="Enter room name" />
                                        {error ? <p className="text-red-500 text-xs italic">{error}</p> : ''}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-white text-xs font-extrabold mb-2" htmlFor="userName">
                                            User name
                                        </label>
                                        <input
                                            value={inputUserName}
                                            onChange={(e) => setInputUserName(e.target.value)}
                                            autoComplete="off"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="userName"
                                            type="text"
                                            placeholder="Enter user name" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <button
                                            onClick={handleCreateRoom}
                                            className="flex w-full justify-center uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button">
                                            Createroom
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <button
                                            onClick={handleJoinRoom}
                                            className="flex w-full justify-center uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button">
                                            Joinroom
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* main */}
            </div>
        </div>
    )
}
