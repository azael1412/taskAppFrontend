export interface PasswordErrors {
  email?: string[]
  token?: string[]
  password?: string[]
  password_confirmation?: string[]
}

// export interface PasswordForgotErrors {
//   email?: string[]
// }

export interface UserErrors {
  name?: string[]
  email?: string[]
  role_id?: string[]
  password?: string[]
  password_confirmation?: string[]
  status?: string[]
}

export interface TaskErrors {
  title?: string[]
  description?: string[]
  status?: string[]
}

export type ErrorStrings<T> = {
  [key in keyof T]: string
}
