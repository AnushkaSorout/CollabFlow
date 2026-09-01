import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import DashboardLayout from "../../components/DashboardLayout"
import moment from "moment"
import AvatarGroup from "../../components/AvatarGroup"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FiCalendar, FiCheckCircle, FiFlag, FiLayers } from "react-icons/fi"

const TaskDetails = () => {
  const { id } = useParams()
  const [task, setTask] = useState(null)

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-sky-50 text-sky-700 border border-sky-100"

      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100"

      default:
        return "bg-amber-50 text-amber-700 border border-amber-100"
    }
  }

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`)

      if (response.data) {
        setTask(response.data)
      }
    } catch (error) {
      console.log("Error fetching task details: ", error)
    }
  }

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist]

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed

      try {
        const response = await axiosInstance.put(`/tasks/${id}/todo`, {
          todoChecklist,
        })

        if (response.status === 200) {
          setTask(response.data?.task || task)
        } else {
          todoChecklist[index].completed = !todoChecklist[index].completed
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed
      }
    }
  }

  const handleLinkClick = (link) => {
    let parsedLink = link

    if (!/^https?:\/\//i.test(parsedLink)) {
      parsedLink = "https://" + parsedLink
    }

    window.open(parsedLink, "_blank")
  }

  useEffect(() => {
    if (id) {
      getTaskDetailsById()
    }
  }, [id])

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="app-page-shell space-y-6">
        {task && (
          <>
            <div className="hero-panel p-7 text-white sm:p-8">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`status-pill ${getStatusTagColor(task?.status)}`}>
                    {task?.status}
                  </div>

                  <div className="priority-pill border border-white/18 bg-white/10 text-white">
                    {task?.priority} Priority
                  </div>
                </div>

                <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
                  {task?.title}
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">
                  {task?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,0.8fr]">
              <div className="space-y-6">
                <div className="section-panel p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <FiLayers className="text-lg text-blue-600" />
                    <h3 className="text-xl font-semibold text-slate-900">
                      Task Overview
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InfoBox
                      icon={<FiFlag className="text-lg text-amber-600" />}
                      label="Priority"
                      value={task?.priority}
                    />

                    <InfoBox
                      icon={<FiCalendar className="text-lg text-blue-600" />}
                      label="Due Date"
                      value={
                        task?.dueDate
                          ? moment(task?.dueDate).format("Do MMM YYYY")
                          : "N/A"
                      }
                    />

                    <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/70 p-4">
                      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Assigned To
                      </label>

                      <div className="mt-3">
                        <AvatarGroup
                          avatars={
                            task?.assignedTo?.map(
                              (item) => item?.profileImageUrl
                            ) || []
                          }
                          maxVisible={5}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-panel p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <FiCheckCircle className="text-lg text-emerald-600" />
                    <h3 className="text-xl font-semibold text-slate-900">
                      Todo Checklist
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {task?.todoChecklist?.map((item, index) => (
                      <TodoCheckList
                        key={`todo_${index}`}
                        text={item.text}
                        isChecked={item?.completed}
                        onChange={() => updateTodoChecklist(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="section-panel p-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Quick Details
                  </h3>

                  <div className="mt-5 space-y-4">
                    <InfoRow
                      label="Created On"
                      value={moment(task?.createdAt).format("Do MMM YYYY")}
                    />
                    <InfoRow label="Current Status" value={task?.status} />
                    <InfoRow label="Checklist Items" value={task?.todoChecklist?.length || 0} />
                    <InfoRow label="Attachments" value={task?.attachments?.length || 0} />
                  </div>
                </div>

                {task?.attachments?.length > 0 && (
                  <div className="section-panel p-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Attachments
                    </h3>

                    <div className="mt-5 space-y-3">
                      {task?.attachments?.map((link, index) => (
                        <Attachment
                          key={`link_${index}`}
                          link={link}
                          index={index}
                          onClick={() => handleLinkClick(link)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default TaskDetails

const InfoBox = ({ icon, label, value }) => {
  return (
    <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </label>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  )
}

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-slate-200/70 bg-slate-50/70 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  )
}

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-[22px] border border-slate-200/70 bg-slate-50/70 px-4 py-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="h-4 w-4 rounded border border-slate-300 bg-white text-blue-600 outline-none"
      />

      <p
        className={`text-sm ${
          isChecked ? "text-slate-400 line-through" : "text-slate-800"
        }`}
      >
        {text}
      </p>
    </label>
  )
}

const Attachment = ({ link, index, onClick }) => {
  return (
    <button
      className="flex w-full items-center justify-between rounded-[20px] border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-left"
      onClick={onClick}
      type="button"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="truncate text-sm font-medium text-slate-700">{link}</p>
      </div>

      <FaExternalLinkAlt className="text-slate-400" />
    </button>
  )
}
