"use client"

import Image from 'next/image';
import React, { JSX, useActionState, useEffect, useState } from 'react'
import TeacherForm from './forms/TeacherForm';
import StudentForm from './forms/StudentForm';
import SubjectForm from './forms/SubjectForm';
import { deleteSubject } from '@/library/serverAction';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { formContainerProps } from './FormContainer';


const deleteActionMap ={
    subject: deleteSubject,
    class: deleteSubject,
    teacher: deleteSubject,
    student: deleteSubject,
    parent: deleteSubject,
    lesson: deleteSubject,
    exam: deleteSubject,
    assignment: deleteSubject,
    result: deleteSubject,
    attendance: deleteSubject,
    event: deleteSubject,
    announcement: deleteSubject,
    
}

const forms:{
    [key:string] : (type:"create" | "update" , data?: any, relatedData?: any) =>JSX.Element;
}={
    teacher:(type, data, relatedData) => <TeacherForm type={type} data={data} relatedData={relatedData}/>,
    student:(type, data, relatedData) => <StudentForm type= {type} data={data} relatedData={relatedData}/>,
    subject:(type, data, relatedData) => <SubjectForm type={type} data={data} relatedData={relatedData} />
}

function FormModal({table, type, data, id, relatedData}:formContainerProps & {relatedData?:any}) {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-[#b9d30d]" : "";

        const [open, setOpen] = useState(false);
    

    const FormAction = () =>{

    const [state, formAction] = useActionState(deleteActionMap[table], {
        success: false,
        error: false,
    });
    
    const router = useRouter();
    
      useEffect(()=>{
        if(state.success){
          toast.success(`Subject deleted successfully`);
          router.refresh()
        }
        if(state.error){
          toast.error(`failed to delete  subject`);
        }
      }, [state]);  
        return type === "delete" && id? (
            <form action={formAction}  className='p-4 flex flex-col gap-4'>
                <input type=" text | number" name='id' value={id} hidden />
                <span className='text-center font-medium'>This data will be deleted permanently, Are you sure you want to delete this {table}?</span>
                <button className='bg-red-700 w-fit text-white py-2 px-4 rounded-md border-none self-center'>Delete</button>
                 </form>
        ):type === "create" || type === "update" ? (
            forms[table] (type, data,relatedData) 
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