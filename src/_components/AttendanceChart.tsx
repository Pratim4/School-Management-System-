"use client"
import Image from 'next/image';
import React from 'react'
import { cursorTo } from 'readline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 950,
    absent: 50,
  },
  {
    name: 'Tue',
    present: 900,
    absent: 100,
  },
  {
    name: 'Wed',
    present: 990,
    absent: 10,

  },
  {
    name: 'Thurs',
    present: 500,
    absent: 500,
  },
  {
    name: 'Fri',
    present: 750,
    absent: 250,
  },

];

function AttendanceChart() {
  return (
    <div className='w-full h-full bg-white rounded-lg p-4 '>
        <div className=' flex justify-between items-center'>
                        <p className='w-fit bg-blue-200 rounded-md p-0.5 text-lg font-semibold'>Attendance</p>
                        <Image src='/moreDark.png' alt='' width={20} height={20}/>
                    </div>
        <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        barCategoryGap={'15%'}
        barGap={0}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" stackId="a" fill="var(--primary)" legendType='circle'  />
        <Bar dataKey="absent" stackId="a" fill="var(--light)" legendType='circle'  radius={[6,6,0,0]}/>
      </BarChart>
    </ResponsiveContainer>
     
    </div>
  )
}

export default AttendanceChart