"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import FormField from "../FormField";
import { subjectSchema, SubjectSchema } from "@/library/formSchemas";
import { createSubject, updateSubject } from "@/library/serverAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { Action } from "@clerk/elements/sign-in";



function SubjectForm({
  type,
  data,
  relatedData
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema) as unknown as Resolver<SubjectSchema>,
  });
  const [state,FormAction] = useActionState(type==="create" ? createSubject : updateSubject, {
    success:false,
    error:false,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    startTransition(() => {
        FormAction(data);
    });
  });
const router = useRouter();

  useEffect(()=>{
    if(state.success){
      toast.success(`Subject ${type==="create" ? "created" : "updated"} successfully`);
      router.refresh()
    }
    if(state.error){
      toast.error(`Error ${type==="create" ? "creating" : "updating"} subject`);
    }
  }, [state]);  


  const {teachers} = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type==="create" ? "Add new Subject" : "Update Subject"}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Subject's Information
      </span>
      <div className="flex justify-between flex-wrap gap-4 ">
        <FormField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        { data && (
          <FormField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
          
        />
)}
  <div className='flex flex-col gap-2 w-full md:w-1/4'>

        <label className='text-xs text-gray-500'>Teacher</label>
        <select multiple
        {...register("teachers")} className='ring-[1.5px] ring-gray-300 text-gray-700 p-2 rounded-md text-sm w-full'
        defaultValue={data?.teachers}
        >
         {teachers.map((teacher:{id:string; name:string;surname:string}) => ( 
        <option value={teacher.id} key={teacher.id}>{teacher.name + " " + teacher.surname}</option>
         )
          )}
        </select>
        {errors.teachers?.message && <p className='text-xs text-red-700'>{errors.teachers.message.toString()}</p>}
        </div>
        
      </div>

      
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default SubjectForm;
