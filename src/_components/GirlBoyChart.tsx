'use client'
import Image from 'next/image';
import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
      {
    name: 'Total',
    count: 1000,
    fill: '#fff'

  },
  {
    name: 'Girls',
    count: 590,
 
    fill: 'var(--female)',
  },
  {
    name: 'Boys',
    count: 410,
 
    fill: 'var(--male)',
  },


];

function GirlBoyChart() {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        <div className=' flex justify-between items-center'>
            <p className='w-fit bg-blue-200 rounded-md p-0.5 text-lg font-semibold'>Students</p>
            <Image src='/moreDark.png' alt='' width={20} height={20}/>
        </div>
        <div className='h-[75%] w-full relative'>
              <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
         
            // label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src='/maleFemale.png' alt='' height={60} width={60} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'  />
        </div>
        <div className='flex justify-center gap-16'>
            <div className=' flex flex-col gap-1'>
                <div className='w-5 h-5 bg-[var(--male)] rounded-full'> </div>
                    <p className='font-bold'>1,234</p>
                    <h2 className='text-xs text-gray-400'>Boys [41%]</h2>

               
            </div>
            <div className=' flex flex-col gap-1'>
                <div className='w-5 h-5 bg-[var(--female)] rounded-full'> </div>
                    <p className='font-bold'>1,234</p>
                    <h2 className='text-xs text-gray-400'>Girls [59%]</h2>

               
            </div>
        </div>

    </div>
  )
}

export default GirlBoyChart