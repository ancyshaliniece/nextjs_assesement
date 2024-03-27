import EditCourse from "@/component/features/coursesComp/editCourse/page";

export default function CourseId({params}:{params:{courseId:number}}){
    return(
        <div className="justify-between items-center w-[100%] ">
        
        <EditCourse courseId={params.courseId}/>
    </div>
    )
}