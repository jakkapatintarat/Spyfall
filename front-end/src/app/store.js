import { configureStore } from "@reduxjs/toolkit";
import gameReducer from '../features/gameSlice';
import lobbyReducer from '../features/lobbySlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        lobby: lobbyReducer,
    }
})