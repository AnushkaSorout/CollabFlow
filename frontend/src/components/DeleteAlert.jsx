import React from "react"

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <div className="rounded-[24px] border border-rose-100 bg-rose-50/80 p-5">
        <p className="text-sm leading-6 text-rose-700">{content}</p>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className="app-button-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
