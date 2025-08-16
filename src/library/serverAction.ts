"use server"

import { ClassSchema, SubjectSchema } from "./formSchemas"
import prisma from "./prisma"
type currentState = {
    success: boolean;
    error: boolean;
}
export const createSubject = async (currentState:currentState, data : SubjectSchema)=>{
    console.log(data + " in the server action")
    try{
        await prisma.subject.create({
            data:{
                name: data.name,
                teachers:{
                    connect:data.teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })

        // revalidatePath("/list/subjects")
        return {success:true, error:false}
    }catch(error){
        console.error(error)
        return {success:false, error:true}
    }
}
export const updateSubject = async (currentState:currentState, data : SubjectSchema)=>{
    console.log(data + " in the server action")
    try{
         await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: data.teachers?.length
          ? { set: data.teachers.map((teacherId) => ({ id: teacherId })) }
          : undefined,
      },
    });
    return { success: true, error: false };
    }catch(error){
        console.error(error)
        return {success:false, error:true}
    }
}
export const deleteSubject = async (currentState:currentState, data : FormData)=>{
    const id = data.get("id") as string;
    try{
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        })

        
        // revalidatePath("/list/subjects")
        return {success:true, error:false}
    }catch(error){
        console.error(error)
        return {success:false, error:true}
    }
}


// export const  createClass = async (currentState:currentState, data : ClassSchema)=>{
//     console.log(data + " in the server action")
//     try{
//         await prisma.class.create({
//             data:{
              
//             }
//         })

//         // revalidatePath("/list/subjects")
//         return {success:true, error:false}
//     }catch(error){
//         console.error(error)
//         return {success:false, error:true}
//     }
// }
// export const updateClass = async (currentState:currentState, data : ClassSchema)=>{
//     console.log(data + " in the server action")
//     try{
//         await prisma.class.update({
//             where: {
//                 id: data.id,
//             },
//             data:{
               
//             }
//         })

        
//         // revalidatePath("/list/subjects")
//         return {success:true, error:false}
//     }catch(error){
//         console.error(error)
//         return {success:false, error:true}
//     }
// }
// export const deleteClass = async (currentState:currentState, data : FormData)=>{
//     const id = data.get("id") as string;
//     try{
//         await prisma.class.delete({
//             where: {
//                 id: parseInt(id),
//             },
//         })

        
//         // revalidatePath("/list/subjects")
//         return {success:true, error:false}
//     }catch(error){
//         console.error(error)
//         return {success:false, error:true}
//     }
// }
