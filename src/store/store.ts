// import appSliceReducer from './reducers/sideMenu'
// import authSliceReducer from './reducers/auth'
// import snackbarSliceReducer from './reducers/snackbar'
// import darkModeSliceReducer from './reducers/darkMode'

import { AppStore } from './models/appState'
import uiSlice from './reducers/ui'
import authSlice from './reducers/auth'
import snackbarSlice from './reducers/snackbar';

import { configureStore } from '@reduxjs/toolkit'


const store = configureStore<AppStore>({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    // sideMenu: appSliceReducer,
    // darkMode:darkModeSliceReducer
    // auth:authSliceReducer,
    snackbar: snackbarSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
