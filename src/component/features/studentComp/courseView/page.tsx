"use client";
import { studentInfo } from "@/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CourseInfo{
        courseName: string,
        code: string,
        short: string,
        img: any,
}

export default function CourseView(){

    const courseViewStore= useSelector((state:any)=>state.courseViewStore);
    const [course, setCourse] = useState<CourseInfo[]>([]);
    const mode=useSelector((store:any)=>store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    // useEffect(() => {
    //     // debugger
    //     const modes=mode[0].mode;
    //     setdarkMode(modes);
    // }, [mode])
    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    const router=useRouter();

    const handleCourse=(name:any)=>{
        const course=name?.split(" ")?.join("");
        router.push(`/student/${course}`);
    }

    useEffect(()=>{
        setCourse(courseViewStore);
    },[courseViewStore])

    return(
        <div className="flex gap-8 flex-wrap">
            {course?.map((item:any,index:any)=>(
            <div className={`card w-[30%] p-4  coursesCard ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`} key={index} onClick={()=>handleCourse(item.courseName)}>
                <div className="title flex gap-3">
                    <div>
                        <Image src={`/Assets/students/${item.img}`} alt={`${item.courseName}`} width={60} height={60}/>
                    </div>
                    <div className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                        <p className="text-[1.1rem] font-[500] space-x-1">{item.courseName}</p>
                        <p className="text-[.85rem] mt-1"><span className="text-[#676767]">{item.code}</span> <span className="text-[#ffffff] bg-[#faa21f] px-1 rounded-sm">{item.short}</span></p>
                    </div>
                </div>
                <div className="entroll py-4 border-b border-[#f0f0f0]">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[.75rem] text-[#9f9f9f]">Student Entrolled</span>
                        <span><span className="text-[1.1rem] font-[500]">80</span><span className="text-[#676767] text-[.85rem] font-[400]">/120</span></span>
                    </div>
                    <div className="flex gap-2">
                        <p className="w-[24.5%] h-[6px] bg-[#f2d2fb]"></p>
                        <p className="w-[24.5%] h-[6px] bg-[#f2d2fb]"></p>
                        <p className="w-[24.5%] h-[6px] bg-[#f2d2fb]"></p>
                        <p className="w-[24.5%] h-[6px] bg-[#e8e8e8]"></p>
                    </div>
                </div>
                <div className={`lessons flex justify-between items-center text-[.85rem] pt-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                    <div className="flex gap-2 items-center">
                    <Image src={studentInfo.book}  width={20} height={20} alt="lessons"/>
                    <span>52 Lessons</span>
                    </div>
                    <div className="text-[#f0f0f0]">|</div>
                    <div className="flex gap-2 items-center">
                    <Image src={studentInfo.backArrow}  width={17} height={17} alt="months"/>
                    <span>2 Months</span>
                    </div>
                    <div className="text-[#f0f0f0]">|</div>
                    <div className="flex gap-2 items-center">
                    <Image src={studentInfo.star}  width={20} height={20} alt="months"/>
                    <span>2 Months</span>
                    </div>
                </div>
            </div>
            ))}
        
        </div>
    )
}