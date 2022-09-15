import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    count: 10,
}

const counterSlice = createSlice({
    name: "counter1",
    initialState: initalState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByValue: (state, action) => {
            state.count += action.payload;
        }
    }
})

export const {increment, decrement, incrementByValue} = counterSlice.actions;

export default counterSlice.reducer;