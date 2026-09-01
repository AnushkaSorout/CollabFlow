import React from "react"
import { useSelector } from "react-redux"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-90px] top-[120px] h-56 w-56 rounded-full bg-blue-300/15 blur-3xl"></div>
        <div className="absolute right-[-120px] top-[18%] h-72 w-72 rounded-full bg-teal-300/14 blur-3xl"></div>
        <div className="absolute bottom-[-60px] left-[30%] h-64 w-64 rounded-full bg-orange-200/14 blur-3xl"></div>
      </div>

      <Navbar activeMenu={activeMenu} />

      {currentUser && (
        <div className="mx-auto flex w-full max-w-[1520px] flex-1 gap-5 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div className="hidden xl:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
