'use client';
import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from './allCourse.module.css';
import Table from "@/component/table/page";

export default function AllCourseMarkSheet(){

    const courses = useSelector((state: any) => state.markSheetStore);
    console.log('courses',courses);
    
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
        
        const filteredData = courses.filter((item: any) =>
        
            Object.values(item).some((value: any) =>
                value.toString().toLowerCase().includes(searchTerm)
            )
        );
        
        setFilteredCourses(filteredData);
    }

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses])

    return(
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[2rem]">Marksheet Entry</h1>
                <div className="breadCrumbs">
                    <p><Link href="/"><span>Home</span></Link> <span>/</span> <Link href="/courses"><span>MarkSheet Entry</span></Link></p>
                </div>
            </div>
            <div className={`tableContainer  p-4 ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
                <div className={` flex justify-between w-[100%]`}>
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
                   
                </div>
                <Table data={filteredCourses} goToSingleMark={true}/>
            </div>
        </div>
    )
}