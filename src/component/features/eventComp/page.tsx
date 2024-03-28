"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import Image from "next/image";
import { commonImg, event } from "@/images";
import { useSelector } from "react-redux";

export default function EventComp() {
    const calendarRef = useRef<any>(null);
    const viewRef = useRef('dayGridMonth');
    const eventStore = useSelector((state: any) => state.eventStore);

    const [view, setView] = useState('dayGridMonth');
    const [events, setEvents] = useState([]);
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

    useEffect(() => {
        if (calendarRef.current) {
            const todayCell = calendarRef.current?.getApi()?.view?.dayGrid?.el
                ?.querySelector('.fc-day-today');

            if (todayCell) {
                const button = document.createElement('button');
                button.textContent = 'Event';
                button.className = 'test';
                button.addEventListener('click', handleAddEvent);

                todayCell.appendChild(button);
            }
            calendarRef.current.getApi().changeView(view);

        }
    }, [view]);

    useEffect(() => {
        console.log("eventStore", eventStore);
        setEvents(eventStore);
    }, [])


    const handleViewChange = (e: any) => {
        const selectedView = e.target.value;
        viewRef.current = e.target.value;
        setView(selectedView);
    };

    const eventClassNames = (arg: any) => {
        const eventType = arg.event.extendedProps.eventType;

        switch (eventType) {
            case 'currentWeek':
                return 'current-week-event';
            case 'upcoming':
                return 'upcoming-event';
            case 'finished':
                return 'finished-event';
            default:
                return 'upcoming-event';
        }
    };


    const handleAddEvent = (newEvent: any) => {
        const newEvents = {
            "title": 'Good',
            "start": '2024-03-22T12:00:00', // Start time for Event 2
            "end": '2024-03-22T15:00:00', // End time for Event 2
            "eventType": 'upComing',
            "programName": 'Data Science Seminar' // Program name for Event 2
        }


    }

    return (
        <div className={`eventComp ${darkMode==="true"?"bg-[#000] ":"bg-[#f9f9f9]"} p-8`}>
            <div className={`title flex justify-between items-center mb-4 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`} >
                <h1 className="text-[1.8rem]">Events</h1>
                <div className="breadCrumbs text-[.85rem] text-[#676767]">
                    <p>
                        <Link href="/"><span className="mx-[.2rem]">Home</span></Link>
                        <span>/</span>
                        <span className="mx-[.2rem] text-[#c030f0]">Events</span>
                    </p>
                </div>
            </div>
            <div className={`tableContainer p-4 w-[100%]  flex flex-wrap justify-between eventTable ${darkMode==="true"?"text-[#fff] bg-[#000]":"text-[#000] bg-[#fff]"}`}>
                <div className="eventCalendar w-[68%] relative">
                    <select value={viewRef.current} onChange={handleViewChange} className={`absolute right-0 top-0 ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>
                        <option value="dayGridMonth">Month</option>
                        <option value="timeGridWeek">Week</option>
                        <option value="timeGridDay">Day</option>
                    </select>
                    {/* { viewRef.current==="dayGridMonth"&& <button onClick={handleAddEvent} className="test">Event</button>} */}
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={viewRef.current}
                        headerToolbar={{
                            start: "prev next today",
                            center: "title",
                            end: ""
                        }}
                        events={events}
                        eventClassNames={eventClassNames}
                        height={600}
                        viewClassNames={`${darkMode==="true"?"text-[#fff] testtt ":"text-[#000]"}`}

                    />
                </div>
                <div className={`eventLists w-[28%]  ${darkMode==="true"?"bg-[#000] shadow":"bg-[#f5f4f4]"}  rounded-lg`}>
                    <div className="eventList">
                        <div className="eventListTitle flex justify-between items-center border-b px-4 py-3">
                            <p className={`text-[1.2rem] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>Event Lists</p>
                            <Link href={"/event/addEvent"}>
                            <div className="flex gap-2 items-center text-[#c030f0] text-[.75rem]">
                                <Image src={commonImg.addIcon} alt="plusIcon" width={9} height={9} />
                                <span>Add Event</span>
                            </div>
                            </Link>
                        </div>
                        <div className="p-4">
                            <div className={`flex gap-2 items-center justify-between  p-2 rounded-md eventCard mb-2  ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"}`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem] Josefin">Programming</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">13 Dec 2023 | 5 PM - 9.30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                            <div className={`flex gap-2 items-center justify-between  p-2 rounded-md eventCard mb-2  ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"}`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Culturals</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">13 Dec 2023 | 5 PM - 9.30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                            <div className={`flex gap-2 items-center justify-between  p-2 rounded-md eventCard mb-2  ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"}`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Birthday</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">15 Dec 2023 | 5 PM - 9.30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                            <div className={`flex gap-2 items-center justify-between  p-2 rounded-md eventCard ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"}`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Lorem Ipsum</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">15 Dec 2023 | 5 PM - 9.30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="upcomingEvent">
                        <div className="flex justify-between items-center border-b px-4 py-3">
                            <p className={`text-[1.2rem] ${darkMode==="true"?"text-[#fff]":"text-[#000]"}`}>Upcoming Event</p>

                        </div>
                        <div className="p-4">
                            <div className={`flex gap-2 items-center justify-between ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"} p-2 rounded-md eventCard  mb-2`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Good Friday</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">29 Mar 2023 | 5.00 AM - 9.30 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                            <div className={`flex gap-2 items-center justify-between ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"} p-2 rounded-md eventCard  mb-2`} >
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Programming</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">30 Mar 2023 | 6.00 PM - 8.30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>

                            <div className={`flex gap-2 items-center justify-between  p-2 rounded-md eventCard ${darkMode==="true"?"bg-[#000] shadow":"bg-[#fff]"}`}>
                                <div className={`flex gap-3 items-center rounded-md ${darkMode==="true"?"bg-[#000] text-[#fff]":"bg-[#fff]"}`}>
                                    <Image src={event.eventGreyIcon} alt="eventGreyIcon" className={`eventGreyIcon ${darkMode==="true"?"bFilter":""}`} width={18} height={20} />
                                    <div className="">
                                        <p className="text-[.75rem] font-[500] letter-spacing-[1px] pb-[.1rem]">Ester</p>
                                        <p className="text-[.6rem] text-[#8d8c8c]">31 Mar 2023 | 12.00 AM - 12.00 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 magicBox">
                                    <Image src={commonImg.editIcon} alt="editIcon" width={13} />
                                    <Image src={commonImg.deleteIcon} alt="deleteIcon" width={13} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
