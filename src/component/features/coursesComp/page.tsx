'use client'
import Table from "@/component/table/page";
import style from "./courses.module.css";
import { useSelector } from "react-redux";
import Image from "next/image";
import { commonImg } from "@/images";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoursesCopm() {
    const courses = useSelector((state: any) => state.coursesStore);
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
    

    return (
        <div className={`p-8 ${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"}`}>
            <div className={`title flex justify-between items-center ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[2rem]">Courses</h1>
                <div className="breadCrumbs ">
                    <p><Link href="/"><span>Home</span></Link> <span>/</span> <Link href="/courses"><span>Courses</span></Link></p>
                </div>
            </div>
            <div className={`${style.tableContainer}  p-4  ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
                <div className={`${style.searchAndAdd} flex justify-between w-[100%]`}>
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
                    <div className={`addDelete flex gap-4 items-center  ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                        <div className="flex gap-1 items-center cursor-pointer">
                            <Link href={'/courses/addCourses'} className="flex items-center gap-1">
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
                <Table data={filteredCourses} check={true} showDescription={true} moreIcon={true}/>
            </div>
        </div>
    )
}