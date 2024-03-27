import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../../json/data";
const coursesListSlice = createSlice({
    name: 'CoursesList',
    initialState: courses,
    reducers: {
        addCourse(state, action) {
            state.push(action.payload);
        },
        updateCourse(state, action) {
            const { id, updatedCourse } = action.payload;
            const courseIndex = state.findIndex(course => course["#40"] === parseInt(id));
            if (courseIndex !== -1) {
                state[courseIndex] = updatedCourse;
            }
        },
        deleteCourse(state, action) {
            const courseId = action.payload;
            if(courseId?.length>1){
                return  state.filter((course,index) => course["#40"] !== parseInt(courseId[index]));
            }else{
                return  state.filter(course => course["#40"] !== parseInt(courseId));

            }
            
        }
    }
});

export const { addCourse, updateCourse,deleteCourse } = coursesListSlice.actions;
export default coursesListSlice.reducer
