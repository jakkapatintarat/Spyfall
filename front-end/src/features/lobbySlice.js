import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players: [],
    host: null,
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
    }
});

export const { addPlayer, removePlayer, setHost } = lobbySlice.actions;
export default lobbySlice.reducer;