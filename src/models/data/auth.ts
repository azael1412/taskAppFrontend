import { User } from '@/models'

export interface Auth {
  access_token: string
  token_type: string
  expires_in: string
  user: User
}

export interface ResetPassword {
  token: string
  password: string
  password_confirmation: string
}
