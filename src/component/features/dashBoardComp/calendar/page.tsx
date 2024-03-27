"use client"
import { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import Image from 'next/image';
import { commonImg } from '@/images';

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([
    // {
    //   title: 'Event 1',
    //   start: new Date(2024, 2, 1), // March 1, 2024
    //   end: new Date(2024, 2, 2),   // March 2, 2024
    // },
    {
      title: 'Event 2',
      start: new Date(2024, 2, 5), // March 5, 2024
      end: new Date(2024, 2, 6),   // March 6, 2024
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNext = () => {
    setCurrentDate(moment(currentDate).add(1, 'months').toDate());
  };

  const handlePrev = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'months').toDate());
  };

  const minDate = moment(currentDate).startOf('month').toDate();
  const maxDate = moment(currentDate).endOf('month').toDate();

  return (
    <div style={{ height: 200 }} className="dashBoardCalendar relative">
        <button onClick={handlePrev}><Image src={commonImg.textFieldDropDown} alt='textFieldDropDown' className='prevBtn'/></button>
        <button onClick={handleNext}><Image src={commonImg.textFieldDropDown} alt='textFieldDropDown' className='nextBtn'/></button>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        min={minDate}
        max={maxDate}
      />
    </div>
  );
}
