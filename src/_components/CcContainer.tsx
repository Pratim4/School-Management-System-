import React from 'react'
import GirlBoyChart from './GirlBoyChart'
import Image from 'next/image';
import prisma from '@/library/prisma';

async function CcContainer() {

    const data = await prisma.student.groupBy({
        by: ['sex'],
        _count: true
    });
    const boys = data.find((d) => d.sex === "MALE")?._count || 0;
    const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;
  return (


    <div className='bg-white rounded-xl w-full h-full p-4'>
            <div className=' flex justify-between items-center'>
                <p className='w-fit bg-blue-200 rounded-md p-0.5 text-lg font-semibold'>Students</p>
                <Image src='/moreDark.png' alt='' width={20} height={20}/>
            </div>
                <GirlBoyChart boys={boys} girls={girls}/>
            <div className='flex justify-center gap-16'>
            <div className=' flex flex-col gap-1'>
                <div className='w-5 h-5 bg-[var(--male)] rounded-full'> </div>
                    <p className='font-bold'>{girls}</p>
                    <h2 className='text-xs text-gray-400'>Boys [{Math.round((girls / (boys + girls)) * 100)}%]</h2>

               
            </div>
            <div className=' flex flex-col gap-1'>
                <div className='w-5 h-5 bg-[var(--female)] rounded-full'> </div>
                    <p className='font-bold'>{boys}</p>
                    <h2 className='text-xs text-gray-400'>Girls [{Math.round((boys / (boys + girls)) * 100)}%]</h2>

               
            </div>
        </div>

    </div>
  );
};

export default CcContainer;