import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import TaskStatusTabs from "../../components/TaskStatusTabs"
import TaskCard from "../../components/TaskCard"

const MyTask = () => {
  const [allTasks, setAllTasks] = useState([])
  const [tabs, setTabs] = useState([
    { label: "All", count: 0 },
    { label: "Pending", count: 0 },
    { label: "In Progress", count: 0 },
    { label: "Completed", count: 0 },
  ])
  const [filterStatus, setFilterStatus] = useState("All")

  const navigate = useNavigate()

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks", {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      })

      if (response?.data) {
        setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : [])
      }

      const statusSummary = response.data?.statusSummary || {}

      setTabs([
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ])
    } catch (error) {
      console.log("Error fetching tasks: ", error)
    }
  }

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`)
  }

  useEffect(() => {
    getAllTasks(filterStatus)

    return () => {}
  }, [filterStatus])

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="app-page-shell space-y-6">
        <div className="section-panel p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Personal queue
          </p>

          <div className="mt-3 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                My Tasks
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Focus on your current workload with cleaner filters and a more
                scannable task layout.
              </p>
            </div>

            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        </div>

        {allTasks?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map(
                  (assignedUser) => assignedUser.profileImageUrl
                )}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className="section-panel px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-900">
              No tasks found
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Once tasks are assigned to you, they&apos;ll show up here with
              their latest status and progress.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default MyTask
