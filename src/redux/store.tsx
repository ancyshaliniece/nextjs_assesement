import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/eventListSlice";
import recentStudents from "./slices/recentStudentsSlice";
import studentEnrollmentChartSlice from "./slices/studentEnrollmentChartSlice";
import coursesListSlice from "./slices/coursesListSlice";
import markSheetEntrySlice from "./slices/markSheetEntrySlice";
import studentMarkListSlice from "./slices/studentMarkListSlice";
import studentListSlice from "./slices/studentListSlice";
import courseViewSlice from "./slices/courseViewSlice";
import facultySlice from "./slices/facultySlice";
import eventSlice from "./slices/eventSlice";
import modeSlice from "./slices/modeSlice";

const store = configureStore({
    reducer:{
        eventList:useReducer,
        recentStudents:recentStudents,
        studentEnrollmentStore:studentEnrollmentChartSlice,
        coursesStore:coursesListSlice,
        markSheetStore:markSheetEntrySlice,
        studentMarkSheetStore:studentMarkListSlice,
        studentListStore:studentListSlice,
        courseViewStore:courseViewSlice,
        facultyStore:facultySlice,
        eventStore:eventSlice,
        modeStore:modeSlice,
    }
});

export default store;