'use client';
import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from './allCourse.module.css';
import Table, { TableWithEdit } from "@/component/table/page";

interface Params {
    params: any
}
interface Courses {
    courseName: string,
    courseId: string,
    CourseDetails: any,
    courseLogo:any,
    shortFor:any,
    Prof:any,
}

export default function SingleCourseMarkSheet({ params }: Params) {
    console.log("params", params.courseMarkSheet);

    const courses = useSelector((state: any) => state.studentMarkSheetStore);
    const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Courses | null>(null);
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

        const filteredData = selectedCourse?.CourseDetails.filter((item: any) =>

            Object.values(item).some((value: any) =>
                value.toString().toLowerCase().includes(searchTerm)
            )
        );
        setFilteredCourses(filteredData);
    }

    useEffect(() => {

        const info = courses.filter((item: any) => item?.courseName?.replace(/\s+/g, '') === params.courseMarkSheet);
        setFilteredCourses(info[0]?.CourseDetails);
        setSelectedCourse(info[0])
    }, [courses])

    return (
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[2rem]">Marksheet Entry</h1>
                <div className="breadCrumbs">
                    <p className="text-[.85rem] text-[#676767]"><Link href="/"><span className="mx-[.2rem]">Home</span></Link> <span>/</span> <Link href="/marksheet"><span className="mx-[.2rem]">MarkSheet Entry</span></Link><span>/</span><span className="mx-[.2rem] text-[#c030f0]">{selectedCourse?.courseName}</span></p>
                </div>
            </div>
            <div className={`tableContainer  p-4 ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>
                <div className={`flex justify-between items-center pb-4 border-b-[1px] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                    <div className="courseInfo">
                        <div className="flex gap-2 text-[1.4rem]">
                            <p>{selectedCourse?.courseName}</p>
                            <span>({selectedCourse?.courseId})</span>
                        </div>
                        <div className="flex gap-2 text-[.85rem] mt-2">
                            <p className=" bg-[#faa21f] text-white py-0 px-1 rounded-sm">{selectedCourse?.shortFor}</p>
                            <p className=" bg-[#969696] text-white py-0 px-1 rounded-sm">Prof : {selectedCourse?.Prof}</p>
                        </div>
                    </div>
                    <div className="courseImage">
                        <Image src={`/Assets/Marksheet Entry/${selectedCourse?.courseLogo}` } alt="log" width={65} height={65} />
                    </div>
                </div>

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
                        <div className="flex gap-1 items-center cursor-pointer">
                            <div  className="flex items-center gap-1">
                                <Image src={commonImg.addIcon} alt="addIcon" className="w-[13px]" />
                                <span className="text-[.85rem]">Add</span>
                            </div>
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
                <TableWithEdit data={filteredCourses} check={true} moreIcon={true} courseId={selectedCourse?.courseId} edit={true} imgFolder={"Marksheet Entry/New folder/"}/>
            </div>
        </div>
    )
}