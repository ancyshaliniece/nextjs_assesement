'use client';

import { commonImg } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface StudentInfo {
    student: any,
}
export default function StudentDetailsComp({ student }: StudentInfo) {
    const studentList = useSelector((state: any) => state.studentListStore);
    const [newStudent, setNewStudent] = useState({
        img: "",
        Name: "",
        LastName: "",
        BloodGroup: "",
        Address: "",
        ID: "",
        "Course Name": "",
        Gender: "",
        DOB: "",
        "Mob.No": "",
        "Email ID": "",
        Description: ""
    });
    const mode=useSelector((store:any)=>store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);

    useEffect(() => {
        const mode=localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    useEffect(() => {
        const stud = studentList.filter((item: any) => item.Name === student);
        console.log("stud", stud);
        setNewStudent(stud[0]);

    }, [studentList])
    return (
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[1.9rem]">Student Details</h1>
                <div className="breadCrumbs text-[.85rem]">
                    <p className="text-[#676767]"><Link href="/"><span>Home</span></Link> <span>/</span><span className="text-[#c030f0]">Student Details</span></p>
                </div>
            </div>
            <div className={`tableContainer p-4 h-[70vh] ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>
                <div className="border-b pb-3 px-2 flex justify-between w-[100%]">
                    <div className="flex gap-2 items-center">
                        <p className="text-[1.3rem]">{newStudent.Name} {newStudent.LastName}</p>
                        <span className="detailsActive">Active</span>
                    </div>
                    <Link href={`/student/editStudent/${newStudent.Name}_${newStudent["Course Name"]?.split(" ")?.join("")}`} className="flex gap-2 items-center">
                        <Image src={commonImg.editIcon} alt="edit" width={14} />
                        <span className="text-[.9rem] font-[500]">Edit</span>
                    </Link>
                </div>
                <div className="formFields">
                    <form >
                        <div className="flex gap-16">
                            <div className="flex justify-between flex-wrap  w-[70%] mt-4 ml-4">
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">First Name</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.Name}</span>

                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="lastName">Last Name</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.LastName}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Course Name</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent["Course Name"]}</span>
                                </div>


                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Roll</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.ID}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Date of Birth</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.DOB}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Gender</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.Gender}</span>
                                </div>


                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Mob No</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent["Mob.No"]}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Blood Group</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.BloodGroup}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Address</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent.Address}</span>
                                </div>
                                <div className="w-[20%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Email</label>
                                    <span className="w-[100%] mt-1 font-[500]">{newStudent["Email ID"]}</span>
                                </div>
                                <div className="w-[100%] flex flex-col mb-[1.8rem]">
                                    <label className="text-[.8rem] text-[#8d8c8c] font-[500]" htmlFor="description">Description</label>
                                    <span className="w-[100%] text-[.85rem] mt-1">{newStudent.Description}</span>
                                </div>
                            </div>
                            <div className="w-[30%] mt-4 pl-16">
                                <div>
                                    <span className="text-[.8rem] text-[#8d8c8c] font-[500]">profile Image</span>
                                    <div className="relative w-[170px] h-[170px] mt-1">
                                        <Image src={`/Assets/Faculty/${newStudent.img}`} alt="thumbnailImage" width={170} height={170} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}