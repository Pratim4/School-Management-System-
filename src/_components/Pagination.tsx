"use client"

import { ITEMS_PER_PAGE } from '@/library/settings'
import { useRouter } from 'next/navigation';
import React from 'react'

function Pagination({page,count}:{page:number,count:number}) {
  const router = useRouter();
  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  const changePage = (newPage:number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString())
    router.push(`${window.location.pathname}?${params.toString()}`)

  }


  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
        <button disabled={!hasPrev} onClick={() => changePage(page - 1)} className='py-2 px-4 rounded-md bg-slate-100 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>Prev</button>
        <div className='flex items-center gap-2 text-sm'>
          {Array.from({length:Math.ceil(count / ITEMS_PER_PAGE)},
          (_,index) => {
            const i = index + 1;
            return <button onClick={() => changePage(i)} key={i} className={`cursor-pointer px-2 rounded-sm ${i === page ? 'bg-[var(--primary)] text-white' : 'bg-slate-100 text-gray-500'}`}>
              {i}
            </button>
          }
        )}
        </div>
        <button className='py-2 px-4 rounded-md bg-slate-100 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ' disabled={!hasNext} onClick={() => {
          changePage(page + 1)
        }}>Next</button>

    </div>
  )
}

export default Pagination