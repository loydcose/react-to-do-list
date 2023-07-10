import axios from "axios"
import { FormEventHandler, useState } from "react"
import { jsonBaseUrl } from "../constants"
import useAuth from "../hooks/useAuth"

export default function Signup() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [helper, setHelper] = useState("")
  useAuth()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const { username, password, confirmPassword } = formValues
    if (password !== confirmPassword) {
      setHelper("Password didn't match")
      return
    }

    const payload = {
      username,
      password,
      isActive: true,
    }

    axios
      .post(jsonBaseUrl + "/users", payload)
      .then((result) => {
        console.log(result)
        if (window.top) {
          window.top.location.href = "/"
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <main className="min-h-screen bg-slate-200 text-slate-800 flex">
      <section className="m-auto w-[90%] max-w-[456px]">
        <h1 className="text-2xl text-center font-semibold mb-12">SIGN UP</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>
            <input
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
              type="text"
              id="username"
              placeholder="Enter your username..."
              className="border border-slate-300 px-4 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              type="text"
              id="password"
              placeholder="Enter your password..."
              className="border border-slate-300 px-4 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <input
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  confirmPassword: e.target.value,
                })
              }
              type="text"
              id="confirmPassword..."
              placeholder="Confirm your password"
              className="border border-slate-300 px-4 py-2 rounded-md"
              required
            />
          </div>
          <a href="/signin" className="text-blue-600 hover:underline">
            Goto sign in page
          </a>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-4"
          >
            Sign Up
          </button>
          {helper && (
            <p className="text-white p-1 rounded-md bg-red-600 text-center">
              {helper}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
