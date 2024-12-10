export interface TaskCreateFormInputs {
  title: string
  description: string
  status: number
}

export interface TaskEditFormInputs extends TaskCreateFormInputs {
  id: string
  _method: 'put'
}
