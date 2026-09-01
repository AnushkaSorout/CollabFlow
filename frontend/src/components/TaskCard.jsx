import React from "react"
import Progress from "./Progress"
import moment from "moment"
import AvatarGroup from "./AvatarGroup"
import { FaFileLines } from "react-icons/fa6"
import { FiCalendar, FiCheckCircle } from "react-icons/fi"

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-100"
      case "In Progress":
        return "bg-sky-50 text-sky-700 border border-sky-100"
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100"
      default:
        return "bg-amber-50 text-amber-700 border border-amber-100"
    }
  }

  const getPriorityTagColor = () => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border border-rose-100"
      case "Medium":
        return "bg-orange-50 text-orange-700 border border-orange-100"
      case "Low":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100"
      default:
        return "bg-emerald-50 text-emerald-700 border border-emerald-100"
    }
  }

  return (
    <div
      className="section-panel group cursor-pointer overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_32px_70px_-34px_rgba(15,23,42,0.42)]"
      onClick={onClick}
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className={`status-pill ${getStatusTagColor()}`}>{status}</div>
        <div className={`priority-pill ${getPriorityTagColor()}`}>
          {priority} Priority
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="mt-5 rounded-[22px] border border-slate-200/70 bg-slate-50/70 p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600">
          <FiCheckCircle className="text-base text-emerald-600" />
          <span>
            Task done: {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </div>

        <Progress progress={progress} status={status} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <FiCalendar className="text-sm" />
            <span>Start</span>
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>
        </div>

        <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <FiCalendar className="text-sm" />
            <span>Due</span>
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {moment(dueDate).format("Do MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <AvatarGroup avatars={assignedTo || []} />

        {attachmentCount > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            <FaFileLines className="text-sm" />
            <span>{attachmentCount} file(s)</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
