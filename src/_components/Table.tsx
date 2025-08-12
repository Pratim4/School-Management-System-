import React from 'react'

function Table({columns,teacherRow, data}:{columns:{header:string; accessor:string; className?:string}[];
teacherRow:(item:any) => React.ReactNode;
data:any[]}
) {
  return (
        <table className='w-full mt-4'>
            <thead>
                <tr className='text-left text-gray-600 text-sm'>
                    {columns.map(col =>(
                        <th key={col.accessor} className={col.className}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => teacherRow(item))}
            </tbody>
        </table>
  )
}

export default Table