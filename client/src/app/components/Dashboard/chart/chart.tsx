"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", scans: 40, scams: 12 },
  { name: "Tue", scans: 65, scams: 20 },
  { name: "Wed", scans: 52, scams: 17 },
  { name: "Thu", scans: 80, scams: 25 },
  { name: "Fri", scans: 61, scams: 15 },
  { name: "Sat", scans: 44, scams: 8 },
  { name: "Sun", scans: 70, scams: 22 },
];

export default function Chart() {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-xl border border-white/10 text-white">
      <h2 className="text-2xl font-bold mb-4">📈 Weekly Scan Recap</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{ backgroundColor: "#151c2c", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ccc" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="scams"
            stroke="#8b5cf6"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
