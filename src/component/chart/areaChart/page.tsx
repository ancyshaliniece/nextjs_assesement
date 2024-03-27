
'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

interface chartValue {
  year: any;
  courses: any;
}

const AreaChart = ({ year, courses }: chartValue) => {
  const datas = useSelector((state: any) => state.studentEnrollmentStore);
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
    const data = [datas[year]];
    if (data !== undefined) {
      const test = data?.map((item: any) => item.details.map((detail: any) => detail.month)
      )
      const options = {
        chart: {
          type: 'area',
          height: 235,
          backgroundColor: `${darkMode == "true" ? "#000" : "#ffffff"}`,
        },
        marginBottom: 25,

        title: {
          text: ''
        },
        xAxis: {
          categories: test[0],
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
          title: {
            text: ''
          },
          lineColor: '#fdf6ff',

          labels: {
            style: {
              fontSize: '11px', // Adjust font size as needed
              lineHeight: '12px', // Adjust line height as needed
              marginBottom: 25,
              color:'#9f9f9f',
            }
          },
        },
        tooltip: {
          backgroundColor: '#c030f0', // Tooltip background color
          borderColor: '#c030f0', // Tooltip border color
          borderRadius: 5, // Tooltip border radius
          borderWidth: 1, // Tooltip border width
          padding: 5, // Tooltip padding
          style: {
            color: '#fff', // Tooltip text color
            fontSize: '12px', // Tooltip font size
          },
          headerFormat: '',
          pointFormat: '<b>No of Students - {point.y}</b>'
        },
        plotOptions: {
          area: {
            marker: {
              enabled: true,
              lineColor: '#a31aff',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#a31aff'
              }
            },
            stacking: undefined, // Disable stacking
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null,
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, '#a31aff'], // Use your specific color here
                [1, Highcharts.color('#f2eafe').setOpacity(0).get('rgba')],
                // // @ts-ignore
                // [0, Highcharts.getOptions().colors[0]],
                // // @ts-ignore
                // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
              ]
            },
          },

          series: {
            marker: {

              "symbol": "circle",
              "radius": 3,
              "lineColor": "white",
              fillColor: '#fff',
              "states": {
                "hover": {
                  "fillColor": '#fff',
                  "radius": 5
                }
              }
            },
            "compare": "percent",
            "compareBase": 0
          }
        },

        series: data?.map((item: any) => ({
          name: item.year.toString(), // Convert year to string
          data: item.details.map((detail: any) => parseInt(detail.numOfStudent)),
          color: "#c030f0",
        }))
      };
      console.log('Dark mode:', darkMode);
console.log('Chart options:', options);
      // @ts-ignore
      Highcharts.chart('chart-container', options);


    }

  }, [year,darkMode]);


  return (
    <>
      <div id="chart-container" />
    </>
  );
};

export default AreaChart;