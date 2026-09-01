import React from "react"

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/70 p-2 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.28)]">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-2 rounded-[18px] px-4 py-3 text-sm font-semibold ${
              activeTab === tab.label
                ? "bg-[linear-gradient(135deg,rgba(37,99,235,0.96),rgba(15,118,110,0.9))] text-white shadow-[0_20px_36px_-28px_rgba(37,99,235,0.95)]"
                : "bg-slate-50/75 text-slate-500 hover:bg-white hover:text-slate-900"
            } cursor-pointer`}
            onClick={() => setActiveTab(tab.label)}
            type="button"
          >
            <span>{tab.label}</span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs ${
                activeTab === tab.label
                  ? "bg-white/18 text-white"
                  : "bg-slate-200/80 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskStatusTabs
