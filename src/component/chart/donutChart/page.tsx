
'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { styled } from '@mui/material';
import style from './donutChart.module.css';
import { useSelector } from 'react-redux';


interface Progress{
    progress:any;
}


export default function DonutChart({progress}:Progress) {
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

    const options = {
        chart: {
            type: 'pie',
            marginTop: 5,
            height: 180,
            backgroundColor: `${darkMode == "true" ? "#000" : "#ffffff"}`,
        },
        title: false,
        plotOptions: {
            pie: {
                innerSize: '60%', // Set inner size to create a donut chart
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.percentage:.0f}%</b>', // Show data labels for progress percentage only
                    distance: -64, // Move the labels closer to the center
                    style: {
                        fontWeight: 'bold',
                        color: '#2732ff',
                        textOutline: 'none',
                        textAlign: 'center',
                        fontSize: '16px'
                    }
                }
            }
        },
        series: [{
            name: 'Progress',
            data: [{
                name: 'Progress',
                y: progress,
                color: '#2732ff' // You can use any color for the progress
            }, {
                name: 'Remaining',
                y: 100 - progress, // Calculate remaining percentage
                color:'#e8ffeb',
                dataLabels: {
                    enabled: false // Disable data labels for remaining percentage
                }
            }]
        }],
        credits: {
            enabled: false
        }
    };
    // useEffect(()=>{
    //     options
    // },[darkMode])
      return (
        <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className={style.indicationField}>
            <div className={style.indication}>
                <span className={style.occup} >Occupied</span>
            </div>
            <div className={style.indication}>
                <span className={style.vacc}>Vaccant</span>
            </div>
        </div>
        </div>
      );
}