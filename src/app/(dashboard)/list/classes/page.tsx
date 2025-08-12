import Pagination from "@/_components/Pagination";
import Table from "@/_components/Table";
import TableSearch from "@/_components/TableSearch";
import { classesData, role,  subjectsData  } from "@/library/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Class = {
  id: number;
  name: string;
  capacity:number;
  grade: number;

};

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capaciity",
    className:"hidden md:table-cell"
  },
{
    header: "Grade",
    accessor:"grade",
    className:"hidden md:table-cell"

},
  {
    header: "Actions",
    accessor: "actions",
  },
];

function ClassList() {
  const teacherRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[var(--secondary)]"
    >
      <td className="flex items-center gap-4 p-4">
      
      {item.name}
      </td>
      <td className="hidden md:table-cell">
          {item.capacity}


      </td>
      <td className="hidden md:table-cell">
          {item.grade}


      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center cursor-pointer">
              <Image src="/edit.png" alt="" height={16} width={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center cursor-pointer">
              <Image src="/delete.png" alt="" height={16} width={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

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
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#b9d30d] cursor-pointer">
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} teacherRow={teacherRow} data={classesData} />
      <Pagination />
    </div>
  );
}

export default ClassList;
