import EditStudentComp from "@/component/features/studentComp/editStudentComp/page";

export default function EditStudent({params}:{params:{studentId:string}}){
    return(
        <>
        <EditStudentComp studentID={params.studentId}/>
        </>
    )
}