"use client";
import { Button } from "@/component/button/page";
import { LineSelect } from "@/component/select/page";
import { commonImg, courseCloseIcon } from "@/images";
import { addFaculty } from "@/redux/slices/facultySlice";
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
        value: "Quality Analyst"
    },
    {
        value: "Web Developer"
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


export default function AddFacultyComp() {
    const [image, setImage] = useState<string | null>(null);
    const [newFaculty, setNewFaculty] = useState({
        img: "",
        Name: "",
        LastName: "",
        To: "",
        From: "",
        "Course Name": "",
        Gender: "",
        DOB: "",
        "Mob.No": "",
        "Email ID": "",
        Description: "",
    });
    const [errors,setErrors]=useState({
        Name: "",
        LastName: "",
        "Course Name": "",
        From: "",
        To: "",
        DOB: "",
        "Mob.No": "",
        "Email ID": "",
        Gender:"",
    })
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

    const dispatch = useDispatch();
    const router = useRouter();

    const handleFile = (event: any) => {
        const value = event.target.files[0];
        const reader = new FileReader();
        if (value) {
            reader.readAsDataURL(value);
        }
        reader.onloadend = () => {
            setImage(reader.result as string);
            setNewFaculty(pre => ({
                ...pre,
                img: value.name
            }))
        }

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewFaculty((pre => ({
            ...pre,
            [name]: value
        })))

        setErrors((pre=>({
            ...pre,
            [name]:""
        })))

    }

    const handleSelectChange = (data: any) => {
        const key = Object.keys(data)[0];
        setNewFaculty(pre => ({
            ...pre,
            [key]: data[key]
        }))

        setErrors((pre=>({
            ...pre,
            [key]:""
        })))
    }

    const handleForm = () => {
        const errorsCopy = { ...errors };

        if (!newFaculty.Name) {
            errorsCopy.Name = "Please enter a first name";
        }
        if (!newFaculty.LastName) {
            errorsCopy.LastName = "Please enter a last name";
        }
        if (!newFaculty["Course Name"]) {
            errorsCopy["Course Name"] = "Please select a course";
        }
        if (!newFaculty.From){
            errorsCopy.From="Please Select From";
        }
        if(!newFaculty.To){
            errorsCopy.To = "Please Select To";
        }
        if(!newFaculty.DOB){
            errorsCopy.DOB = "Please Select DOB";
        }
        if(!newFaculty["Mob.No"]){
            errorsCopy["Mob.No"] ="Please Enter the Mob No";
        }
        if(!newFaculty["Email ID"]){
            errorsCopy["Email ID"] ="Please Enter the Mail Id";
        }
        if(!newFaculty.Gender){
            errorsCopy.Gender ="Please Select the Genter";
        }
        setErrors(errorsCopy);

        if (Object.values(errorsCopy).some((error) => error !== "")) {
            return;
        }

        let findId = "";
        if (newFaculty["Course Name"] === "Artificial Intelligence") {
            findId = "AI2231";
        } else if (newFaculty["Course Name"] === "Public Relations") {
            findId = "PRF5698";
        } else if (newFaculty["Course Name"] === "Quality Analyst") {
            findId = "QA193";
        } else if (newFaculty["Course Name"] === "Web Developer") {
            findId = "WD1284";
        } else if (newFaculty["Course Name"] === "Animation") {
            findId = "ANM1294";
        } else if (newFaculty["Course Name"] === "Motion Graphics") {
            findId = "MGF1204";
        } else if (newFaculty["Course Name"] === "Web Design") {
            findId = "UID5628";
        } else if (newFaculty["Course Name"] === "UI/UX Design") {
            findId = "UID1298";
        }

        const inputDate = newFaculty.From;
        const dateObj = new Date(inputDate);
        const day = dateObj.getDate();
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();

        const inputDateTo = newFaculty.From;
        const dateObjTo = new Date(inputDateTo);
        const dayTo = dateObjTo.getDate();
        const monthIndexTo = dateObjTo.getMonth();
        const yearTo = dateObjTo.getFullYear();

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedDateFrom = `${day} ${monthNames[monthIndex]} ${year}`;
        const formattedDateTo = `${dayTo} ${monthNames[monthIndexTo]} ${yearTo}`;


        if (findId !== "") {
            const faculty = {
                name: newFaculty["Course Name"],
                facultyDetails: [
                    {
                        img: newFaculty.img,
                        Name: newFaculty.Name,
                        Id: findId,
                        From: formattedDateFrom,
                        To: formattedDateTo,
                        period: "3 Months",
                        Gender: newFaculty.Gender,
                        DOB: newFaculty.DOB,
                        "Mob.No": newFaculty["Mob.No"],
                    },
                ],
            }
            dispatch(addFaculty(faculty))
            router.push(`/faculty`)
        }

    }
 
  
    return (
        <>
            <div className={`${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"} p-8`}>
                <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                    <h1 className="text-[1.9rem]">Add Faculty</h1>
                    <div className="breadCrumbs text-[.85rem]">
                        <p className="text-[#676767]"><Link href="/"><span>Home</span></Link> <span>/</span><Link href="/faculty"><span>Faculty</span></Link> <span>/</span> <Link href="/courses"><span className="text-[#c030f0]">Add Faculty</span></Link></p>
                    </div>
                </div>
                <div className={`tableContainer  p-4 ${darkMode==="true"?"bg-[#000]":"bg-[#fff]"}`}>
                    <div className="pb-3 pl-2">
                        <p className="text-[1.4rem]">Faculty Information</p>
                    </div>
                    <div className="formFields">
                        <form onSubmit={handleForm}>
                            <div className="flex gap-8">
                                <div className="flex justify-between flex-wrap  w-[70%] mt-4 ml-4">
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">First Name<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="text" name="Name" placeholder="Enter the First name" onChange={handleChange} value={newFaculty.Name} />
                                         <div className="error-message">{errors.Name &&errors.Name}</div>
                                    </div>
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="lastName">Last Name<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="text" placeholder="Enter the Last name" onChange={handleChange} name="LastName" value={newFaculty.LastName} />
                                         <div className="error-message">{errors.LastName &&errors.LastName}</div>
                                    </div>
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Course Name<span className="text-red-500">*</span></label>
                                        <LineSelect options={courseInfo} width={280} value={newFaculty["Course Name"]} setLineValue={handleSelectChange} name={"Course Name"} selectInfo={"Course"} />
                                         <div className="error-message">{errors["Course Name"]&&errors["Course Name"]}</div> 
                                    </div>


                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="From">From<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="date" onChange={handleChange} name="From" value={newFaculty["From"]} />
                                         <div className="error-message">{errors.From &&errors.From}</div> 
                                    </div>
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="To">To<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="date" onChange={handleChange} name="To" value={newFaculty["To"]} />
                                         <div className="error-message">{errors.To &&errors.To}</div> 
                                    </div>
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Date of Birth<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="date" onChange={handleChange} name="DOB" value={newFaculty["DOB"]} />
                                        <div className="error-message">{errors.DOB && errors.DOB}</div> 
                                    </div>
                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] lableColor font-[500]" htmlFor="firstName">Gender<span className="text-red-500">*</span></label>
                                        <div className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                                            <LineSelect options={genderInfo} width={280} value={newFaculty["Gender"]} setLineValue={handleSelectChange} name={"Gender"} selectInfo={"Gender"} />
                                            <div className="error-message">{errors.Gender && errors.Gender}</div> 
                                        </div>
                                    </div>


                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Mob No<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="text" placeholder="Enter the Mob No" onChange={handleChange} name="Mob.No" value={newFaculty["Mob.No"]} />
                                        <div className="error-message">{errors["Mob.No"] && errors["Mob.No"]}</div> 
                                    </div>

                                    <div className="w-[30%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.75rem] text-[#8d8c8c] font-[500]" htmlFor="firstName">Email<span className="text-red-500">*</span></label>
                                        <input className={`w-[100%] mt-2 font-[500] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} type="text" placeholder="Enter the Email" onChange={handleChange} name="Email ID" value={newFaculty["Email ID"]} />
                                         <div className="error-message">{errors["Email ID"] &&errors["Email ID"]}</div> 
                                    </div>


                                    <div className="w-[100%] flex flex-col mb-[1.9rem]">
                                        <label className="text-[.8rem] text-[#8d8c8c] font-[500]" htmlFor="description">Description</label>
                                        <textarea name="Description" id="description" value={newFaculty?.Description} cols={30} rows={2} className="rounded-md" onChange={handleChange} />
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
        </>
    )
}