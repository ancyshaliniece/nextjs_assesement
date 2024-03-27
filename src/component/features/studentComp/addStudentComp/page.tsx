"use client";
import { Button } from "@/component/button/page";
import { LineSelect } from "@/component/select/page";
import { commonImg, courseCloseIcon } from "@/images";
import { addStudent } from "@/redux/slices/studentListSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendarEvent.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

export default function AddStudentComp() {
    const [image, setImage] = useState<string | null>(null);
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
        Description: "",
    });
    const [error, setError] = useState({
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
        Description: "",
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const mode=useSelector((store:any)=>store.modeStore);
    const [darkMode, setdarkMode] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);

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
        if(e.target){
            const { name, value } = e.target;
            setNewStudent((pre => ({
                ...pre,
                [name]: value
            })))
            setError((pre=>({
                ...pre,
                [name]:""
            })))
        }else{
            const date=formatDate(e);
            debugger
            // const t=date.replace(/\//g, '-');
            const [day,month,year]=date.split('/');
            const formated=`${year}-${month}-${day}`;
            console.log(formated);
            
           
            setNewStudent((pre => ({
                ...pre,
                DOB: formated
            })))
        }
       

    }

    const handleSelectChange = (data: any) => {
        const key = Object.keys(data)[0];
        setNewStudent(pre => ({
            ...pre,
            [key]: data[key]
        }))

        setError((pre=>({
            ...pre,
            [key]:""
        })))
    }

    const handleForm = () => {
        const errorsCopy={...error};
        if(!newStudent.Name){
            errorsCopy.Name="Enter the Name";
        }
        if(!newStudent.LastName){
            errorsCopy.LastName="Enter the LastName";
        }
        if(!newStudent["Course Name"]){
            errorsCopy["Course Name"]="Select Course";
        }
        if(!newStudent.ID){
            errorsCopy.ID="Enter The Roll";
        }
        if(!newStudent.DOB){
            errorsCopy.DOB="Select DOB";
        }
        if(!newStudent.Gender){
            errorsCopy.Gender="Select Gender";
        }
        if(!newStudent["Mob.No"]){
            errorsCopy["Mob.No"]="Enter The Mob Number";
        }
        if(!newStudent.BloodGroup){
            errorsCopy.BloodGroup="Enter The BloodGroup";
        }
        if(!newStudent["Email ID"]){
            errorsCopy["Email ID"]="Enter The Email Id";
        }
        if(!newStudent.Address){
            errorsCopy.Address="Enter The Address";
        }

        setError(errorsCopy);
        
        if (Object.values(errorsCopy).some((error) => error !== "")) {
            return;
        }else{
            dispatch(addStudent(newStudent))
            router.push(`/student/studentDetails/${newStudent.Name}`)
        }

    }
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: any, id: any) => {
        setSelectedDate(date);
        handleChange(date);
        setShowCalendar(false);
    };
    const formatDate = (dateString:any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Specify 'en-GB' for DD/MM/YYYY format
      }

    return (
        <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[1.9rem]">Add Student</h1>
                <div className="breadCrumbs text-[.85rem]">
                    <p className="text-[#676767]"><Link href="/"><span>Home</span></Link> <span>/</span><Link href="/student"><span>Students</span></Link> <span>/</span> <Link href="/courses"><span className="text-[#c030f0]">Add Student</span></Link></p>
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
                                    <div className="error-message">{error.Name &&error.Name}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="lastName">Last Name<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Last name" onChange={handleChange} name="LastName" value={newStudent.LastName} />
                                    <div className="error-message">{error.LastName &&error.LastName}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] lableColor font-[500] mb-2" htmlFor="firstName">Course Name<span className="text-red-500">*</span></label>
                                    <div className="w-[100%] font-[500]">
                                        <LineSelect options={courseInfo} width={350} value={newStudent["Course Name"]} setLineValue={handleSelectChange} name={"Course Name"} />
                                    </div>
                                    <div className="error-message">{error["Course Name"] &&error["Course Name"]}</div>
                                </div>


                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Roll<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Roll" onChange={handleChange} name="ID" value={newStudent["ID"]} />
                                    <div className="error-message">{error["ID"] &&error["ID"]}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Date of Birth<span className="text-red-500">*</span></label>
                                    {/* <input className="w-[100%] mt-2 font-[500]" type="date" placeholder="Enter the DOB" onChange={handleChange} name="DOB" value={newStudent["DOB"]} /> */}
                                    <input className={`w-[100%] mt-2 font-[500] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`} type="date" placeholder="Enter the DOB" onChange={handleChange} name="DOB" value={newStudent["DOB"]} onClick={() => setShowCalendar(!showCalendar)} />
                                    {showCalendar &&
                                    <div className="dashBoardCalendar eventCalendar">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(e) => handleDateChange(e, newStudent["DOB"])}
                                            dateFormat="dd-MM-yyyy" 
                                            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                                            dropdownMode="select"
                                            calendarClassName="rbc-calendar"
                                            inline
                                        />

                                    </div>
                                }
                                    <div className="error-message">{error["DOB"] &&error["DOB"]}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] lableColor font-[500] mb-0" htmlFor="firstName">Gender<span className="text-red-500">*</span></label>
                                    <div className="w-[100%] mt-2 font-[500]">
                                        <LineSelect options={genderInfo} width={280} value={newStudent["Gender"]} setLineValue={handleSelectChange} name={"Gender"} />
                                    </div>
                                    <div className="error-message">{error["Gender"] &&error["Gender"]}</div>
                                </div>


                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Mob No<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Mob No" onChange={handleChange} name="Mob.No" value={newStudent["Mob.No"]} />
                                    <div className="error-message">{error["Mob.No"] &&error["Mob.No"]}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Blood Group<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Blood" onChange={handleChange} name="BloodGroup" value={newStudent.BloodGroup} />
                                    <div className="error-message">{error.BloodGroup &&error.BloodGroup}</div>
                                </div>
                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Email<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Email" onChange={handleChange} name="Email ID" value={newStudent["Email ID"]} />
                                    <div className="error-message">{error["Email ID"] &&error["Email ID"]}</div>
                                </div>

                                <div className="w-[30%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Address<span className="text-red-500">*</span></label>
                                    <input className="w-[100%] mt-2 font-[500]" type="text" placeholder="Enter the Address" onChange={handleChange} name="Address" value={newStudent.Address} />
                                    <div className="error-message">{error.Address &&error.Address}</div>
                                </div>
                                <div className="w-[100%] flex flex-col mb-[2.3rem]">
                                    <label className="text-[.8rem] text-[#8d8c8c] font-[500]" htmlFor="description">Description</label>
                                    <textarea name="Description" id="description" value={newStudent?.Description} cols={30} rows={2} className="rounded-md" onChange={handleChange} />
                                    <div className="error-message">{error.Description &&error.Description}</div>
                                </div>
                            </div>
                            <div className="w-[30%] mt-4">
                                <div>
                                    <span className="text-[.8rem] text-[#8d8c8c] font-[500]">profile</span>
                                    <div className="relative w-[170px] h-[170px] mt-1">
                                        <input type="file" name="file img" id="file" onChange={handleFile} className="hidden" />
                                        <label htmlFor="file">
                                            <Image src={commonImg.thumbnailIcon} alt="camaraIcon" className="absolute right-2 bottom-6" width={35} />
                                        </label>
                                        {image === null ?
                                            <Image src={courseCloseIcon.courseThumbnail} alt="thumbnailImage" /> :
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
    )
}