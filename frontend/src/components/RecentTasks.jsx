import moment from "moment"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate()

  return (
    <div className="section-panel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-200/70 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Recent Tasks</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track the latest activity and task movement across the workspace.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/tasks")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
        >
          <span>See More</span>
          <FiArrowRight className="text-base" />
        </button>
      </div>

      <div className="p-6">
        {tasks?.length > 0 ? (
          <div className="table-shell overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50/90">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Task Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Created On
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white/80">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {task.title}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`status-pill ${
                          task.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : task.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-sky-50 text-sky-700 border border-sky-100"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`priority-pill ${
                          task.priority === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-100"
                            : task.priority === "Medium"
                            ? "bg-orange-50 text-orange-700 border border-orange-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      {moment(task.createdAt).format("MMM Do, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center text-slate-500">
            No recent tasks found
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTasks
