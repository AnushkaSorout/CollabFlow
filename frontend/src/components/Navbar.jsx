import React, { useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"
import { useSelector } from "react-redux"
import SideMenu from "./SideMenu"

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="sticky top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto flex max-w-[1520px] items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-slate-700 shadow-sm xl:hidden"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Workspace
            </p>

            <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
              {activeMenu}
            </h2>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              {currentUser?.name || "Project Flow"}
            </p>
            <p className="text-xs text-slate-500">{today}</p>
          </div>

          <div className="h-11 w-11 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm">
            <img
              src={currentUser?.profileImageUrl || null}
              alt={currentUser?.name || "User"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed inset-0 z-40 flex xl:hidden">
          <div
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            onClick={() => setOpenSideMenu(false)}
          ></div>

          <div className="relative z-50 h-full w-[310px] max-w-[85vw] p-4">
            <div className="glass-panel h-full overflow-hidden">
              <button
                className="absolute right-8 top-8 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/55 bg-white/75 text-slate-600 shadow-sm"
                onClick={() => setOpenSideMenu(false)}
              >
                <MdClose className="text-2xl" />
              </button>

              <div className="h-full pt-16">
                <SideMenu activeMenu={activeMenu} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
