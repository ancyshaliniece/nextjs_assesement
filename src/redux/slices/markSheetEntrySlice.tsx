import { markSheetEntry } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const exportAllMarksheetDetails=createSlice({
    name:"AllCourseMarkSheet",
    initialState:markSheetEntry,
    reducers:{},
})

export default exportAllMarksheetDetails.reducer