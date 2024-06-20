import { useDispatch, useSelector } from "react-redux"
import { addPlayer, removePlayer, setHost, setRoom, setError } from "../../features/lobbySlice";
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { io } from "socket.io-client";
import { useState } from "react";
import { Field, Label, Switch } from '@headlessui/react'

const socket = io('http://localhost:5000');

const Lobby = () => {
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState('');
    const players = useSelector(state => state.lobby.players);
    const host = useSelector(state => state.lobby.host);
    const room = useSelector(state => state.lobby.room);
    const error = useSelector(state => state.lobby.error);

    // create room
    const handleCreateRoom = () => {
        socket.emit('createRoom', roomName);
    };

    // join room
    const handleJoinRoom = () => {
        socket.emit('joinRoom', roomName);
    };

    socket.on('roomCreated', (room) => {
        dispatch(setRoom(room));
    });

    socket.on('roomJoined', (room) => {
        dispatch(setRoom(room));
    });

    socket.on('error', (errorMessage) => {
        dispatch(setError(errorMessage));
    });

    return (
        <>
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lobby</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Player's rest room
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="roomname" className="block text-sm font-semibold leading-6 text-gray-900">
                                Room name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="roomname"
                                    id="roomname"
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter room name"
                                />
                            </div>
                        </div>
                        <div>
                            <button onClick={handleCreateRoom} className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Room</button>
                        </div>
                        <div>
                            <button onClick={handleJoinRoom} className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Join Room</button>
                        </div>
                        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                        <ul role="list" className="divide-y divide-gray-100">
                            {players.map(player => (
                                <li key={player.id} className="flex justify-between gap-x-6 py-5">
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lobby;