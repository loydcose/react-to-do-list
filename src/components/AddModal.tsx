import axios from "axios"
import useUser from "../hooks/useUser"
import CloseBtn from "./CloseBtn"
import { Dispatch, MouseEventHandler, useState } from "react"
import { jsonBaseUrl } from "../constants"

export default function AddModal({
  setOpenAddModal,
  fetchTodos,
}: {
  setOpenAddModal: Dispatch<boolean>
  fetchTodos: () => void
}) {
  const [formValues, setFormValues] = useState({
    title: "",
    comment: "",
  })
  const { user } = useUser()

  const handleSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const { title, comment } = formValues
    const payload = {
      authorId: user!.id,
      title,
      comment,
    }
    axios
      .post(`${jsonBaseUrl}/todos`, payload)
      .then((result) => {
        console.log(result)
        setOpenAddModal(false)
        fetchTodos()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="z-10 fixed inset-0 bg-black/[.10]">
      <form
        onSubmit={handleSubmit}
        className="absolute bg-white rounded-md p-4 flex flex-col gap-6 w-[90%] max-w-[428px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          onClick={() => setOpenAddModal(false)}
          type="button"
          className="ml-auto hover:bg-slate-200 p-2 rounded-md"
        >
          <CloseBtn />
        </button>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold">
            Title
          </label>
          <input
            onChange={(e) =>
              setFormValues({
                ...formValues,
                title: e.target.value,
              })
            }
            type="text"
            id="title"
            placeholder="Add your title..."
            className="border border-slate-300 px-4 py-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="comment" className="text-sm font-semibold">
            Comment
          </label>
          <input
            onChange={(e) =>
              setFormValues({
                ...formValues,
                comment: e.target.value,
              })
            }
            type="text"
            id="comment"
            placeholder="Add your comment..."
            className="border border-slate-300 px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex gap-4 items-center justify-end">
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2"
          >
            Delete
          </button>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
