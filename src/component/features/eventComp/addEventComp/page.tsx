"use client";
import { Button } from "@/component/button/page"
import { LineSelect } from "@/component/select/page";
import { commonImg } from "@/images";
import { addEvents } from "@/redux/slices/eventSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendarEvent.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const Repeat = [
    {
        value: "Never"
    },
    {
        value: "Repeat"
    }
]

const catogory = [
    {
        value: "Education"
    },
    {
        value: "Programing"
    },
    {
        value: "celebration"
    },
]
export default function AddEventComp() {
    const eventSlice = useSelector((state: any) => state.eventStore);
    const [showCalendar, setShowCalendar] = useState(false);
    const [addEvent, setAddEvent] = useState([{
        id: '1',
        title: '',
        start: '',
        time: '',
        report: '',
        programName: ''
    }])
    const [error, setError] = useState({
        title: '',
        start: '',
        time: '',
        report: '',
        programName: ''
    });
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

    // const handleSubmit = () => {
    //     const errorMsg = { ...error };
    //     if (!addEvent.programName) {
    //         errorMsg.title = "Enter The Event";
    //     }
    //     if (!addEvent.programName) {
    //         errorMsg.programName = "Select The Category";
    //     }
    //     if (!addEvent.start) {
    //         errorMsg.start = "Select The Date";
    //     }
    //     if (!addEvent.time) {
    //         errorMsg.time = "Select The Time";
    //     }
    //     if (!addEvent.report) {
    //         errorMsg.report = "Select The Report";
    //     }

    //     setError(errorMsg);

    //     const setEvent = {
    //         title: addEvent.title,
    //         start: `${addEvent.start}T${addEvent.time}`,
    //         end: `${addEvent.start}T${addEvent.time}`,
    //         eventType: 'upComing',
    //         programName: addEvent.programName
    //     }
    //     //console.log(setEvent);
    //     dispatch(addEvents(setEvent));
    //     router.push("/event");

    // }

    const handleInputChange = (e: any, id: any) => {
       
        if (e.target) {
            const { name, value } = e.target;
            const updatedAddEvent = addEvent.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            );
            setAddEvent(updatedAddEvent);
        } else {
            const date=formatDate(e);
            debugger
            // const t=date.replace(/\//g, '-');
            const [day,month,year]=date.split('/');
            const formated=`${year}-${month}-${day}`;
            console.log(formated);
            
            const updatedAddEvent = addEvent.map(item =>
                item.id === id ? { ...item, "start": formated } : item
            );
            setAddEvent(updatedAddEvent);
        }

    }
    console.log("addEvent",addEvent);


    const handleSelectChange = (data: any) => {
        //console.log(data);
        const targetId = data.target.id;
        const value = data.target.value;
        const targetName = data.target.name;
        //console.log(targetId,value,targetName);



        // const key = Object.keys(data)[0];
        // setAddEvent((pre: any) => ({
        //     ...pre,
        //     [key]: data[key]
        // }))
        // setError((pre => ({
        //     ...pre,
        //     [key]: ""
        // })))

        // const key = Object.keys(value)[0];
        const updatedAddEvent = addEvent.map(item =>
            item.id === targetId ? { ...item, [targetName]: value } : item
        );
        setAddEvent(updatedAddEvent);

    }

    const closeBtn = () => {

    }

    const handleSubmit = () => {
        dispatch(addEvents(addEvent));
        router.push("/event");
    }

    const handleAddField = () => {
        const newId = parseInt(addEvent[addEvent.length - 1].id) + 1;
        setAddEvent([...addEvent, {
            id: newId.toString(),
            title: '',
            start: '',
            time: '',
            report: '',
            programName: ''
        }])

    }

    const deleteEvent = (id: any) => {
        const deletedList = addEvent.filter((item => item.id !== id))
        setAddEvent(deletedList);
    }
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: any, id: any) => {
        setSelectedDate(date);
        handleInputChange(date, id);
        setShowCalendar(false);
    };
    const formatDate = (dateString:any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Specify 'en-GB' for DD/MM/YYYY format
      }

    return (
        <div className={`mainContainer ${darkMode==="true"?"bg-[#000]":"bg-[#f9f9f9]"}`}>
            <h1 className={`font-[500] text-[2rem] mb-3 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>Add Course</h1>
        <div className={`containerInfo ${darkMode==="true"?"text-[#fff] bg-[#000] shadow":"text-[#000] bg-[#fff]"}`}>

            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
                {addEvent?.map((item: any, index: any) => (
                    //console.log(item.id),

                    <div key={index}>
                        <div className="flex justify-between mb-4 items-center ">
                            <p className={`text-[1.6rem] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>Event {index + 1}</p>
                            <div>
                                <Image src={commonImg.deleteIcon} alt="deleteIcon" onClick={() => deleteEvent(item.id)} />
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap  gap-12 border-b pb-[2rem]">

                            <div className="field flex flex-col w-[30%]">
                                <label htmlFor="title" className="text-[.8rem] lableColor mb-1">Event Name</label>
                                <input type="text" name="title" className={`w-[100%] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`} onChange={(e) => handleInputChange(e, item.id)} value={item.title} />
                                <div className="error-message">{error.title && error.title}</div>
                            </div>
                            <div className="field flex flex-col w-[12%]">
                                <label htmlFor="programName" className="text-[.8rem] lableColor mb-1">Category</label>
                                <LineSelect options={catogory} name="programName" value={item.programName} ids={index + 1} setLineValue={handleSelectChange} />
                                <div className="error-message">{error.programName}</div>
                                {/* <input type="text" name="RegFee" /> */}
                            </div>
                            <div className="field flex flex-col w-[12%]">
                                <label htmlFor="start" className="text-[.8rem] lableColor mb-1">Date</label>
                                <input type="date" name="start" className={`date-input cursor-pointer ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`} value={item.start} onClick={() => setShowCalendar(!showCalendar)} />
                                {showCalendar &&
                                    <div className="dashBoardCalendar eventCalendar">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(e) => handleDateChange(e, item.id)}
                                            dateFormat="dd-MM-yyyy" 
                                            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                                            dropdownMode="select"
                                            calendarClassName="rbc-calendar"
                                            inline
                                        />

                                    </div>
                                }
                                <div className="error-message">{error.start}</div>
                            </div>
                            <div className="field flex flex-col w-[12%]">
                                <label htmlFor="time" className="text-[.8rem] lableColor mb-1">Time</label>
                                <input type="time" name="time" value={item.time} className={`${darkMode=="true"?"text-[#fff]":"text-[#000]"}`} onChange={(e) => handleInputChange(e, item.id)} />
                                <div className="error-message">{error.time}</div>
                            </div>
                            <div className="field flex flex-col w-[12%]">
                                <label htmlFor="report" className="text-[.8rem] lableColor mb-1">Report</label>
                                <LineSelect options={Repeat} name="report" value={item.report} ids={index + 1} setLineValue={handleSelectChange} />
                                <div className="error-message">{error.report}</div>
                            </div>

                            <div className="field flex flex-col w-[100%] mt-[-1.5rem]">
                                <label htmlFor="" className="text-[.8rem] lableColor mb-1">Event Description</label>
                                <textarea name="info_No" className={`h-[60px] p-2 text-[.85rem] rounded-[5px] ${darkMode=="true"?"text-[#fff]":"text-[#000]"}`} ></textarea>
                            </div>


                        </div>
                    </div>
                ))}

                <div className="mt-[1rem]">
                    <p className="text-[#c030f0] font-[600] cursor-pointer" onClick={handleAddField}><span className="font-[600] text-[1.1rem]">+</span> Add New</p>
                </div>

                <div className="actionBtn mt-16 flex gap-4">
                    <Button buttonType="button" text="Cancel" handleBtn={closeBtn} width={100} />
                    <Button buttonType="button" text="Add" handleBtn={handleSubmit} active={true} width={100} />
                </div>
            </form>
        </div>
        </div>
    )
}