import React from 'react'
import AttendanceChart from './AttendanceChart'
import Image from 'next/image'
import prisma from '@/library/prisma';

async function AcContainer() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday,
            },
        },
        select: {
            date: true,
            present: true,
        }
    });
const daysOfWeek =["Mon","Tue","Wed","Thu","Fri"];
const attendanceMap: {[key: string]: {present: number, absent: number}} = {
    Mon:{present: 0, absent: 0},
    Tue:{present: 0, absent: 0},
    Wed:{present: 0, absent: 0},
    Thu:{present: 0, absent: 0},
    Fri:{present: 0, absent: 0},
}

resData.forEach((item) => {
    const itemDate = new Date(item.date);
    if(dayOfWeek >=1 && dayOfWeek <= 5) {
        const dayName = daysOfWeek[dayOfWeek - 1];
    if(item.present) {
        attendanceMap[dayName].present += 1;
    } else {
        attendanceMap[dayName].absent += 1; 
    }
}});
 const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
 }));
  return (
       <div className="w-full h-full bg-white rounded-lg p-4 ">
          <div className=" flex justify-between items-center">
            <p className="w-fit bg-blue-200 rounded-md p-0.5 text-lg font-semibold">
              Attendance
            </p>
            <Image src="/moreDark.png" alt="" width={20} height={20} />
          </div>
          <AttendanceChart data={data}/>
        </div>

  )
}

export default AcContainer