import React from "react"

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "from-sky-500 to-blue-600"

      case "Completed":
        return "from-emerald-500 to-teal-600"

      default:
        return "from-amber-400 to-orange-500"
    }
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Progress</span>
        <span>{progress || 0}%</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor()} shadow-[0_12px_24px_-16px_rgba(37,99,235,0.95)]`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Progress
