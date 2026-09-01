import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment" 
import { useNavigate } from "react-router-dom"
import RecentTasks from "../../components/RecentTasks"
import CustomPieChart from "../../components/CustomPieChart"
import CustomBarChart from "../../components/CustomBarChart"
import {
  MdAddTask,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
  MdTrendingUp,
  MdVerified,
} from "react-icons/md"

const COLORS = ["#f59e0b", "#2563eb", "#10b981"]

const Dashboard = () => {
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)

  const [dashboardData, setDashboardData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {}
    const taskPriorityLevels = data?.taskPriorityLevel || {}

    setPieChartData([
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ])

    setBarChartData([
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ])
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/tasks/dashboard-data")

      if (response.data) {
        setDashboardData(response.data)
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.log("Error fetching dashboard data: ", error)
    }
  }

  useEffect(() => {
    getDashboardData()

    return () => {}
  }, [])

  const stats = [
    {
      label: "Total Tasks",
      value: dashboardData?.charts?.taskDistribution?.All || 0,
      icon: MdOutlineTaskAlt,
      accent: "text-blue-600 bg-blue-50",
    },
    {
      label: "Pending Tasks",
      value: dashboardData?.charts?.taskDistribution?.Pending || 0,
      icon: MdOutlinePendingActions,
      accent: "text-amber-600 bg-amber-50",
    },
    {
      label: "In Progress",
      value: dashboardData?.charts?.taskDistribution?.InProgress || 0,
      icon: MdTrendingUp,
      accent: "text-sky-600 bg-sky-50",
    },
    {
      label: "Completed",
      value: dashboardData?.charts?.taskDistribution?.Completed || 0,
      icon: MdVerified,
      accent: "text-emerald-600 bg-emerald-50",
    },
  ]

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="app-page-shell space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100 p-7 sm:p-8">
  <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <span className="eyebrow-badge text-slate-500">Admin overview</span>

      <h2 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
        Welcome back, {currentUser?.name}
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Here&apos;s the latest pulse of your workspace for{" "}
        {moment().format("dddd, Do MMMM YYYY")}.
      </p>
    </div>

    <button
      className="app-button-secondary"
      onClick={() => navigate("/admin/create-task")}
    >
      <MdAddTask className="text-lg" />
      Create New Task
    </button>
  </div>
</div>

            

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="metric-card p-5">
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-4xl font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-[20px] ${item.accent}`}
                >
                  <item.icon className="text-3xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="section-panel p-6">
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-slate-900">
                Task Distribution
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Pending, active, and completed work at a glance.
              </p>
            </div>

            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>

          <div className="section-panel p-6">
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-slate-900">
                Task Priority Levels
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                See where the workload is leaning across priorities.
              </p>
            </div>

            <CustomBarChart data={barChartData} />
          </div>
        </div>

        <RecentTasks tasks={dashboardData?.recentTasks} />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
