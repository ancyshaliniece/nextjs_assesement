import {Button } from "@/component/button/page";
import SwiperCarousal from "@/component/swiper/page";
import Calendar from "../calendar/page";
import Link from "next/link";

export default function Event() {
    return (
        <div >
            <div className="flex justify-between items-center border-b-[1px]  pb-2">
                <h1 className='text-[1.1rem] font-[500]'>Events</h1>
                <div className="selection flex gap-2">
                    {/* <Link href="/event/addEvent"> */}
                        <span className="text-[.83rem] purple font-[500] cursor-pointer">+ Add Event</span>
                        {/* </Link> */}
                    {/* <Button buttonType="button" icon={false} text="+ Add Event"/> */}
                </div>
            </div>
            <div className="calander  h-[230px]">
                <Calendar/>
            </div>
            <div className="slider">
                <SwiperCarousal/>
            </div>
        </div>
    )
}