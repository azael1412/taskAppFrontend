import { Message } from '@/constants'
import { ResponseWithOutData } from '@/models'
import { ressetPasswordByUser } from '@/services'
import { useAuthActions } from '@/hooks'

import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export function useMutateResetPasswordByUser() {
  const { handleMessage } = useAuthActions()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ressetPasswordByUser,
    onSuccess: () => {
      handleMessage(Message.SAVEDATA, 'success')
      navigate({ to: '/', replace: true })
    },
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data?.message
        : 'Error desconocido'
      if (e.status === 406) {
        handleMessage(`¡El token es invalido!`, 'error')
        return
      }
      if (e.status === 403) {
        handleMessage(`¡El token ha caudcado!`, 'error')
        return
      }
      if (e.status !== 422) {
        handleMessage(`Error: ${errorMessage}`, 'error')
        return
      }
      handleMessage(`Error: ${errorMessage}`, 'error')
    },
  })
}
