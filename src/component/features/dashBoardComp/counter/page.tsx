"use client";

import { dashboard } from "@/images"
import style from "./counter.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
const counter = [
    {
        count: 250,
        name: "Total Student",
        imag: dashboard.totalStudnets,
        className:'student'
    },
    {
        count: 40,
        name: "Total Courses",
        imag: dashboard.totalCourse,
        className:'courses'
    },
    {
        count: 15,
        name: "Categories",
        imag: dashboard.categories,
        className:'categories'
    },
    {
        count: 100,
        name: "Faculty",
        imag: dashboard.faculty,
        className:'faculty'
    },
]

   

export default function Counter(){
    const [counts, setCounts] = useState(Array(counter.length).fill(0));
    useEffect(() => {
        const intervals = counter.map((counter, index) => {
            return setInterval(() => {
              if (counts[index] < counter.count) {
                setCounts(prevCounts => {
                  const newCounts = [...prevCounts];
                  newCounts[index] = prevCounts[index] + Math.ceil((counter.count - prevCounts[index]) / 10);
                  return newCounts;
                });
              } else {
                clearInterval(intervals[index]); // Stop the interval when counter reaches the target number
              }
            }, 30); // Adjust the interval duration as needed
          });
      
          return () => {
            intervals.forEach(interval => clearInterval(interval)); // Cleanup the intervals on component unmount
          };
      }, []);
    
    

   

    return(
        <>
        {counter.map((item, index) => (
                            <div className={`count flex justify-between items-center w-[24%] p-4 rounded-lg ${item.className}`} key={index}>
                                <div className="contInfo">
                                   
                                    <h1 className="text-[2rem] font-[600]">{counts[index]}</h1>
                                    <p className="text-[.8rem] mt-[-.3rem]">{item.name}</p>
                                </div>
                                <div className={style.countImage}>
                                    <Image src={item.imag} alt={item.name} />
                                </div>
                            </div>
                        ))}
        </>
    )
}
