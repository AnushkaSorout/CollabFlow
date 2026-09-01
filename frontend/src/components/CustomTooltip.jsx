import React from "react"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[18px] border border-slate-200/70 bg-white/95 px-4 py-3 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.42)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {payload[0].name}
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Count:{" "}
          <span className="font-semibold text-slate-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
