import { Snackbar as SnackbarState  } from '..'
import { initialStateSnackbar as initialState } from '../states/snackbar'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'


const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<SnackbarState>) => {
        return { ...state, ...action.payload }
    },
    hideMessage: () => {
      return initialState
  }
  },
})

export const { showMessage, hideMessage } = snackbarSlice.actions
export default snackbarSlice.reducer