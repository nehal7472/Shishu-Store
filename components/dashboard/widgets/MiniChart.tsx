// components/dashboard/widgets/MiniChart.tsx
"use client";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { x: "Mon", y: 120 },
  { x: "Tue", y: 200 },
  { x: "Wed", y: 150 },
  { x: "Thu", y: 220 },
  { x: "Fri", y: 170 },
  { x: "Sat", y: 240 },
  { x: "Sun", y: 190 },
];

export default function MiniChart() {
  return (
    <div style={{ width: "100%", height: 60 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="y" stroke="#EC8923" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
