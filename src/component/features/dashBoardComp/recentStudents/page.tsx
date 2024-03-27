"use client";

import { dashboard } from "@/images";
import Image from "next/image";
import { useSelector } from "react-redux";

const StudentImage=[
    {
        image:dashboard.recentStudent_img1
    },
    {
        image:dashboard.recentStudent_img2
    },
    {
        image:dashboard.recentStudent_img3
    },
    {
        image:dashboard.recentStudent_img4
    },
    {
        image:dashboard.recentStudent_img1
    },
    {
        image:dashboard.recentStudent_img2
    },
    {
        image:dashboard.recentStudent_img3
    },
]

export default function RecentStudent(){
    const student= useSelector((state:any)=>state.recentStudents);
    
    return(
        <div >
            <div className="flex justify-between items-center border-b-[1px]  p-4">
                <h1 className='text-[1.1rem] font-[500]'>Recent Students</h1>
                <div className="selection flex gap-2">
                </div>
            </div>
           <div className="studentInfo overflow-y-auto h-[280px] p-2 pr-0">
            {student.map((item:any,index:any)=>(
                <div className="studentDetails flex gap-3 pt-[.6rem] pb-[.6rem] pr-4" key={index}>
                    <div className="img">
                        <Image src={StudentImage[index].image} alt="student" width={60} height={60}/>
                    </div>
                    <div className="info w-[100%] mt-1">
                        <p className="text-[.8rem] font-[500]">{item.name}</p>
                        <div className="details flex justify-between">
                            <span className="text-[.65rem] lableColor">{item.coursesCount} Courses</span>
                            <span className="text-[.65rem] yellow ">{item.data}</span>
                        </div>
                    </div>
                </div>
            ))}
           </div>
        </div>
    )
}