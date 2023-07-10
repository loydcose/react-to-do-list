import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useEffect, useState } from "react"
import { storageName } from "./constants"
import { Data, Todo, User } from "./types"

function App() {
  const [data, setData] = useState<Data>()
  const [user, setUser] = useState<User | null>(null)
  const [userTodos, setUserTodos] = useState<Todo[]>()

  const refreshStorage = () => {
    const storage = localStorage.getItem(storageName)
    if (storage) {
      setData(JSON.parse(storage) as Data)
    } else {
      localStorage.setItem(
        storageName,
        JSON.stringify({ users: [], todos: [] })
      )
    }
  }

  useEffect(() => {
    refreshStorage()
  }, [])

  useEffect(() => {
    const activeUser = data?.users.find((user) => user.isActive)

    if (activeUser) {
      setUser(activeUser)
      const activeUserTodos = data?.todos.filter((todo) => {
        return todo.authorId === activeUser.id
      })
      setUserTodos(activeUserTodos)
    } else {
      setUser(null)
      setUserTodos(undefined)
    }
  }, [data?.todos, data?.users, data])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              user={user}
              userTodos={userTodos}
              refreshStorage={refreshStorage}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              data={data}
              user={user}
              userTodos={userTodos}
              refreshStorage={refreshStorage}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              data={data}
              user={user}
              userTodos={userTodos}
              refreshStorage={refreshStorage}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
