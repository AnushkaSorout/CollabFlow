import React, { useState } from "react"
import { ImAttachment } from "react-icons/im"
import { IoMdAdd } from "react-icons/io"
import { MdDelete } from "react-icons/md"

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setAttachments([...attachments, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArray = attachments.filter((_, i) => i !== index)
    setAttachments(updatedArray)
  }

  return (
    <div>
      <div className="space-y-3">
        {attachments.map((item, index) => (
          <div
            key={`${item}_${index}`}
            className="flex items-center justify-between rounded-[20px] border border-slate-200/70 bg-slate-50/70 px-4 py-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
                <ImAttachment className="text-sm" />
              </div>

              <p className="truncate text-sm font-medium text-slate-700">
                {item}
              </p>
            </div>

            <button
              type="button"
              className="ml-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100"
              onClick={() => handleDeleteOption(index)}
            >
              <MdDelete className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-[20px] border border-slate-200/70 bg-white/85 px-4 py-3">
          <ImAttachment className="text-slate-400" />

          <input
            type="text"
            placeholder="Paste a file link"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>

        <button type="button" className="app-button" onClick={handleAddOption}>
          <IoMdAdd className="text-lg" />
          Add Link
        </button>
      </div>
    </div>
  )
}

export default AddAttachmentsInput
