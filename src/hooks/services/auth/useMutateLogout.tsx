import { Message } from '@/constants'
import { logout } from '@/services'
import { ResponseWithOutData } from '@/models'
import { useAuthActions } from '@/hooks'

import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export const useMutateLogout = () => {
  const { handleLogout } = useAuthActions()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => handleLogout(Message.LOGOUT, 'success'),
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data.message
        : 'Error desconocido'
      handleLogout(`Error: ${errorMessage}`, 'error')
    },
  })
}
