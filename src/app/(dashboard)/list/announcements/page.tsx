import Form from "@/_components/FormModal";
import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import prisma from "@/library/prisma";
import { ITEMS_PER_PAGE } from "@/library/settings";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";




type AnnouncementList = Announcement & { class:Class };



async function AnnouncementList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  

const query:Prisma.AnnouncementWhereInput = {};

  const {sessionClaims} =await auth()
const role = (sessionClaims?.metadata as {role?: string })?.role;

const columns = [
  {
    header: "Title ",
    accessor: "title",
  },
   {
    header: "Class",
    accessor: "class",
  },
  

{
    header: "Date",
    accessor:"date",
    className:"hidden md:table-cell"

},

  ...(role ==="admin" ?  [{
    header: "Actions",
    accessor: "actions",
  }]:[]),
];

  const teacherRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[var(--secondary)]"
  >
    <td className="flex items-center gap-4 p-4">
    
    {item.title}
    </td>
       <td >
        {item.class.name}


    </td>
       <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat('en-NP').format(item.date)}


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

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
    
            case "search":
              query.title ={contains: value, mode: "insensitive"};
              break;
               default:
                break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where:query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.announcement.count({where: query}),
  ]);



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Announcement</h1>
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
             <Form table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} teacherRow={teacherRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
}

export default AnnouncementList;
