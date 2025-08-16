"use client";
import Image from "next/image";
import React from "react";
import { cursorTo } from "readline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AttendanceChart({data} :{data:{name:string,present:number,absent:number}[]}) {
  return (
 
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          barCategoryGap={"15%"}
          barGap={0}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="present"
            stackId="a"
            fill="var(--primary)"
            legendType="circle"
          />
          <Bar
            dataKey="absent"
            stackId="a"
            fill="var(--light)"
            legendType="circle"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
  );
}

export default AttendanceChart;
