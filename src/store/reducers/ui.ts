import { initialStateUi as initialState } from '../states/ui'

import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    toggleDarkMode: (state) => {
      localStorage.setItem('isDark', `${!state.isDark}`)
      state.isDark = !state.isDark
    },
  },
})

export const { toggleSideMenu, toggleDarkMode } =
  uiSlice.actions
export default uiSlice.reducer
