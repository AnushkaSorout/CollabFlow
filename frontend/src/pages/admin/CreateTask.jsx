import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import { MdDelete } from "react-icons/md"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import SelectedUsers from "../../components/SelectedUsers"
import TodoListInput from "../../components/TodoListInput"
import AddAttachmentsInput from "../../components/AddAttachmentsInput"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import toast from "react-hot-toast"
import Modal from "../../components/Modal"
import DeleteAlert from "../../components/DeleteAlert"

const CreateTask = () => {
  const location = useLocation()
  const { taskId } = location.state || {}

  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)

  const [error, setError] = useState("")
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  const createTask = async () => {
    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }))

      await axiosInstance.post("/tasks/create", {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success("Task created successfully!")
      clearData()
    } catch (error) {
      console.log("Error creating task: ", error)
      toast.error("Error creating task!")
    }
  }

  const updateTask = async () => {
    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text === item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      await axiosInstance.put(`/tasks/${taskId}`, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })

      toast.success("Task updated successfully!")
    } catch (error) {
      console.log("Error updating task: ", error)
      toast.error("Error updating task!")
    }
  }

  const handleSubmit = async () => {
    setError("")

    if (!taskData.title.trim()) {
      setError("Title is required!")
      return
    }

    if (!taskData.description.trim()) {
      setError("Description is required!")
      return
    }

    if (!taskData.dueDate) {
      setError("Due date is required!")
      return
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task is not assigned to any member!")
      return
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add atleast one todo task!")
      return
    }

    if (taskId) {
      updateTask()
      return
    }

    createTask()
  }

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`)

      if (response.data) {
        const taskInfo = response.data
        setCurrentTask(taskInfo)

        setTaskData((prevState) => ({
          ...prevState,
          title: taskInfo?.title,
          description: taskInfo?.description,
          priority: taskInfo?.priority,
          dueDate: taskInfo?.dueDate
            ? moment(taskInfo?.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id || []),
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }))
      }
    } catch (error) {
      console.log("Error fetching task details: ", error)
    }
  }

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`)

      setOpenDeleteAlert(false)
      toast.success("Task deleted successfully!")
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error delating task: ", error)
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById()
    }

    return () => {}
  }, [taskId])

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="app-page-shell space-y-6">
        <div className="section-panel p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Task editor
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {taskId ? "Update Task" : "Create New Task"}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Shape the task details, assign teammates, and build a checklist
                without changing how the workflow works.
              </p>
            </div>

            {taskId && (
              <button
                className="app-button-danger"
                onClick={() => setOpenDeleteAlert(true)}
                type="button"
              >
                <MdDelete className="text-lg" />
                Delete Task
              </button>
            )}
          </div>
        </div>

        {error && <div className="app-error">{error}</div>}

        <div className="section-panel p-6 sm:p-7">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <div>
                <label className="app-label">
                  Task Title <span className="text-rose-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  className="app-input"
                  value={taskData.title}
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="app-label">Description</label>

                <textarea
                  placeholder="Enter task description"
                  rows={5}
                  className="app-textarea"
                  value={taskData.description}
                  onChange={(e) =>
                    handleValueChange("description", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="app-label">Priority</label>

                  <select
                    className="app-select"
                    value={taskData.priority}
                    onChange={(e) =>
                      handleValueChange("priority", e.target.value)
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="app-label">Due Date</label>

                  <DatePicker
                    selected={taskData.dueDate}
                    onChange={(data) => handleValueChange("dueDate", data)}
                    minDate={new Date()}
                    placeholderText="Select due date"
                    className="app-input"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[26px] border border-slate-200/70 bg-slate-50/70 p-5">
                <label className="app-label">Assign To</label>

                <SelectedUsers
                  selectedUser={taskData.assignedTo}
                  setSelectedUser={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>

              <div className="rounded-[26px] border border-slate-200/70 bg-slate-50/70 p-5">
                <label className="app-label">Task Guidelines</label>
                <p className="text-sm leading-6 text-slate-500">
                  Keep titles short, descriptions clear, and include at least
                  one checklist item before saving.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[26px] border border-slate-200/70 bg-slate-50/70 p-5">
            <label className="app-label">TODO Checklist</label>

            <TodoListInput
              todoList={taskData?.todoChecklist}
              setTodoList={(value) =>
                handleValueChange("todoChecklist", value)
              }
            />
          </div>

          <div className="mt-6 rounded-[26px] border border-slate-200/70 bg-slate-50/70 p-5">
            <label className="app-label">Add Attachments</label>

            <AddAttachmentsInput
              attachments={taskData?.attachments}
              setAttachments={(value) =>
                handleValueChange("attachments", value)
              }
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="app-button w-full sm:w-auto"
              onClick={handleSubmit}
              type="button"
            >
              {taskId ? "Update Task" : "Create Task"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Task"}
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask
