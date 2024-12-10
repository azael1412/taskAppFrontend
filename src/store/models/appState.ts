import { Ui } from './ui'
import { Auth } from './auth'
import { Snackbar } from './snackbar'

export interface AppStore {
  ui: Ui
  auth: Auth
  // sideMenu: SideMenuState
  // darkMode: DarkModeState
  snackbar: Snackbar
}
