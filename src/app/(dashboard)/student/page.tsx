import Announcement from '@/_components/Announcement'
import MyCalendar from '@/_components/Calendar'
import ScheduleCalendar from '@/_components/Schedule'
import React from 'react'

function StudentPage() {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>

      <div className='w-full xl:w-2/3'>
      <div className='h-full bg-white p-4 rounded-md'>
        <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
        <ScheduleCalendar/>
      </div>
      </div>
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
<MyCalendar/>
<Announcement/>
</div>
    </div>
  )
}

export default StudentPage