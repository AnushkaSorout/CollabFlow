import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axioInstance"
import { FaUsers } from "react-icons/fa"
import Modal from "./Modal"
import AvatarGroup from "./AvatarGroup"

const SelectedUsers = ({ selectedUser, setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedUser, setTempSelectedUser] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users")

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching users:", error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAssign = () => {
    setSelectedUser(tempSelectedUser)
    setIsModalOpen(false)
  }

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUser.includes(user._id))
    .map((user) => user.profileImageUrl)

  useEffect(() => {
    getAllUsers()

    return () => {}
  }, [])

  useEffect(() => {
    if (selectedUser.length === 0) {
      setTempSelectedUser([])
    }

    return () => {}
  }, [selectedUser])

  return (
    <div className="space-y-4">
      {selectedUserAvatars.length === 0 ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="app-button-secondary"
          type="button"
        >
          <FaUsers className="text-base" /> Add Members
        </button>
      ) : (
        <button
          className="flex w-full items-center justify-between rounded-[22px] border border-slate-200/70 bg-white/85 px-4 py-4 text-left"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Assigned Members
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Click to review or update the task team.
            </p>
          </div>

          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Select User"}
      >
        <div className="soft-scrollbar space-y-3 overflow-y-auto pr-1">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className={`flex items-center gap-4 rounded-[22px] border px-4 py-4 ${
                tempSelectedUser.includes(user._id)
                  ? "border-blue-200 bg-blue-50/70"
                  : "border-slate-200/70 bg-white/70"
              } cursor-pointer`}
              onClick={() => toggleUserSelection(user._id)}
            >
              <img
                src={user?.profileImageUrl}
                alt={user?.name}
                className="h-12 w-12 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-slate-800">{user?.name}</p>
                <p className="text-[13px] text-slate-500">{user?.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUser.includes(user._id)}
                readOnly
                className="h-4 w-4 rounded-sm border-slate-300 text-blue-600 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="app-button-ghost"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>

          <button className="app-button" onClick={handleAssign}>
            Done
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectedUsers
