'use client'
import Image from 'next/image'
import React from 'react'
import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Baisakh',
    income: 4000,
    expense: 2400,
  },
  {
    name: 'Jestha',
    income: 3000,
    expense: 1398,
  },
  {
    name: 'Asadh',
    income: 2000,
    expense: 9800,
  },
  {
    name: 'Shrawan',
    income: 2780,
    expense: 3908,
  },
  {
    name: 'Bhadra',
    income: 1890,
    expense: 4800,
  },
  {
    name: 'Asoj',
    income: 2390,
    expense: 3800,
  },
  {
    name: 'Kartik',
    income: 3490,
    expense: 4300,
  },
    {
    name: 'Mangsir',
    income: 5000,
    expense: 3600,
  },  {
    name: 'Poush',
    income: 3390,
    expense: 7800,
  },  {
    name: 'Magh',
    income: 8390,
    expense: 6800,
  },  {
    name: 'Falgun',
    income: 1390,
    expense: 3800,
  },  {
    name: 'Chaitra',
    income: 2390,
    expense: 8800,
  },
]

function FinanceChart() {
  return (
      <div className='bg-white rounded-xl w-full h-full p-4'>
            <div className=' flex justify-between items-center'>
                <p className='w-fit bg-blue-200 rounded-md p-0.5 text-lg font-semibold'>Finance</p>
                <Image src='/moreDark.png' alt='' width={20} height={20}/>
            </div>
             <ResponsiveContainer width="100%" height="90%" className={'mt-4'}>
      <LineChart
        width={500}
        height={300}
        
        data={data}
        margin={{
          top: 5,
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
        <Line type="monotone" dataKey="income" stroke="var(--primary)"  strokeWidth={3} strokeOpacity={0.7}  />
        <Line type="monotone" dataKey="expense" stroke="var(--sublight)" strokeWidth={3} strokeOpacity={0.7} />
      </LineChart>
    </ResponsiveContainer>

    </div>
  )
}

export default FinanceChart