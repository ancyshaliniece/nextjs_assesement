import { darkMode } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const modeSlice=createSlice({
    name:'mode',
    initialState:darkMode,
    reducers:{
        updateMode(state,action){
            state[0].mode=action.payload;
        }
    }
})
export const {updateMode}=modeSlice.actions;
export default modeSlice.reducer;