import React from 'react'

function Pagination() {
  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
        <button disabled className='py-2 px-4 rounded-md bg-slate-100 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>Prev</button>
        <div className='flex items-center gap-2 text-sm'>
            <button className='cursor-pointer px-2 rounded-sm bg-[var(--primary)] text-white  '>1</button>
            <button className='cursor-pointer px-2 rounded-sm bg-[var(--primary)] text-white  '>2</button>
            <button className='px-2 rounded-sm bg-[var(--primary)] text-white  cursor-pointer'>3</button>
            ...
            <button className='px-2 rounded-sm bg-[var(--primary)] text-white  cursor-pointer'>10</button>


        </div>
        <button className='py-2 px-4 rounded-md bg-slate-100 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>Next</button>

    </div>
  )
}

export default Pagination