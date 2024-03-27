'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
interface columnData{
    revenueDatas:any,
    setCourse:any
}
export default function ColumnChart({revenueDatas,setCourse}:columnData) {
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
    
   const categories = ["Jan'23", "Mar'23", "May'23", "Jul'23", "Srp'23", "Nov'23"];

    const seriesData = [{
        name: setCourse[0],
        data: [
            parseInt(revenueDatas[0]?.col1[0]),
            parseInt(revenueDatas[0]?.col1[1]),
            parseInt(revenueDatas[0]?.col1[2]),
            parseInt(revenueDatas[0]?.col1[3]),
            parseInt(revenueDatas[0]?.col1[4]),
            parseInt(revenueDatas[0]?.col1[5])
        ],
        stack: 'Revenue',
        color: '#019ff8'
    }, {
        name: setCourse[1],
        data: [
            parseInt(revenueDatas[0]?.col2[0]),
            parseInt(revenueDatas[0]?.col2[1]),
            parseInt(revenueDatas[0]?.col2[2]),
            parseInt(revenueDatas[0]?.col2[3]),
            parseInt(revenueDatas[0]?.col2[4]),
            parseInt(revenueDatas[0]?.col2[5])
        ],
        stack: 'Revenue',
        color: '#1fe0fa'
    }, {
        name: setCourse[2],
        data: [
            parseInt(revenueDatas[0]?.col3[0]),
            parseInt(revenueDatas[0]?.col3[1]),
            parseInt(revenueDatas[0]?.col3[2]),
            parseInt(revenueDatas[0]?.col3[3]),
            parseInt(revenueDatas[0]?.col3[4]),
            parseInt(revenueDatas[0]?.col3[5])
        ],
        stack: 'Revenue',
        color: '#7f1ffa'
    }, {
        name: setCourse[3],
        data: [
            parseInt(revenueDatas[0]?.col4[0]),
            parseInt(revenueDatas[0]?.col4[1]),
            parseInt(revenueDatas[0]?.col4[2]),
            parseInt(revenueDatas[0]?.col4[3]),
            parseInt(revenueDatas[0]?.col4[4]),
            parseInt(revenueDatas[0]?.col4[5])
        ],
        stack: 'Revenue',
        color: '#faa21f'
    }];
    
    const options = {
        chart: {
            type: 'column',
            backgroundColor: `${darkMode == "true" ? "#000" : "#ffffff"}`,
        },
        title: false,
        xAxis: {
            categories: categories,
            lineColor: '#9b9b9b',
          labels: {
            style: {
              fontSize: '11px', // Adjust font size as needed
              lineHeight: '12px', // Adjust line height as needed
              color:'#9f9f9f',
            }
          },
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: false,
            lineColor: '#fdf6ff',
            labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
                    return '₹' + (Number(this.value) / 1000) + 'k';
                },
                style: {
                    fontSize: '11px', // Adjust font size as needed
                    lineHeight: '12px', // Adjust line height as needed
                    marginBottom: 25,
                    color:'#9f9f9f',
                  }
            }
        },
        tooltip: {
            formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
                return '<b>Revenue - ₹' + (Number(this.y) / 1000) + 'k</b>';
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: seriesData
    };

    useEffect(()=>{
        options
    },[darkMode])

    return (
        <div className='columnChart mt-4'>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
        </div>
    );

}