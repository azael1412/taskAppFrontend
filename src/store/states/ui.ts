import { Ui } from '../models'

export const initialStateUi: Ui = {
  isMenuOpen: false,
  isDark: localStorage.getItem('isDark') === 'true',
  snackbar: {
    isOpen: false,
    message: '',
    duration: 0,
    type: 'success',
  },
}
