import StudentDetailsComp from "@/component/features/studentComp/studentDetailsComp/page";

export default function StudentDetails({params}:{params:{student:any}}){
    return(
        <>
        <StudentDetailsComp student={params?.student}/>
        </>
    )
}