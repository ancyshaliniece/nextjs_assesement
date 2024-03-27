"use client"
import { event } from "@/images";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./swiper.module.css";

export default function SwiperCarousal() {
  const eventList = useSelector((state: any) => state.eventList);

  return (
    <div className="w-[265px]">
    <Swiper
      spaceBetween={30}
      slidesPerView={2}
      navigation
      pagination={{ type:"bullets",clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 500, 
      }}
      speed={1000}
      loop={true}
      
      // onSwiper={(swiper) => console.log(swiper)} // Log swiper instance for debugging
      // onSlideChange={() => console.log("slide change")} // Log slide changes for debugging
    >
      {eventList.map((slide: any, index: any) => (
        <SwiperSlide key={index}>
          <div className={`flex gap-1 items-center ${style.slideContainer}`}>
            <div>
              <Image src={event.eventGreyIcon} alt={`Slide ${index}`} className={`m-1 ${style.slideImage}`}/>
            </div>
            <div className="slideInfo">
              <p className="text-[.75rem] font-[500]">{slide.event}</p>
              <p className="text-[.65rem]">{slide.time}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

}