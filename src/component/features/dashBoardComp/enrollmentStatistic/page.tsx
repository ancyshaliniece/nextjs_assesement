'use client';
import Select from '@/component/select/page';
import style from './enrollment.module.css';
import AreaChart from '@/component/chart/areaChart/page';
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
const years=[
    {
        value:'This Year'
    },
    {
        value:'last Year'
    },
    {
        value:'2022'
    },
    {
        value:'2021'
    },
]

export default function EntrollStatistic(){
    const [year, setYear] = useState(0);
    const [courses, setCourses] = useState('Artificial Intelligence');


    const setValue=(data:any)=>{
       
        if(data==="This Year"){
            setYear(0);
        }else if(data==="last Year"){
            setYear(1);
        }else if(data==="2022"){
            setYear(2);
        }else if(data==="2021"){
            setYear(3);
        }else if(data==="Artificial Intelligence"){
            setYear(3);
        }else if(data==="Machine Learning"){
            setYear(0);
        }else if(data==="Public Relations"){
            setYear(2);
        }else if(data==="UI/UX Design"){
            setYear(1);
        }else if(data==="Web Design"){
            setYear(3);
        }
    
    }
    return(
        <div className={style.enrollment}>
            <div className="flex justify-between items-center">
                <h1 className='text-[1.1rem] font-[500] w-[60%] border-b-[1px] pb-2 mb-5'>Student Entrollment Statistics</h1>
                <div className="selection flex gap-2 mt-[-1.5rem]">
                    <Select options={course} width={190} setValue={setValue}/>
                    <Select options={years} width={140} setValue={setValue}/>
                </div>
            </div>
            <div className="chart">
                <AreaChart year={year} courses={courses}/>
            </div>
        </div>
    )
}