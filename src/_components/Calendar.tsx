"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00:00",
    description: "Discuss project progress and next steps."
  },
  {
    id: 2,
    title: "Client Presentation",
    time: "14:30:00",
    description: "Present the new app prototype to the client."
  },
  {
    id: 3,
    title: "Code Review",
    time: "09:00:00",
    description: "Review pull requests and discuss improvements."
  },
  {
    id: 4,
    title: "Design Workshop",
    time: "13:00:00",
    description: "Collaborate with designers on UI/UX enhancements."
  },
  {
    id: 5,
    title: "Sprint Planning",
    time: "11:00:00",
    description: "Plan tasks and goals for the upcoming sprint."
  }
];


const MyCalendar = () => {
     const [value, onChange] = useState<Value>(new Date());
  return (
     <div className='bg-white p-4 rounded-md'>
      <Calendar onChange={onChange} value={value}  />
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold my-4'>Events</h1>
        <Image src='/moreDark.png' alt='' width={20} height={20}/>
      </div>
      <div className='flex flex-col gap-4'>
       { events.map(e=>(
        <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[var(--primary)] even:border-t-[var(--light)]' key={e.id}>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-gray-600'>{e.title}</h1>
            <span className='text-gray-300 text-xs'>{e.time}</span>
           
            
          </div>
           <p className='mt-2 text-gray-400 text-sm'>{e.description}</p>
        </div>
       ))
    
       }
      </div>
    </div>
  )
}

export default MyCalendar