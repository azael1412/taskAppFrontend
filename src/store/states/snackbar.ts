import { Snackbar } from '../models'

// Estado inicial
export const initialStateSnackbar: Snackbar = {
  isOpen: false,
  message: '',
  duration: 0,
  type: 'success',
}
