import { createSlice } from "@reduxjs/toolkit";
import { faculties } from "@/json/data";

const facultySlice=createSlice({
    name:"Faculty",
    initialState:faculties,
    reducers:{
        addFaculty(state,action){
            state.push(action.payload);
        },

        // deleteFaculty(state,action){
        //     const{selectedTab,deleteData}=action.payload;
        //     console.log(selectedTab,deleteData);
        //     const selecteCourse=state.filter(item=>item.name===selectedTab);
            
        //     // const getData=selecteCourse.map(item=>item.facultyDetails).flat();
            
        //     if(deleteData?.length>1){

        //     }else{
        //         let test:any[]=[];
        //         for (let i = 0; i < selecteCourse.length; i++) {
        //             const element = selecteCourse[i];
        //             const t=element.facultyDetails.filter(item=>item.Name!== deleteData.Name);
        //             if(t.length!==0){
        //                 test.push(t); 
        //             }
        //         }
        //         debugger
        //         state=test;
        //         return state
        //     }
        // }
        deleteFaculty(state, action) {
            const { selectedTab, deleteData } = action.payload;
            console.log("deleteData",deleteData);
            const updatedState = state.map(course => {
              if (course.name === selectedTab) {
                if(deleteData.length>1){
                  debugger
                    const updatedFacultyDetails = course.facultyDetails.filter(
                        item => !deleteData.some((deleteItem:any) => deleteItem.Name === item.Name && deleteItem.Id === item.Id)
                      );
                      return { ...course, facultyDetails: updatedFacultyDetails };
                }else{
                    const updatedFacultyDetails = course.facultyDetails.filter(
                        item => item.Name !== deleteData.Name || item.Id !== deleteData.Id
                      );
                      return { ...course, facultyDetails: updatedFacultyDetails };
                }

               
               
              }
              return course;
            });
            return updatedState;
          }
    }
})

export const {deleteFaculty ,addFaculty} = facultySlice.actions;
export default facultySlice.reducer;