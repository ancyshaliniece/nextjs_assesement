import { eventsLists } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const eventSlice=createSlice({
    name:"Event",
    initialState:eventsLists,
    reducers:{
        addEvents(state,action){
            action.payload.forEach((element:any) => {
                const newObj=(({id,...rest})=>rest)(element);
                
                state.push(newObj);
            });
        }
    }
})

export const {addEvents}=eventSlice.actions
export default eventSlice.reducer;