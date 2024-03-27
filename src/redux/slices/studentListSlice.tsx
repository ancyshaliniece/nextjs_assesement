import { studentsDetails } from "@/json/data";
import { createSlice } from "@reduxjs/toolkit";

const studentListSlice=createSlice({
    name:"StudentList",
    initialState:studentsDetails,
    reducers:{
        addStudent(state,action){
            state.push(action.payload);
        },
        updateStudent(state,action){
            const updateStudent=action.payload;
            const studentIndex=state.findIndex(student=>student.Name===updateStudent.Name)
            if(updateStudent!== -1){
                state[studentIndex] = updateStudent;
            }
        },
        deleteStudent(state,action) {
            const courses=action.payload;
            if(courses?.length>1){
                courses.forEach((course:any) => {
                    // Filter out students whose name and course name match the ones in the payload
                    state = state.filter(student => student.Name !== course.Name || student["Course Name"] !== course["Course Name"]);
                });
                return state;
            }else{
                return state.filter(item=> item["Name"] !==courses["Name"]);
            }

        }

    }
})
export const { deleteStudent,addStudent,updateStudent } = studentListSlice.actions;
export default studentListSlice.reducer;