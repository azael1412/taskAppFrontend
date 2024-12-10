import { Message, USER_EXPIRES_IN, USER_KEY } from '@/constants'
import { setItemLocalStorage } from '@/utils'
import { Auth, Response, ResponseWithOutData } from '@/models'
import { signIn } from '@/services'
import { Auth as AuthState } from '@/store'
import { useAuthActions } from '@/hooks'

import { login } from '@/store/reducers/auth'

import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import axios, { AxiosError } from 'axios'

export function useMutateSignIn() {
  const { handleMessage } = useAuthActions()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Función común para guardar datos de sesión
  const handleSessionStorage = (data: Response<Auth>) => {
    setItemLocalStorage(USER_KEY, data.results.access_token)
    setItemLocalStorage(USER_EXPIRES_IN, data.results.expires_in)
    const auth: AuthState = {
      user: data.results.user,
      isAuthenticated: true,
    }
    dispatch(login(auth))
  }

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      handleSessionStorage(data)
      handleMessage(Message.SIGNIN, 'success')
      navigate({ to: '/protected' })
    },
    onError: (e: AxiosError<ResponseWithOutData>) => {
      console.log('Error', e)
      if (e.status === 401) {
        handleMessage(Message.CREDENTIALERROR, 'error')
        return
      }
      if (e.status === 403) {
        handleMessage(Message.FORBIDDEN, 'error')
        return
      }
      const errorMessage = axios.isAxiosError(e)
        ?  e.response?.data?.message
        : 'Error desconocido'
      handleMessage(`Error: ${errorMessage}`, 'error')
    },
  })
}
