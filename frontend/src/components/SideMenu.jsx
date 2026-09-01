import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axioInstance"
import { useDispatch, useSelector } from "react-redux"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useNavigate } from "react-router-dom"
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from "../utils/data"

const SideMenu = ({ activeMenu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [SideMenuData, setSideMenuData] = useState([])
  const { currentUser } = useSelector((state) => state.user)

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogut()
      return
    }

    navigate(route)
  }

  const handleLogut = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign-out")

      if (response.data) {
        dispatch(signOutSuccess())

        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setSideMenuData(
        currentUser?.role === "admin" ? SIDE_MENU_DATA : USER_SIDE_MENU_DATA
      )
    }

    return () => {}
  }, [currentUser])

  return (
    <div className="flex h-full w-full flex-col rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.7))] p-5 xl:w-[300px]">
      <div className="rounded-[28px] bg-[linear-gradient(150deg,#0f172a,#1d4ed8_62%,#0f766e)] p-5 text-white shadow-[0_26px_60px_-34px_rgba(15,23,42,0.9)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">
          Project Flow
        </p>

        <div className="mt-5 flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-3xl border border-white/20 bg-white/10">
            <img
              src={currentUser?.profileImageUrl || null}
              alt="Profile Image"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h5 className="truncate text-lg font-semibold">
              {currentUser?.name || ""}
            </h5>

            <p className="truncate text-sm text-white/65">
              {currentUser?.email || ""}
            </p>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82">
          {currentUser?.role === "admin" ? "Admin Access" : "Member Access"}
        </div>
      </div>

      <div className="mt-6 flex-1 overscroll-y-auto soft-scrollbar">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Navigation
        </p>

        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`mt-3 flex w-full cursor-pointer items-center gap-4 rounded-[20px] px-4 py-3.5 text-left text-[15px] font-medium ${
              activeMenu === item.label
                ? "bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(15,118,110,0.08))] text-slate-900 shadow-[0_18px_32px_-28px_rgba(37,99,235,0.85)]"
                : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                activeMenu === item.label
                  ? "bg-white text-blue-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <item.icon className="text-2xl" />
            </div>

            <div className="flex-1">
              <p>{item.label}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {item.path === "logout"
                  ? "Securely end your session"
                  : "Open this workspace section"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
