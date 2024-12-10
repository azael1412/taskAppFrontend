import { User } from '@/models'

export interface Auth {
  user: User | null
  isAuthenticated: boolean
}
