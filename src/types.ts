export type User = {
  id: number
  username: string
  password: string
  isActive: boolean
}

export type Todo = {
  authorId: number
  id: number
  title: string
  comment: string
}