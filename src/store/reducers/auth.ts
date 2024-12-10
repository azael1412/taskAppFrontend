import { initialStateAuth as initialState } from '../states/auth'
import { Auth as AuthState } from '../models/auth'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { isAuthenticated as checkAuthentication } from '@/utils';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload }
    },
    logout: () => {
      return initialState
    },
    // isLogged :() =>{
    //   const isAuthenticated : boolean = checkAuthentication()
    //   return {
    //     user:null,
    //     isAuthenticated
    //   }
    // }
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
