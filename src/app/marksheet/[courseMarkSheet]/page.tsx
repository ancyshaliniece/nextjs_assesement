import SingleCourseMarkSheet from "@/component/features/markSheet/singleCourseMarkSheet/page";

function SingleMarkSheet({params}:{params:{courseMarkSheet:number}}) {

  
  return (
    <div>
        <SingleCourseMarkSheet params={params}/>
    </div>
  )
}


export default SingleMarkSheet;
