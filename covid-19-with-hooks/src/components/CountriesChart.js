import React from "react";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

function CounteriesChart({ data, dataKey, onclick }) {
  return (
    <BarChart
      width={1200}
      height={250}
      style={{ margin: "auto" }}
      margin={{ top: 30, left: 20, right: 30 }}
      data={data}
      onClick={onclick}
    >
      <CartesianGrid strokeDasharray="4,1,2" />
      <XAxis dataKey="country" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill="#8884d8" />
    </BarChart>
  );
}

export default CounteriesChart;
