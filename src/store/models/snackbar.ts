import { AlertColor } from '@mui/material'

export interface Snackbar {
  isOpen: boolean
  message: string
  duration: number
  type: AlertColor
}
