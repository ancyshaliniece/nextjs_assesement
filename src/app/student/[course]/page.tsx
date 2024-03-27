import CourseStudents from "@/component/features/studentComp/courseStudents/page";

function CourseStudentList({params}:{params:{course:string}}){
    console.log("param",params);
    
    return(
        <div>
        <CourseStudents params={params}/>
        </div>
    )
}

export default CourseStudentList;