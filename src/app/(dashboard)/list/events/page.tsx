import Form from "@/_components/FormModal";
import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import {  eventsData,  role,    } from "@/library/data";
import prisma from "@/library/prisma";
import { ITEMS_PER_PAGE } from "@/library/settings";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type EventList= Event & { class : Class }

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
{
    header: "Start Time",
    accessor:"startTime",
    className:"hidden md:table-cell"

},
{
    header: "End Time",
    accessor:"endTime",
    className:"hidden md:table-cell"

},
  {
    header: "Actions",
    accessor: "actions",
  },
];

const teacherRow = (item: EventList) => (
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
        {new Intl.DateTimeFormat('en-NP').format(item.startTime)}


    </td>
    <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString('en-NP',{
          hour:"2-digit",
          minute:"2-digit",
          hour12: false,
        })}


    </td>
    <td className="hidden md:table-cell">
         {item.endTime.toLocaleTimeString('en-NP',{
          hour:"2-digit",
          minute:"2-digit",
          hour12: false,
        })}


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
async function EventList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  

  const query:Prisma.EventWhereInput = {};

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
    prisma.event.findMany({
      where:query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.event.count({where: query}),
  ]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Events</h1>
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
           <Form table="event" type="create"  />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} teacherRow={teacherRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
}

export default EventList;
