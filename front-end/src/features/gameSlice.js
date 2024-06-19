import { createSlice } from "@reduxjs/toolkit";

// default state 
const initialState = {
    players: [],
    spy: null,
    location: null,
    gameState: 'waiting',
};

// action slice
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            state.players = action.payload.players;
            state.spy = action.payload.spy;
            state.location = action.payload.location;
            state.gameState = 'in-progress';
        },
        endGame: (state) => {
            state.gameState = 'ended';
        },
        resetGame: (state) => {
            state.players = [];
            state.spy = null;
            state.location = null;
            state.gameState = 'waiting';
        }
    }
})

export const { startGame, endGame, resetGame } = gameSlice.actions;
export default gameSlice.reducer;