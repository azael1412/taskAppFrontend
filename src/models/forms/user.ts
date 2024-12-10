export interface UserCreateFormInputs {
  name: string
  email: string
  role_id: number
}

export interface UserEditFormInputs extends UserCreateFormInputs {
  id: string
  status: number
  _method: 'put'
}
