import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axioInstance"
import { useDispatch, useSelector } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      dispatch(signInStart())

      const response = await axiosInstance.post(
        "/auth/sign-in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )

      if (response.data.role === "admin") {
        dispatch(signInSuccess(response.data))
        navigate("/admin/dashboard")
      } else {
        dispatch(signInSuccess(response.data))
        navigate("/user/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
        dispatch(signInFailure(error.response.data.message))
      } else {
        setError("Something went wrong. Please try again!")
        dispatch(signInFailure("Something went wrong. Please try again!"))
      }
    }
  }

  return (
    <AuthLayout>
      <div className="section-panel relative overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2563eb,#0f766e,#f97316)]"></div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Welcome back
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Sign in to your workspace
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Pick up where your team left off and keep every project moving.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(37,99,235,0.14),rgba(15,118,110,0.16))] text-blue-600 sm:flex">
            <FaPeopleGroup className="text-3xl" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="app-label">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-input"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="app-label">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="app-input pr-12"
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div className="app-error">{error}</div>}

          {loading ? (
            <div className="app-button w-full animate-pulse opacity-80">
              Loading...
            </div>
          ) : (
            <button type="submit" className="app-button w-full">
              Login
            </button>
          )}
        </form>

        <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Don&apos;t have an account yet?</p>

          <Link
            to={"/signup"}
            className="font-semibold text-blue-600 hover:text-teal-600"
          >
            Create one now
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
