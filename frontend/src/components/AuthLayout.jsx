import React from "react"

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[6%] top-[8%] h-32 w-32 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute right-[8%] top-[16%] h-48 w-48 rounded-full bg-teal-300/20 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[32%] h-40 w-40 rounded-full bg-orange-200/20 blur-3xl"></div>
      </div>

      <div className="glass-panel relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1480px] overflow-hidden">
        <div className="w-full overflow-y-auto soft-scrollbar md:w-[47%]">
          <div className="flex min-h-full flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">
                  Workflow Suite
                </p>

                <h2 className="font-brand mt-3 text-xl text-slate-900 sm:text-2xl">
                  Collab Flow
                </h2>
              </div>

              <div className="rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                Calm workspace. Sharp execution.
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-lg">
                {children}
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden md:flex md:w-[53%]">
          <img
            src="./hi.png"
            alt="Workspace background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.8),rgba(29,78,216,0.62),rgba(15,118,110,0.42))]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.16),transparent_24%)]"></div>

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white lg:p-14">
            <div>
             
              
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-[24px] border border-white/16 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                  Dashboards
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">Clear</p>
                <p className="mt-2 text-sm text-white/72">
                  Visual summaries that stay readable at a glance.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/16 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                  Teamwork
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">Fluid</p>
                <p className="mt-2 text-sm text-white/72">
                  Assign, track, and review work without visual clutter.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/16 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                  Delivery
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">Focused</p>
                <p className="mt-2 text-sm text-white/72">
                  Keep attention on what matters most this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
