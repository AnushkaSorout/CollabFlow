import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/axioInstance"
import DashboardLayout from "../../components/DashboardLayout"
import { FaFileAlt } from "react-icons/fa"
import UserCard from "../../components/UserCard"
import toast from "react-hot-toast"

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users")

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching users: ", error)
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/users", {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")

      link.href = url
      link.setAttribute("download", "user_details.xlsx")
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error downloading user-details report: ", error)
      toast.error("Error downloading user-details report. Please try again!")
    }
  }

  useEffect(() => {
    getAllUsers()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="app-page-shell space-y-6">
        <div className="section-panel p-6 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Team directory
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Team Members
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Review your member list and keep track of how work is
                distributed across the team.
              </p>
            </div>

            <button
              type="button"
              className="app-button-secondary"
              onClick={handleDownloadReport}
            >
              <FaFileAlt className="text-base" />
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
