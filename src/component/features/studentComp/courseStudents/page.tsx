'use client';

import { TableWithEdit } from "@/component/table/page";
import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Params{
    params:any,
}
export default function CourseStudents({params}:Params){
    const studentListStore=useSelector((state:any)=>state.studentListStore);
    const [filteredCourses, setFilteredCourses] = useState([]);
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


    const handleSearch = (event: any) => {
        const searchTerm = event.target.value.toLowerCase();
        
        const filteredData = studentListStore.filter((item: any) =>
        
            Object.values(item).some((value: any) =>
                value.toString().toLowerCase().includes(searchTerm)
            )
        );
        
        setFilteredCourses(filteredData);
    }
    
    useEffect(() => {
        if(studentListStore){
            const formattedString = params.course.replace(/([a-z])([A-Z])/g, '$1 $2');
            const test=studentListStore.filter((item:any)=>{
                return  item["Course Name"]===formattedString
              })
              console.log("test",test);
              
            setFilteredCourses(test);
        }
      
        
    }, [studentListStore])
   
    
    return(
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
        <div className="title flex justify-between items-center mb-4" >
            <h1 className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"} text-[1.7rem]`}>{params.course==="ArtificialIntelligence"?"AI":params.course==="PublicRelations"?"PR":params.course==="GraphicDesign"?"GD":params.course==="BlockChainandCryoticurrency"?"BC":params.course==="UI/UXDesign"?"UI/UX":params.course==="WebDesign"?"WD":params.course==="MotionGraphics"?"MG":params.course} Student List</h1>
            <div className="breadCrumbs text-[.85rem]">
                <p className="text-[#676767]"><Link href="/"><span>Home</span></Link> <span>/</span><Link href="/student"><span>Students</span></Link> <span>/</span> <Link href="/courses"><span className="text-[#c030f0]">{params.course}</span></Link></p>
            </div>
        </div>
        <div className={`tableContainer p-4 ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>
            <div className={`flex justify-between w-[100%]`}>
                <div className="search relative">
                    <input
                        type="text"
                        className={`searchInput input p-[.2rem] pl-8 text-[.8rem] w-[250px] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                    <Image
                        src={commonImg.search}
                        alt="search"
                        className="absolute top-[5px] left-[7px] w-[17px]"
                    />
                </div>
                <div className={`addDelete flex gap-4 items-center ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                    <div className="flex gap-1 items-center cursor-pointer">
                        <Link href={'/student/addStudent'} className="flex items-center gap-1">
                        <Image src={commonImg.addIcon} alt="addIcon" className="w-[13px]" />
                        <span className="text-[.85rem]">Add</span>
                        </Link>
                    </div>
                    <span className="lightAsh">|</span>
                    <div className="flex gap-1 items-center">
                        <Image
                            src={commonImg.deleteIcon}
                            alt="deleteIcon"
                            className="w-[13px]"
                        />
                        <span className="text-[.85rem]">Delete</span>
                    </div>
                </div>
            </div>
            <TableWithEdit data={filteredCourses} check={true} moreIcon={true} imgFolder={"Faculty/"} headPading={true} studentDelete={true} DeleteInfo={"StudentList"}/>

        </div>
    </div>
       
    )
}