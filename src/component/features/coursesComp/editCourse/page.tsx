'use client'
import { Button } from "@/component/button/page";
import { LineSelect } from "@/component/select/page";
import { commonImg, courseCloseIcon } from "@/images";
import { addCourse, updateCourse } from "@/redux/slices/coursesListSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const catocoryInfo = [
    {
        value: "All"
    },
    {
        value: "Bussiness"
    },
    {
        value: "Marketing"
    },
    {
        value: "Data Science"
    },
    {
        value: "Design"
    },
    {
        value: "Investing & Trading"
    }
]

const durationInfo = [
    {
        value: "1"
    },
    {
        value: "2"
    },
    {
        value: "3"
    },
    {
        value: "4"
    },
    {
        value: "5"
    },
    {
        value: "6"
    },
    {
        value: "7"
    },
    {
        value: "8"
    },
]
interface CourseInfo {
    courseId: number;
}

export default function EditCourse({ courseId }: CourseInfo) {

    const course = useSelector((store: any) => store.coursesStore);
    const [newCourse, setNewCourse] = useState({
        "#40": '',
        courseName_No: "",
        Name: "",
        shortCourse_No: "",
        "StudentsEnrolled": "",
        "FacultyAllotted": "",
        "TotalSeats": "",
        Duration: "",
        "RegFee": '',
        "TutionFee": '',
        "MaterialFee": '',
        "TotalFee": '',
        "GrandTotal": "",
        info_No: ""

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

    const router = useRouter();
    const dispatch = useDispatch();

    const closeBtn = () => {

    }

    const handleCurrencyInputChange = (setValue: any) => (event: any) => {
        const { name, value } = event.target;
        const newValue = event.target.value;


        // Check if the new value starts with the ₹ symbol
        if (newValue.startsWith('₹')) {
            // If it does, update the state with the new value
            // setValue(newValue);
            setNewCourse(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // If it doesn't, append the ₹ symbol to the new value and update the state
            // setValue('₹' + newValue);
            setNewCourse(prevState => ({
                ...prevState,
                [name]: '₹ ' + value
            }));
        }
    };

    const handleSubmit = () => {
        // setCourseData([...courseData, newCourse]);
        console.log("item", newCourse);
        dispatch(updateCourse({ id: courseId, updatedCourse: newCourse }));
        router.push('/courses');

    };

    const handleInputChanges = (e: any) => {
        if (newCourse.RegFee && newCourse.TutionFee && newCourse.MaterialFee) {
            console.log("RegFee", newCourse.RegFee.split('₹'));

            const TotalFee = parseInt(newCourse.RegFee.split('₹')[1]) + parseInt(newCourse.TutionFee.split('₹')[1]) + parseInt(newCourse.MaterialFee.split('₹')[1]);
            console.log("TotalFee", TotalFee);

            if (TotalFee) {
                setNewCourse(pre => ({
                    ...pre,
                    "TotalFee": '₹ ' + TotalFee.toString()
                }))
            }

        }
        if (newCourse.TotalFee) {
            const grandTotal = parseInt(newCourse.RegFee.split('₹')[1]) + parseInt(newCourse.TutionFee.split('₹')[1])
                + parseInt(newCourse.MaterialFee.split('₹')[1]) + parseInt(newCourse.TotalFee.split('₹')[1]);
            console.log("TotalFee", grandTotal);

            if (grandTotal) {
                setNewCourse(pre => ({
                    ...pre,
                    "GrandTotal": '₹ ' + grandTotal.toString()
                }))
            }
        }


        const { name, value } = e.target;
        setNewCourse(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleSelectChanges = (data: any) => {
        const key = Object.keys(data)[0];
        setNewCourse(pre => ({
            ...pre,
            [key]: data[key]
        }))

    }

    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (event: any) => {
        const value = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        }

        if (value) {
            reader.readAsDataURL(value);
        }
        console.log("value", reader);


    }

    useEffect(() => {
        const courseInfo = course.find((courses: any) => courses['#40'] === courseId);
        if (courseInfo) {
            setNewCourse(courseInfo);
        }
    }, [course, courseId]);

    useEffect(() => {
        const editInfo = course.filter((item: any) =>
            item["#40"] == courseId
        )
        setNewCourse(editInfo[0])
    }, [course])
    console.log("item", newCourse);

    return (
        <div className={`${darkMode==="true"?"bg-[#000] mainContainer":"mainContainer"} mainContainer`}>
            <h1 className={`font-[500] text-[2rem] mb-3 ${darkMode==="true"?"text-[#fff]":"text-[#000]"} `}>Edit Course</h1>
            <div className={` mb-8 ${darkMode==="true"?"bg-[#000] shadow":"bg-[#ffffff] "} containerInfo`}>
                <form onSubmit={handleSubmit}>

                    <div className="coursesInfo">
                        <div>
                            <h1 className={`text-[1.5rem] mb-6 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>Course Details</h1>
                        </div>
                        <div className="flex addEditCourse">
                            <div className="addInformation w-[60%] border-b border-[#f9f9f9]">
                                <div className="flex gap-12">
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Course Name</label>
                                        <input type="text" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} style={{ width: "390px" }} name="Name" value={newCourse.Name} onChange={handleInputChanges} />
                                    </div>
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Course Code</label>
                                        <input type="text" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="courseName_No" value={newCourse.courseName_No} onChange={handleInputChanges} />
                                    </div>
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Category</label>
                                        <LineSelect options={catocoryInfo} value={newCourse.shortCourse_No} setLineValue={handleSelectChanges} name={"shortCourse_No"} />
                                        {/* <select name="" id="">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select> */}
                                    </div>
                                </div>
                                <div className="flex gap-12 mt-8">
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Student Entrolled</label>
                                        <input type="number" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="StudentsEnrolled" value={newCourse.StudentsEnrolled} onChange={handleInputChanges} />
                                    </div>
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Faculty Alloted</label>
                                        <input type="number" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="FacultyAllotted" value={newCourse.FacultyAllotted} onChange={handleInputChanges} />
                                    </div>
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Total Seats</label>
                                        <input type="number" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="TotalSeats" value={newCourse.TotalSeats} onChange={handleInputChanges} />
                                    </div>
                                    <div className="field flex flex-col">
                                        <label htmlFor="" className="text-[.75rem] lableColor mb-1">Duaration</label>
                                        <div className="w-[160px]">
                                        <LineSelect options={durationInfo} name={"Duration"}  value={newCourse.Duration} setLineValue={handleSelectChanges} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="thumbnail w-[40%] h-[180px] ml-16 ">
                                <span className="lableColor text-[.83rem] ">Thumbnail Image</span>
                                <div className="relative w-[170px] h-[170px] mt-1">
                                    <input type="file" name="file" id="file" onChange={handleImageChange} className="hidden" />
                                    <label htmlFor="file">
                                        <Image src={commonImg.thumbnailIcon} alt="camaraIcon" className="absolute right-2 bottom-6" width={35} />
                                    </label>


                                    {image === null ?
                                        <Image src={courseCloseIcon.courseThumbnail} alt="thumbnailImage" />
                                        :
                                        <div className=" w-[170px] h-[150px]">
                                            <Image src={image} alt="Uploaded" width={180} height={150} style={{ width: "170px", height: "150px", borderRadius: "10px" }} />
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="feeInfo w-[60%] border-b border-[#f9f9f9]">
                        <div>
                            <h1 className="text-[1.5rem] mb-4">Fees</h1>
                        </div>
                        <div className="flex gap-4 pb-8">
                            <div className="field flex flex-col">
                                <label htmlFor="" className="text-[.75rem] lableColor mb-1">Reg Fee</label>
                                <input type="text" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="RegFee" value={newCourse.RegFee} onChange={handleCurrencyInputChange('RegFee')} />
                            </div>
                            <div className="field flex flex-col">
                                <label htmlFor="" className="text-[.75rem] lableColor mb-1">Tuition Fee</label>
                                <input type="text" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="TutionFee" value={newCourse.TutionFee} onChange={handleCurrencyInputChange('TutionFee')} />
                            </div>
                            <div className="field flex flex-col">
                                <label htmlFor="" className="text-[.75rem] lableColor mb-1">Material Fee</label>
                                <input type="text" className={`${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} name="MaterialFee" value={newCourse.MaterialFee} onChange={handleCurrencyInputChange('MaterialFee')} />
                            </div>
                        </div>
                        <div className="field flex flex-col mt-8">
                            <label htmlFor="" className="text-[.75rem] lableColor mb-1">Course Description</label>
                            <textarea name="info_No" value={newCourse.info_No} className="h-[90px] p-2 text-[.85rem] rounded-[5px]" onChange={handleInputChanges}></textarea>
                        </div>
                    </div>
                    <div className="actionBtn mt-16 flex gap-4">
                        <Button buttonType="button" text="Cancel" handleBtn={closeBtn} />
                        <Button buttonType="button" text="Update" handleBtn={handleSubmit} active={true} width={100} />
                    </div>
                </form>
            </div>
        </div>

    )
}