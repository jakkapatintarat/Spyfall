import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players: [],
    host: null,
    room: null,
    error: null,
};

const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => player.id !== action.payload.id);
        },
        setHost: (state, action) => {
            state.host = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { addPlayer, removePlayer, setHost, setRoom, setError } = lobbySlice.actions;
export default lobbySlice.reducer;