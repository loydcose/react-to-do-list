import { useEffect, useState } from "react"
import { User } from "../types"
import axios from "axios"
import { jsonBaseUrl } from "../constants"

export default function useUser() {
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    axios
      .get(jsonBaseUrl + "/users")
      .then((result: { data: User[] }) => {
        setUser(result.data.find((user: User) => user.isActive === true))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { user }
}
