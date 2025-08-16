import React from "react";
import FormModal from "./FormModal";
import prisma from "@/library/prisma";
import { teachersData } from "@/library/data";
export type formContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
    relatedData?: any;
};

async function FormContainer({
    table,type, data, id,
}:formContainerProps) {
let relatedData ={}

if(type !== "delete"){
    switch(table){
        case "subject":

        const subjectTeacher = await prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                surname: true
            }
        });
        relatedData = {teachers: subjectTeacher}
        break;

        default:
            break;
    }
}

  return <div><FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} /></div>; 
}

export default FormContainer;
