import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Dashboard from "./pages/admin/Dashboard"
import ManageTasks from "./pages/admin/ManageTasks"
import ManageUsers from "./pages/admin/ManageUsers"
import CreateTask from "./pages/admin/CreateTask"
import PrivateRoute from "./routes/PrivateRoute"
import UserDashboard from "./pages/user/UserDashboard"
import TaskDetails from "./pages/user/TaskDetails"
import MyTasks from "./pages/user/MyTasks"
import { useSelector } from "react-redux"

import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<TaskDetails />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Root />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15, 23, 42, 0.92)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            boxShadow: "0 24px 60px -30px rgba(15, 23, 42, 0.65)",
          },
          success: {
            iconTheme: {
              primary: "#34d399",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#fb7185",
              secondary: "#0f172a",
            },
          },
        }}
      />
    </div>
  )
}

export default App

const Root = () => {
  const { currentUser } = useSelector((state) => state.user)

  if (!currentUser) {
    return <Navigate to={"/login"} />
  }

  return currentUser.role === "admin" ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    <Navigate to={"/user/dashboard"} />
  )
}
