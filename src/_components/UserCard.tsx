import Image from 'next/image'
import React from 'react'

function UserCard({type}:{type:string}) {
  return (
    <div className='rounded-2xl odd:bg-[var(--primary)] even:bg-[var(--secondary)] p-4 flex-1 min-w-[130px]'>
        <div className='flex justify-between items-center'>
            <span className='text-[10px] bg-white px-2 py-1 rounded-lg text-red-700'>
                2025/26
            </span>
            <Image src='/more.png' alt='' width={20} height={20}/>

        </div>
        <p className='text-2xl font-semibold my-4'>
            1,234
        </p>
        <p className=' w-fit px-2 py-1 rounded-lg capitalize text-sm font-medium text-gray-700'>
            {type}
        </p>

    </div>
  )
}

export default UserCard