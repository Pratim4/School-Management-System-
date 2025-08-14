"use client"

import Image from 'next/image';
import React, { JSX, useState } from 'react'
import TeacherForm from './forms/TeacherForm';
import StudentForm from './forms/StudentForm';


const forms:{
    [key:string] : (type:"create" | "update" , data?: any) =>JSX.Element;
}={
    teacher:(type, data) => <TeacherForm type={type} data={data}/>,
    student:(type, data) => <StudentForm type= {type} data={data} />
}

function FormModal({table, type, data, id,}:{
    table: "teacher" | "student" | "parent" | "subject" | "class" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?:number;
}) {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-[#b9d30d]" : "";

    const [open, setOpen] = useState(false);

    const FormAction = () =>{
        return type === "delete" && id? (
            <form action=""  className='p-4 flex flex-col gap-4'>
                <span className='text-center font-medium'>This data will be deleted permanently, Are you sure you want to delete this {table}?</span>
                <button className='bg-red-700 w-fit text-white py-2 px-4 rounded-md border-none self-center'>Delete</button>
                 </form>
        ):type === "create" || type === "update" ? (
            forms[table] (type, data) 
         ) : ("Form not found!"
        );
        
    }

  return (
    <>
    <button onClick={()=>setOpen(true)} className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
        <Image src={`/${type}.png`} alt='' width={16} height={16}/>
    </button>
    {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black/60 z-50 flex items-center justify-center'>  
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]'>
            <FormAction/>
               <div onClick={()=>setOpen(false)} className=' absolute top-4 right-4 cursor-pointer'>
            <Image src='/close.png' alt='' width={14} height={14}/>
        </div>
        </div>
        
        </div>
    )}
    </>
  )
}

export default FormModal