import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomName: null,
        users: [],
        error: null,
    },
    reducers: {
        // สร้างห้อง
        roomCreated(state, action) {
            state.roomName = action.payload;
        },
        // เข้าห้อง
        userJoined(state, action) {
            state.users = action.payload;
        },
        // error
        setError(state, action) {
            state.error = action.payload;
        }
    }
})

export const { roomCreated, userJoined, setError } = roomSlice.actions;
export default roomSlice.reducer;