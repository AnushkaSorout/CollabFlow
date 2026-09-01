import React from "react"

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar-${index + 1}`}
          className="h-10 w-10 rounded-2xl border-2 border-white object-cover shadow-sm -ml-3 first:ml-0"
        />
      ))}

      {avatars.length > maxVisible && (
        <div className="flex h-10 min-w-10 items-center justify-center rounded-2xl border-2 border-white bg-slate-100 px-2 text-xs font-semibold text-slate-600 shadow-sm -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
