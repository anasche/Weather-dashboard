import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ChartCard = ({
  title,
  dataKey,
  color,
  icon: Icon,
  unit,
  weeklyData,
}: any) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <Icon className={`h-5 w-5 ${color}`} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: any) => [`${value}${unit}`, title]}
            labelFormatter={(label) => {
              const item = weeklyData.find((d: any) => d.date === label);
              return item ? item.fullDate : label;
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={
              color.includes("red")
                ? "#ef4444"
                : color.includes("blue")
                ? "#3b82f6"
                : color.includes("orange")
                ? "#f97316"
                : color.includes("emerald")
                ? "#10b981"
                : "#6b7280"
            }
            strokeWidth={3}
            dot={{
              fill: color.includes("red")
                ? "#ef4444"
                : color.includes("blue")
                ? "#3b82f6"
                : color.includes("orange")
                ? "#f97316"
                : color.includes("emerald")
                ? "#10b981"
                : "#6b7280",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              stroke: color.includes("red")
                ? "#ef4444"
                : color.includes("blue")
                ? "#3b82f6"
                : color.includes("orange")
                ? "#f97316"
                : color.includes("emerald")
                ? "#10b981"
                : "#6b7280",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
