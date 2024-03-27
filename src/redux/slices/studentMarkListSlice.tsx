import { studentAssesementMarkList } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const exportStudentMarkListDetails = createSlice({
    name: "StudentMarkList",
    initialState: studentAssesementMarkList,
    reducers: {
        updateStudentMark(state, action) {
            const { id, updatedStudent, courseId } = action.payload;
            return state.map(course => {
                if (course.courseId === courseId) {
                    debugger
                    const updatedCourseDetails = [...course.CourseDetails];
                    updatedCourseDetails[parseInt(id)] = updatedStudent;
                    return {
                        ...course,
                        CourseDetails: updatedCourseDetails
                    };
                }
                return course;
            });
        },
        deleteStudentMark(state, action) {
            const {index,courseId } = action.payload;
            if(!index.length){
                const updatedState = state.map(course => {
                    if (course.courseId === courseId) {
                        return {
                            ...course,
                            CourseDetails: course.CourseDetails.filter((student, i) => i !== index)
                        };
                    }
                    return course;
                });
                console.log("updatedState",updatedState);
                
                return updatedState;
            }else if(index?.length>0){
                const updatedState = state.map(course => {
                    if (course.courseId === courseId) {
                        return {
                            ...course,
                            CourseDetails: course.CourseDetails.filter((student, i) => !index.includes(i.toString()))
                        };
                    }
                    return course;
                });
                console.log("updatedState",updatedState);
                
                return updatedState;
            }
           
            
        }
    }
});

export const { deleteStudentMark,updateStudentMark } = exportStudentMarkListDetails.actions;
export default exportStudentMarkListDetails.reducer;