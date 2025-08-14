'use client'
import Image from 'next/image';
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts';

const RADIAN = Math.PI / 180;
const chartData = [
  { name: 'Poor', value: 80, color: 'var(--light)' },
  { name: 'Good', value:45, color: 'var(--primary)' },
  { name: 'Excellent', value: 45, color: 'green' },
];

type Needle = {
  value: number;
  data: { name: string; value: number; color: string }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
};

const needle = ({ value, data, cx, cy, iR, oR, color }: Needle) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} Z`}
      fill={color}
    />,
  ];
};

function Performance() {
  const cx = 150;
  const cy = 150;
  const iR = 50;
  const oR = 100;
  

  const highest = chartData.reduce((max, entry) =>
    entry.value > max.value ? entry : max
  );

  const value = highest.value;


  return (
    <div className='bg-white p-4 rounded-md h-80 flex flex-col items-center'>
     
      <div className='flex items-center justify-between w-full mb-2'>
        <h1 className='text-xl font-semibold'>Performance</h1>
        <Image src='/moreDark.png' alt='' width={16} height={16} />
      </div>

      <PieChart width={300} height={200}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={chartData}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
        >
          {chartData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
        {needle({ value, data: chartData, cx, cy, iR, oR, color: '#d0d000' })}
      </PieChart>

      <div className="flex gap-4 mt-2">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Performance;
