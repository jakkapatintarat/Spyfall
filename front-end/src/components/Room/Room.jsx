import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import { addPlayer, removePlayer, setPlayer } from '../../features/lobbySlice';

const socket = io('http://localhost:5000');

const Room = () => {
    const { roomName } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(state => state.lobby.players);
    console.log(players);

    useEffect(() => {
        socket.on('updatePlayers', (players) => {
            dispatch(addPlayer(players));
        })
    });

    // useEffect(() => {
    //     if (roomName) {
    //         console.log(`Join room: ${roomName}`);
    //         socket.emit('joinRoom', roomName);

    //         socket.on('updatePlayers', (players) => {
    //             dispatch(addPlayer(players));
    //         });

    //         return () => {
    //             socket.off('updatePlayers');
    //         }
    //     } else {
    //         console.error('Room name undefined');
    //     }
    // }, [roomName, dispatch]);

    return (
        <>
            <div>Room: {roomName}</div>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>
        </>
    )
}

export default Room;
