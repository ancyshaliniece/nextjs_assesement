import { createSlice } from "@reduxjs/toolkit";
import { eventList } from "../../json/data";

const existingImportTable = createSlice({
    name:"EventList",
    initialState:eventList,
    reducers:{}
})

export default existingImportTable.reducer