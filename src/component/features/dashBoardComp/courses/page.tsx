'use client';
import Select from '@/component/select/page';
import style from './courses.module.css';
import DonutChart from '@/component/chart/donutChart/page';
import { useState } from 'react';

const course=[
    {
        value:'Artificial Intelligence'
    },
    {
        value:'Machine Learning'
    },
    {
        value:'Public Relations'
    },
    {
        value:'UI/UX Design'
    },
    {
        value:'Web Design'
    }
];

export default function Courses(){

const [progress, setProgress] = useState(75);
    const setValue=(data:any)=>{
        if(data==="Artificial Intelligence"){
            setProgress(75);
        }else if(data==="Machine Learning"){
            setProgress(50);
        }else if(data==="Public Relations"){
            setProgress(80);
        }else if(data==="UI/UX Design"){
            setProgress(40);
        }else if(data==="Web Design"){
            setProgress(60);
        }

    }

    return(
          <div className={style.enrollment}>
            <div className="flex justify-between items-center border-b-[1px]  pb-4">
                <h1 className='text-[1.1rem] font-[500]'>Courses</h1>
                <div className="selection flex gap-2">
                    <Select options={course} width={190} setValue={setValue}/>
                </div>
            </div>
            <div className="chart">
                <DonutChart progress={progress} />
            </div>
        </div>
    )
}