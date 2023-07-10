import { useEffect } from "react"
import { User } from "../types"

export default function useAuth(user: User | null) {
  useEffect(() => {
    if (user) {
      if (window.top) {
        window.top.location.href = "/"
      }
    }
  }, [user])
}
