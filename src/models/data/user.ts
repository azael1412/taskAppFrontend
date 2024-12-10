import { Role } from './role'

export interface User {
  id: number
  name: string
  email: string
  status: number
  role: Role
  email_verified_at: string | null
  created_at: string | null
  updated_at: string | null
}
