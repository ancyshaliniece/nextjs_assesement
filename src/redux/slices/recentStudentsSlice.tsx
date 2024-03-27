import { recentStudents } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const exportStudentDetails=createSlice({
    name:"RecentStudents",
    initialState:recentStudents,
    reducers: {},

})

export default exportStudentDetails.reducer