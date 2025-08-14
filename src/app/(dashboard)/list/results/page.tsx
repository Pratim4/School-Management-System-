import Form from "@/_components/FormModal";
import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import { classesData, examsData, resultsData, role,  subjectsData  } from "@/library/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Result = {
  id: number;
  subject: string;
  class:string;
  teacher: string;
  student: string;
  type: "exam" | "assignment"
  date:string;
  score: number;

};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
   {
    header: "Student",
    accessor: "student",
  },
  
   {
    header: "Score",
    accessor: "score",
    className:"hidden md:table-cell"
  },
  

  {
      header: "Teacher",
      accessor:"teacher",
      className:"hidden md:table-cell"
  
  },
  {
    header: "Class",
    accessor: "class",
    className:"hidden md:table-cell"
  },
{
    header: "Date",
    accessor:"date",
    className:"hidden md:table-cell"

},
  {
    header: "Actions",
    accessor: "actions",
  },
];

function ExamList() {
  const teacherRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[var(--secondary)]"
    >
      <td className="flex items-center gap-4 p-4">
      
      {item.subject}
      </td>
         <td >
          {item.student}


      </td>
         <td className="hidden md:table-cell">
          {item.score}


      </td>
      <td className="hidden md:table-cell">
          {item.teacher}


      </td>
      <td className="hidden md:table-cell">
          {item.class}


      </td>
      <td className="hidden md:table-cell">
          {item.date}


      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
          <Form table="class" type="update" data={item} />

            <Form table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#b9d30d] cursor-pointer">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#b9d30d] cursor-pointer">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
             <Form table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} teacherRow={teacherRow} data={resultsData} />
      <Pagination />
    </div>
  );
}

export default ExamList;
