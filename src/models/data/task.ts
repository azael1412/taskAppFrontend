import { User } from './user'

export interface Task {
  id: number
  title: string
  description: string
  status: number
  user: User
  created_at: string
  updated_at: string
}

export type TaskWithoutUser = Omit<Task,'user'>