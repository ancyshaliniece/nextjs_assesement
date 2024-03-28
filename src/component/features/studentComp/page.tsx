"use client";
import { TableWithEdit } from "@/component/table/page";
import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseView from "./courseView/page";

export default function StudentList() {
    const courses = useSelector((state: any) => state.studentListStore);
    const [toggle, setToggle] = useState(false);
    const mode=useSelector((store:any)=>store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    // useEffect(() => {
    //     const modes=mode[0].mode;
    //     setdarkMode(modes);
    // }, [mode])
    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    const [filteredCourses, setFilteredCourses] = useState([]);

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
        <div className={`studentCopm ${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[2rem]">Students</h1>
                <div className="breadCrumbs">
                    <p className="text-[.85rem] text-[#676767]"><Link href="/"><span className="mx-[.2rem]">Home</span></Link> <span>/</span><span className="mx-[.2rem] text-[#c030f0]">Student</span></p>
                </div>
            </div>
            <div className={`tableContainer  p-4 ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>

                <div className={` flex justify-between w-[100%] mt-4`}>
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
                    <div className={`addDelete flex gap-4 items-center mr-2 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                        <div className="tab text-[.85rem] flex gap-2 items-center cursor-pointer">
                            <label htmlFor="switch" className={`cursor-pointer  ${toggle && darkMode==="false" ? `text-[#000]` : `text-[#9f9f9f]`}`}>Course View</label>
                            <label htmlFor="switch" className="switch">
                                <input type="checkbox" name="switch" id="switch" className="w-[30px] invisible toggleInput" onChange={() => setToggle(!toggle)} />
                                <span className="toggleSlider round"></span>
                            </label>
                            <label htmlFor="switch" className={`cursor-pointer ${!toggle && darkMode==="false" ? `text-[#000]` : `text-[#9f9f9f]`}`}>Students View</label>
                        </div>
                        <span className="lightAsh">|</span>
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
                {!toggle ? <TableWithEdit data={filteredCourses} check={true} moreIcon={false} imgFolder={"Faculty/"} headPading={true} /> :
                    <div className="courseView border-t mt-4 p-4">
                        <CourseView />
                    </div>}

            </div>
        </div>
    )
}