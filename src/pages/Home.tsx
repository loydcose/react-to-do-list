import AddModal from "../components/AddModal"
import { useState } from "react"
import useTodos from "../hooks/useTodos"
import UpdateModal from "../components/UpdateModal"
import { Todo } from "../types"
import useUser from "../hooks/useUser"
import { jsonBaseUrl } from "../constants"
import axios from "axios"

export default function Home() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null)
  const { userTodos, fetchTodos } = useTodos()
  const { user } = useUser()

  const handleSignOut = () => {
    axios
      .put(`${jsonBaseUrl}/users/${user!.id}`, { ...user, isActive: false })
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
    <main className="min-h-screen bg-white text-slate-800">
      <section className="w-[90%] max-w-[1020px] mx-auto py-12">
        <nav className="flex items-center justify-between flex-wrap gap-4 mb-12">
          {user && (
            <p className="font-medium text-slate-600">{user.username}</p>
          )}
          {user && (
            <button
              onClick={handleSignOut}
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Sign out
            </button>
          )}
        </nav>
        <div className="w-full mx-auto max-w-[550px] flex flex-col gap-6 items-stretch justify-center">
          <h1 className="font-semibold text-2xl text-center">TODO LIST 📃</h1>
          {userTodos.map((todo) => (
            <button
              onClick={() => setUpdateTodo(todo)}
              key={todo.id}
              type="button"
              className="flex flex-col gap-2 rounded-md bg-slate-200 hover:bg-slate-300  p-4"
            >
              <h2 className="font-semibold">{todo.title}</h2>
              <p className="font-italic text-slate-600">{todo.comment}</p>
            </button>
          ))}
          {user ? (
            <button
              onClick={() => setOpenAddModal(true)}
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-4"
            >
              Add To-do
            </button>
          ) : (
            <p className="text-center my-12">
              You need to{" "}
              <a href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </a>{" "}
              first
            </p>
          )}
        </div>
      </section>

      {updateTodo && (
        <UpdateModal
          updateTodo={updateTodo}
          setUpdateTodo={setUpdateTodo}
          fetchTodos={fetchTodos}
        />
      )}
      {openAddModal && (
        <AddModal setOpenAddModal={setOpenAddModal} fetchTodos={fetchTodos} />
      )}
    </main>
  )
}
