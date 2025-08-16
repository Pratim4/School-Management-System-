import FormModal from "@/_components/FormModal";
import Form from "@/_components/FormModal";
import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import { role, studentsData, teachersData } from "@/library/data";
import prisma from "@/library/prisma";
import { ITEMS_PER_PAGE } from "@/library/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type StudentList = Student & { class: Class };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];
const teacherRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[var(--secondary)]"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/view.png" alt="" height={16} width={16} />
          </button>
        </Link>
        {role === "admin" && (
                    <FormModal table='student' type='delete' id={item.id}/>

        )}
      </div>
    </td>
  </tr>
);

async function StudentList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //url params conditios

  const query:Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class ={
              lesson: {
                some: {
                  teacherId: value,
                }
              }
            };
            break;
            case "search":
              query.name = {
                contains: value,
                mode: "insensitive",
              };
              break;
               default:
                break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where:query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.student.count({where: query}),
  ]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Students</h1>
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
                        <Form table='student' type='create'/>

            )}
          </div>
        </div>
      </div>
      <Table columns={columns} teacherRow={teacherRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
}

export default StudentList;
