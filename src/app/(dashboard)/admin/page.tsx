import AcContainer from '@/_components/AcContainer'
import Announcement from '@/_components/Announcement'
import CalendarContainer from '@/_components/CalendarContainer'
import CcContainer from '@/_components/CcContainer'
import FinanceChart from '@/_components/FinanceChart'
import UserCard from '@/_components/UserCard'
import React from 'react'

function AdminPage({searchParams}: {searchParams: {[keys:string]:string | undefined}}) {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
<div className='w-full lg:w-2/3 flex flex-col gap-8'>
<div className='flex gap-4 justify-between flex-wrap'>
  <UserCard type='admin'/>
  <UserCard type='student'/>
  <UserCard type='teacher'/>
</div>
<div className='flex gap-4 flex-col lg:flex-row'>
  <div className='w-full lg:w-1/3 h-[450px]'>
<CcContainer/>

  </div>
  <div  className='w-full lg:w-2/3 h-[450px]'>
    <AcContainer/>
  </div>

</div>
<div className='w-full h-[500px]'>
  <FinanceChart/>
</div>

</div>
<div className='w-full lg:w-1/3 flex flex-col gap-8'>
<CalendarContainer searchParams={searchParams} />
<Announcement/>
</div>
    </div>
  )
}

export default AdminPage