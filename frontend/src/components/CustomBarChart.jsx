import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const CustomBarChart = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#10b981"

      case "Medium":
        return "#f59e0b"

      case "High":
        return "#f43f5e"

      default:
        return "#10b981"
    }
  }

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-[18px] border border-slate-200/70 bg-white/95 px-4 py-3 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.42)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {payload[0].payload.priority}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Count:{" "}
            <span className="font-semibold text-slate-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barCategoryGap={22}>
        <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 6" />

        <XAxis
          dataKey="priority"
          tick={{ fill: "#64748b", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis tick={{ fill: "#64748b", fontSize: 12 }} tickLine={false} axisLine={false} />

        <Tooltip
          content={<CustomToolTip />}
          cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
        />

        <Bar dataKey="count" radius={[16, 16, 6, 6]}>
          {data?.map((entry, index) => (
            <Cell key={index} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart
