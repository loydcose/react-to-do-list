import { useEffect, useState } from "react"
import { Todo } from "../types"
import axios from "axios"
import { jsonBaseUrl } from "../constants"
import useUser from "./useUser"

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [userTodos, setUserTodos] = useState<Todo[]>([])
  const { user } = useUser()

  const fetchTodos = () => {
    axios
      .get(jsonBaseUrl + "/todos")
      .then((result: { data: Todo[] }) => {
        setTodos(result.data)

        setUserTodos(
          result.data.filter((todo: Todo) => todo.authorId === user!.id)
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (user) {
      fetchTodos()
    }
  }, [user])

  return { todos, userTodos, fetchTodos }
}
