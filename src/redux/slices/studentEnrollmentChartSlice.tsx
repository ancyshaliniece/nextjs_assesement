import { studentEnrollmentChart } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const StudentDetailsChartSlice=createSlice({
    name:"RecentStudents",
    initialState:studentEnrollmentChart,
    reducers: {},

})

export default StudentDetailsChartSlice.reducer