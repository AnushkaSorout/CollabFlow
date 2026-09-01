import React from "react"

const CustomLegend = ({ payload }) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {payload?.map((entry, index) => (
        <div
          className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/85 px-3 py-2"
          key={`legend-${index}`}
        >
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          <span className="text-xs font-semibold text-slate-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend
