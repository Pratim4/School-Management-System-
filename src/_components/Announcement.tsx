import React from 'react'

function Announcement() {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>
                Announcement
            </h1>
            <span className='font-medium'> View All</span>

        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-[var(--secondary)] rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'> Lorem ipsum dolor sit amet consectetur.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-10</span>

                </div>
            
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt.</p>
                
            </div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-[#f57c6c55] rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'> Lorem ipsum dolor sit amet consectetur.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-10</span>

                </div>
            
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt.</p>
                
            </div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-[var(--secondary)] rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'> Lorem ipsum dolor sit amet consectetur.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-10</span>

                </div>
            
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, incidunt.</p>
                
            </div>
        </div>
    </div>
  )
}

export default Announcement