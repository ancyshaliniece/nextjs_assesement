import { coursesInfo } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const courseViewSlice=createSlice({
    name:'CourseView',
    initialState:coursesInfo,
    reducers:{

    }
})
export default courseViewSlice.reducer;