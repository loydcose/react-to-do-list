import { useEffect, useState } from "react"
import { User } from "../types"
import axios from "axios"
import { jsonBaseUrl } from "../constants"

export default function useAuth() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get(jsonBaseUrl + "/users")
      .then((result: { data: User[] }) => {
        setUsers(result.data)
        if (result.data.some((user: User) => user.isActive === true)) {
          if (window.top) {
            window.top.location.href = "/"
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { users }
}
