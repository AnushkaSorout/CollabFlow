import React, { useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { MdDelete } from "react-icons/md"

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim() !== "") {
      setTodoList([...todoList, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArray = todoList.filter((_, i) => i !== index)
    setTodoList(updatedArray)
  }

  return (
    <div>
      <div className="space-y-3">
        {todoList.map((item, index) => (
          <div
            key={`${item}_${index}`}
            className="flex items-center justify-between rounded-[20px] border border-slate-200/70 bg-slate-50/70 px-4 py-3"
          >
            <p className="min-w-0 text-sm font-medium text-slate-700">
              <span className="mr-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              {item}
            </p>

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
        <input
          type="text"
          placeholder="Add a checklist item"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="app-input flex-1"
        />

        <button type="button" className="app-button" onClick={handleAddOption}>
          <IoMdAdd className="text-base" />
          Add Item
        </button>
      </div>
    </div>
  )
}

export default TodoListInput
