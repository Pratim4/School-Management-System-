'use client'
import Image from 'next/image';
import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';


function GirlBoyChart({boys, girls}: {boys:number; girls:number}) {
  const data = [
        {
      name: 'Total',
      count: boys+girls,
      fill: '#fff'
  
    },
    {
      name: 'Girls',
      count: girls,
   
      fill: 'var(--female)',
    },
    {
      name: 'Boys',
      count: boys,
   
      fill: 'var(--male)',
    },
  
  
  ];
  return (
    <div className='relative w-full h-[75%]'>
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
  )
}

export default GirlBoyChart