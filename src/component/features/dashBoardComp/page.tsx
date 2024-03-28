'use client';
import { Button } from "@/component/button/page";
import EntrollStatistic from "./enrollmentStatistic/page";
import { dashboard } from "@/images";
import Image from "next/image";
import style from "./dashBoard.module.css";
import Courses from "./courses/page";
import Revenue from "./revenue/page";
import Event from "./event/page";
import RecentStudent from "./recentStudents/page";
import Counter from "./counter/page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";





export default function DashBoards() {
    const [showWidget, setShowWidget] = useState(false);
    const [checkBox, setcheckBox] = useState({
        selectAll: true,
        statistics: true,
        event: true,
        courses: true,
        revenue: true,
        recent: true
    });
    const [darkMode, setdarkMode] = useState<string | null>(null);
    const mode = useSelector((store: any) => store.modeStore);


    // useEffect(() => {
    //     // debugger
    //     const modes=mode[0].mode;
    //     setdarkMode(modes);
    // }, [mode])
    useEffect(() => {
        const mode = localStorage.getItem('DarkMode');
        setdarkMode(mode);
    }, [mode])

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setcheckBox(pre => ({ ...pre, [name]: checked }))
    }

    const clearAll = () => {
        setcheckBox((prev) => ({
            ...prev,
            selectAll: false,
            statistics: false,
            event: false,
            courses: false,
            revenue: false,
            recent: false
        }))
        setShowWidget(false);
    }
    const handleBtnValue = () => {
        setShowWidget(!showWidget);
    }
    const handleSelectAll = () => {
        setcheckBox((prev) => ({
            ...prev,
            selectAll: true,
            statistics: true,
            event: true,
            courses: true,
            revenue: true,
            recent: true
        }))
    }


    return (
        <div className={`dash mainContainer w-[100%] ${darkMode == "true" ? "bg-[#000]" : "bg-[#f9f9f9]"}`}>

            <div className="topHead flex justify-between items-center mb-4">
                <h1 className={`text-[1.8rem] ${darkMode == "true" ? "text-[#ffffff]" : "text-[#000000]"}`}>Welcome Back !</h1>
                <div className={style.withWidget}>
                    <Button buttonType="button" text="+ Add or Remove Widget" icon={true} handleBtn={handleBtnValue} />
                    {showWidget && <div className={`${style.widgetPopUp} flex justify-between`}>
                        <div className="widgetInfo w-[100%]">
                            <div className="flex justify-between items-center m-2">
                                {/* <input type="checkbox" className="mr-2" name="selectAll" id="selectAll"  /> */}
                                <div className="w_feild flex items-center cursor-pointer">
                                    <label className="lableContainer cursor-pointer" htmlFor="selectAll">Select All
                                        <input type="checkbox" name="selectAll" id="selectAll" onChange={handleSelectAll} />
                                        <span className="checkmark"></span></label>
                                </div>
                                <div className={style.clear} onClick={clearAll}>
                                    <p>Clear all</p>
                                </div>

                            </div>
                            <div className="w_feild flex items-center m-2 cursor-pointer">
                                <label className="lableContainer cursor-pointer w-[200px]" htmlFor="statistics">Students Enrollment Statistics
                                    <input type="checkbox" name="statistics" id="statistics" checked={checkBox.statistics} onChange={handleCheckboxChange} />
                                    <span className="checkmark"></span></label>
                            </div>
                            <div className="w_feild flex items-center m-2 cursor-pointer">
                                <label className="lableContainer cursor-pointer" htmlFor="event">Events
                                    <input type="checkbox" name="event" id="event" checked={checkBox.event} onChange={handleCheckboxChange} />
                                    <span className="checkmark"></span></label>
                            </div>
                            <div className="w_feild flex items-center m-2 cursor-pointer">
                                <label className="lableContainer cursor-pointer" htmlFor="courses">Courses
                                    <input type="checkbox" name="courses" id="courses" checked={checkBox.courses} onChange={handleCheckboxChange} />
                                    <span className="checkmark"></span></label>
                            </div>
                            <div className="w_feild flex items-center m-2 cursor-pointer">
                                <label className="lableContainer cursor-pointer" htmlFor="revenue">Revenue
                                    <input type="checkbox" name="revenue" id="revenue" checked={checkBox.revenue} onChange={handleCheckboxChange} />
                                    <span className="checkmark"></span></label>
                            </div>
                            <div className="w_feild flex items-center m-2 cursor-pointer">
                                <label className="lableContainer cursor-pointer" htmlFor="recent">Recent Students
                                    <input type="checkbox" name="recent" id="recent" checked={checkBox.recent} onChange={handleCheckboxChange} />
                                    <span className="checkmark"></span></label>
                            </div>
                        </div>

                    </div>}
                </div>
            </div>

            <div className="dashBoardConatainer chartEvent pb-4 flex justify-center gap-4">

                <div className="charts w-[79%]">
                    <div className={`flex justify-between mb-[1.5rem] ${style.counter}`}>
                        <Counter />
                    </div>
                    <div className="chart">
                        {checkBox.statistics && <div className={`w-[100%] pt-3 pl-4 pr-4 h-[270px] ${style.chartContainer} ${darkMode == "true" ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"}`}>
                            <EntrollStatistic />
                        </div>}
                        <div className="coursesAndRevenue flex justify-between items-center mt-4">
                            {checkBox.courses && <div className={`courseChartDash w-[30%] h-[300px] p-5 ${style.chartContainer} ${darkMode == "true" ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"}`}>
                                <Courses />
                            </div>}
                            {checkBox.revenue && <div className={`revenueChartDash w-[68%] h-[302px] p-5 ${style.chartContainer} ${darkMode == "true" ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"}`}>
                                <Revenue />
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="events w-[21%]">
                    {checkBox.event && <div className={`${style.chartContainer} chartEventCal  ${darkMode == "true" ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"} h-[45vh] mb-4 p-4`}>
                        <Event />
                    </div>}
                    {checkBox.recent && <div className={`${style.chartContainer} dashBoardRecentStudent ${darkMode == "true" ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"} h-[46vh]`}>
                        <RecentStudent />
                    </div>}
                </div>

            </div>

        </div>
    )
}