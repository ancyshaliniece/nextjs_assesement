"use client";
import { Button } from "@/component/button/page";
import { LineSelect } from "@/component/select/page";
import { commonImg } from "@/images";
import {updateStudent } from "@/redux/slices/studentListSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const courseInfo = [
    {
        value: "Artificial Intelligence"
    },
    {
        value: "Public Relations"
    },
    {
        value: "Graphic Design"
    },
    {
        value: "BlockChain and Cryoticurrency"
    },
    {
        value: "UI/UX Design"
    },
    {
        value: "Web Design"
    },
    {
        value: "Motion Graphics"
    },
    {
        value: "Animation"
    }
]

const genderInfo = [
    {
        value: "Male"
    },
    {
        value: "Female"
    },
    {
        value: "Others"
    },
]

interface EditInfo{
    studentID:string
}

export default function EditStudentComp({studentID}:EditInfo){
    const [image, setImage] = useState<string | null>(null);
    const studentInfo=useSelector((state:any)=>state.studentListStore);
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
        Description:"",

    });
    const dispatch=useDispatch();
    const router= useRouter();
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


    const handleFile = (event: any) => {
        const value = event.target.files[0];
        const reader = new FileReader();
        if (value) {
            reader.readAsDataURL(value);
        }
        reader.onloadend = () => {
            setImage(reader.result as string);
            setNewStudent(pre => ({
                ...pre,
                img: value.name
            }))
        }

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewStudent((pre => ({
            ...pre,
            [name]: value
        })))

    }

    const handleSelectChange = (data: any) => {
        const key = Object.keys(data)[0];
        setNewStudent(pre => ({
            ...pre,
            [key]: data[key]
        }))


    }

    const handleForm=()=>{
        console.log("newStudent",newStudent);
        
        dispatch(updateStudent(newStudent));
        router.push("/student");
    }
    useEffect(()=>{
        if(studentID!==""){
            const formatted=studentID?.split("_");
           studentInfo?.filter((item:any)=>{
                if(item.Name===formatted[0] || item["Course Name"]===formatted[1]){
                    const test=item;
            setNewStudent(test);
                }
              
            });
            
        }
    },[studentID])
    console.log("editStudent",newStudent);

    return(
        <>
         <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[1.9rem]">Edit Student</h1>
                <div className="breadCrumbs text-[.85rem]">
                    <p className="text-[#676767]"><Link href="/"><span>Home</span></Link> <span>/</span><Link href="/student"><span>Students</span></Link> <span>/</span> <Link href="/courses"><span className="text-[#c030f0]">Edit Student</span></Link></p>
                </div>
            </div>
            <div className={`tableContainer p-4 ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>
                <div className="border-b pb-3 pl-2">
                    <p className="text-[1.6rem]">Student Information</p>
                </div>
                <div className="formFields">
                    <form onSubmit={handleForm}>
                        <div className="flex gap-8">
                            <div className="flex justify-between flex-wrap  w-[70%] mt-4 ml-4">
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">First Name<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" name="Name" placeholder="Enter the First name" onChange={handleChange} value={newStudent.Name} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="lastName">Last Name<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Last name" onChange={handleChange} name="LastName" value={newStudent.LastName} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Course Name<span className="text-red-500">*</span></label>
                                    <LineSelect options={courseInfo} value={newStudent["Course Name"]} width={280} setLineValue={handleSelectChange} name={"Course Name"} />
                                </div>


                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Roll<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Roll" onChange={handleChange} name="ID" value={newStudent["ID"]} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Date of Birth<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="date" placeholder="Enter the DOB" onChange={handleChange} name="DOB" value={newStudent["DOB"]} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Gender<span className="text-red-500">*</span></label>
                                    <div className="w-[100%] mt-2 font-[500]">
                                        <LineSelect options={genderInfo} value={newStudent["Gender"]} width={280} setLineValue={handleSelectChange} name={"Gender"} />
                                    </div>
                                </div>


                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Mob No<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Mob No" onChange={handleChange} name="Mob.No" value={newStudent["Mob.No"]} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Blood Group<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Blood" onChange={handleChange} name="BloodGroup" value={newStudent.BloodGroup} />
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Email<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Email" onChange={handleChange} name="Email ID" value={newStudent["Email ID"]} />
                                </div>

                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Address<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Address" onChange={handleChange} name="Address" value={newStudent.Address} />
                                </div>
                                <div className="w-[100%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.8rem] text-[#8d8c8c] font-[500]" htmlFor="description">Description</label>
                                    <textarea name="Description" id="description" value={newStudent?.Description} cols={30} rows={2} className="rounded-md" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="w-[30%] mt-4">
                                <div>
                                    <span className="text-[.8rem] text-[#8d8c8c] font-[500]">profile Image</span>
                                    <div className="relative w-[170px] h-[170px] mt-1">
                                        <input type="file" name="file img" id="file" onChange={handleFile} className="hidden" />
                                        <label htmlFor="file">
                                            <Image src={commonImg.thumbnailIcon} alt="camaraIcon" className="absolute right-2 bottom-6" width={35} />
                                        </label>
                                        {image === null ?
                                            <Image src={`/Assets/Faculty/${newStudent.img}`} alt="thumbnailImage" width={170} height={170}/> :
                                            <div className="w-[170px] h-[170px]">
                                                <Image src={image} alt="iamge" width={170} height={170} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="actionBtn flex gap-4 mt-16 ml-4">
                            <Button buttonType="button" text="Cancel" width={120} />
                            <Button buttonType="button" text="Submit" handleBtn={handleForm} active={true} width={120} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}