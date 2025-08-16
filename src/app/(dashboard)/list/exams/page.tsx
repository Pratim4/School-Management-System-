import Form from "@/_components/FormModal";
import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import { classesData, examsData, role,  subjectsData  } from "@/library/data";
import prisma from "@/library/prisma";
import { ITEMS_PER_PAGE } from "@/library/settings";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ExamList = Exam & {lesson:{
subject : Subject
class: Class,
teacher: Teacher
}}

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
    className:"hidden md:table-cell"
  },
{
    header: "Teacher",
    accessor:"teacher",
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

const teacherRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[var(--secondary)]"
  >
    <td className="flex items-center gap-4 p-4">
    
    {item.lesson.subject.name}
    </td>
    <td className="hidden md:table-cell">
        {item.lesson.class.name}


    </td>
    <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}


    </td>
    <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat('en-US').format(item.startTime)}


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
async function ExamList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //url params conditios

  const query:Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson={classId: parseInt(value)}
            break;
            case "teacherId":{
              query.lesson = {teacherId: value}
            }
            case "search":
              query.lesson = {
                subject: {
                  name: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              };
              break;
               default:
                break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where:query,
      include: {
        lesson: {
          select: {
            subject: {select: { name: true }},
            class: {select: { name: true }},
            teacher: {select: { name: true, surname: true }},
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.exam.count({where: query}),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Classes</h1>
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
      <Table columns={columns} teacherRow={teacherRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ExamList;
