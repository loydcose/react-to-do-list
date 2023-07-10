import axios from "axios"
import { FormEventHandler, useState } from "react"
import { jsonBaseUrl } from "../constants"
import useAuth from "../hooks/useAuth"
import { User } from "../types"

export default function Signin() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  })
  const [helper, setHelper] = useState("")
  const { users } = useAuth()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    console.log(users)

    const { username, password } = formValues
    const user: User | undefined | null = users.find(
      (user: User) => user.username === username
    )

    if (user && user.password === password) {
      axios
        .put(`${jsonBaseUrl}/users/${user.id}`, {
          ...user,
          isActive: true,
        })
        .then((result) => {
          console.log(result)
          if (window.top) {
            window.top.location.href = "/"
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setHelper("Wrong credentials")
    }
  }

  return (
    <main className="min-h-screen bg-slate-200 text-slate-800 flex">
      <section className="m-auto w-[90%] max-w-[456px]">
        <h1 className="text-2xl text-center font-semibold mb-12">SIGN IN</h1>
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
            />
          </div>
          <a href="/signup" className="text-blue-600 hover:underline">
            Goto sign up page
          </a>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-4"
          >
            Sign In
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
