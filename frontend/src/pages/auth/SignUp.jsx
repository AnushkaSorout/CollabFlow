import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"

const SignUp = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter the name")
      return
    }

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
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic)
        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/auth/sign-up", {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminJoinCode: adminInviteToken.trim(),
      })

      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again!")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="section-panel relative overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#f97316,#2563eb,#0f766e)]"></div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Join the workspace
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Create your Project Flow account
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Set up your profile, choose your access level, and start managing
              tasks with a calmer, clearer interface.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(37,99,235,0.16))] text-blue-600 sm:flex">
            <FaPeopleGroup className="text-3xl" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/80 p-5">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Profile photo
            </p>

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div>
            <label htmlFor="fullName" className="app-label">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="app-input"
              placeholder="Your full name"
              required
            />
          </div>

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
                placeholder="Choose a secure password"
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

          <div>
            <label htmlFor="adminInviteTokem" className="app-label">
              Admin Invite Token
            </label>

            <div className="relative">
              <input
                id="adminInviteTokem"
                type={showAdminInviteToken ? "text" : "password"}
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                className="app-input pr-12"
                placeholder="Leave blank for a member account"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-700"
                onClick={() =>
                  setShowAdminInviteToken(!showAdminInviteToken)
                }
              >
                {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="app-helper">
              Leave this empty to create a member account. Add the invite token
              only when you need admin access.
            </p>
          </div>

          {error && <div className="app-error">{error}</div>}

          <button type="submit" className="app-button w-full">
            Sign Up
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Already have an account?</p>

          <Link
            to={"/login"}
            className="font-semibold text-blue-600 hover:text-teal-600"
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
