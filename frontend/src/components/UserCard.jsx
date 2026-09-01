import React from "react"

const UserCard = ({ userInfo }) => {
  return (
    <div className="section-panel overflow-hidden p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={userInfo?.profileImageUrl}
            alt={userInfo?.name}
            className="h-14 w-14 rounded-[22px] border border-white/90 object-cover shadow-sm"
          />

          <div>
            <p className="text-lg font-semibold text-slate-900">
              {userInfo?.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">{userInfo?.email}</p>
          </div>
        </div>

        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Active
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="in-progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="completed"
        />
      </div>
    </div>
  )
}

export default UserCard

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "pending":
        return "from-amber-100 to-orange-100 text-amber-700"

      case "in-progress":
        return "from-sky-100 to-blue-100 text-sky-700"

      case "completed":
        return "from-emerald-100 to-teal-100 text-emerald-700"

      default:
        return "from-amber-100 to-orange-100 text-amber-700"
    }
  }

  return (
    <div
      className={`rounded-[20px] bg-gradient-to-br ${getStatusTagColor()} p-4`}
    >
      <p className="text-2xl font-bold">{count}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em]">
        {label}
      </p>
    </div>
  )
}
