import prisma from '@/library/prisma';
import React from 'react'
import ScheduleCalendar from './Schedule';

async function ScalendarContainer() {
    const dataRes = await prisma.lesson.findMany();
    const data = dataRes.map((item) => ({
      title:item.name,
      start: item.startTime,
      end: item.endTime
    }))
    console.log("lesson data", dataRes)
  return <div className='' ><ScheduleCalendar data={data}/> </div>
  
}

export default ScalendarContainer