'use client'
import Select from '@/component/select/page';
import style from './revenue.module.css';
import ColumnChart from '@/component/chart/columnChart/page';
import { useEffect, useState } from 'react';

const course = [
    {
        value: 'Artificial Intelligence +4'
    },
    {
        value: 'Machine Learning +4'
    }
];
const year = [
    {
        value: 'This Year'
    },
    {
        value: 'last Year'
    },
    {
        value: '2022'
    },
    {
        value: '2021'
    },
]
const revenueData = [
    {
        year: 'This Year',
        details: [
            {
                col1: ['1000', '2000', '3000', '4000', '2500', '800'],
                col2: ['2000', '5000', '8000', '6000', '3000', '5000'],
                col3: ['8500', '7500', '9800', '7000', '5000', '3000'],
                col4: ['2000', '4000', '3000', '8000', '6000', '7000'],
                name: 'DevOps',
                stack: 'Revenue',
                color: '#019ff8'
            }
        ]
    },
    {
        year: 'last Year',
        details: [
            {
                col1: ['5000', '1000', '5000', '3000', '2000', '180'],
                col2: ['8000', '2000', '4000', '9000', '2000', '7000'],
                col3: ['1000', '1350', '9800', '3000', '1200', '2300'],
                col4: ['2000', '2300', '1300', '1800', '7000', '2000'],
                name: 'Social Media Marketing',
                stack: 'Revenue',
                color: '#1fe0fa'
            }
        ]
    },
    {
        year: '2022',
        details: [
            {
                col1: ['1000', '8000', '5000', '9000', '1500', '7000'],
                col2: ['4000', '5000', '9000', '1200', '1500', '5000'],
                col3: ['7500', '5005', '4500', '8700', '2300', '5006'],
                col4: ['1340', '1500', '6700', '6500', '3400', '6700'],
                name: 'Artificial Intelligence',
                stack: 'Revenue',
                color: '#7f1ffa'
            }
        ]
    },
    {
        year: '2021',
        details: [
            {
                col1: ['1000', '2000', '3000', '4000', '2500', '800'],
                col2: ['2000', '5000', '8000', '6000', '3000', '5000'],
                col3: ['8500', '7500', '9800', '7000', '5000', '3000'],
                col4: ['2000', '4000', '3000', '8000', '6000', '7000'],
                name: 'Web Design',
                stack: 'Revenue',
                color: '#faa21f'
            }
        ]
    }
]
const machineRevenueData = [
    {
        year: 'This Year',
        details: [
            {
                col1: ['1000', '8000', '5000', '9000', '1500', '7000'],
                col2: ['4000', '5000', '9000', '1200', '1500', '5000'],
                col3: ['7500', '5005', '4500', '8700', '2300', '5006'],
                col4: ['1340', '1500', '6700', '6500', '3400', '6700'],
                name: 'Artificial Intelligence',
                stack: 'Revenue',
                color: '#7f1ffa'
            }
        ]
       
    },
    {
        year: 'last Year',
        details: [
            {
                col1: ['1000', '2000', '3000', '4000', '2500', '800'],
                col2: ['2000', '5000', '8000', '6000', '3000', '5000'],
                col3: ['8500', '7500', '9800', '7000', '5000', '3000'],
                col4: ['2000', '4000', '3000', '8000', '6000', '7000'],
                name: 'Web Design',
                stack: 'Revenue',
                color: '#faa21f'
            }
        ]
    },
    {
        year: '2022',
        details: [
            {
                col1: ['5000', '1000', '5000', '3000', '2000', '180'],
                col2: ['8000', '2000', '4000', '9000', '2000', '7000'],
                col3: ['1000', '1350', '9800', '3000', '1200', '2300'],
                col4: ['2000', '2300', '1300', '1800', '7000', '2000'],
                name: 'Social Media Marketing',
                stack: 'Revenue',
                color: '#1fe0fa'
            }
        ]
    },
    {
        year: '2021',
        details: [
            {
                col1: ['1000', '2000', '3000', '4000', '2500', '800'],
                col2: ['2000', '5000', '8000', '6000', '3000', '5000'],
                col3: ['8500', '7500', '9800', '7000', '5000', '3000'],
                col4: ['2000', '4000', '3000', '8000', '6000', '7000'],
                name: 'DevOps',
                stack: 'Revenue',
                color: '#019ff8'
            }
        ]
    }
]




export default function Revenue() {
    const [revenueDatas, setrevenueDatas] = useState(revenueData[0].details);
    const [courses, setcourses] = useState("Artificial Intelligence +4");
    const [setCourse, setsetCourse] = useState<string | string[]>("Artificial Intelligence +4");
    useEffect(() => {
        if(courses==='Artificial Intelligence +4'){
            setsetCourse(['Artificial Intelligence','DevOps','Social Media Marketing','Web Design']);
        }else if(courses==='Machine Learning +4'){
            setsetCourse(['Machine Learning','Public Relations','UI/UX Design','Mogion Graphics Design']);
        }
     
    }, [courses])
    
    const setValue = (item: any) => {
        if(item==='Artificial Intelligence +4'){
            // const test=revenueData.filter((i)=>i.year.includes(item));
            setcourses(item);
            if(revenueData.length>0){
                setrevenueDatas(revenueData[0]?.details);
            }
        }
        
        else if(item==='Machine Learning +4'){
            // debugger
            // const test=machineRevenueData.filter((i)=>i.year.includes(item));
            setcourses(item);
            if(machineRevenueData.length>0){
                setrevenueDatas(machineRevenueData[0]?.details);
            }
        }else{
            const test=machineRevenueData.filter((i)=>i.year.includes(item));
            setcourses(item);
            if(test.length>0){
                setrevenueDatas(test[0]?.details);
            }
        }
       
    }

    return (
        <div className={style.enrollment}>
            <div className="flex justify-between items-center  pb-4 border-b-[1px]">
                <h1 className='text-[1.1rem] font-[500] w-[60%] '>Revenue</h1>
                <div className="selection flex gap-2">
                    <Select options={course} width={205} setValue={setValue} />
                    <Select options={year} width={140} setValue={setValue} />
                </div>
            </div>
            <div className="chart">
                <ColumnChart revenueDatas={revenueDatas.length>0 && revenueDatas} setCourse={setCourse}/>
            </div>
        </div>
    )
}