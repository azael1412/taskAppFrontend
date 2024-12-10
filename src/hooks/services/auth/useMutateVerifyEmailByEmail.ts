import { Message } from '@/constants'
import { ResponseWithOutData } from '@/models'
import { verifyEmailByEmail } from '@/services'
import { useAuthActions } from '@/hooks'

import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import axios, { AxiosError } from 'axios'

export function useMutateVerifyEmailByEmail() {
  const { handleMessage } = useAuthActions()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: verifyEmailByEmail,
    onSuccess: () => {
      handleMessage(Message.SAVEDATA, 'success')
      navigate({ to: '/', replace: true })
    },
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data?.message
        : 'Error desconocido'
      if (e.status === 406) {
        handleMessage(`La cuenta de correo proporcionada no existe`, 'error')
        return
      }
      if (e.status === 403) {
        handleMessage(`La cuenta de correo ya ha sido activada`, 'error')
        return
      }
      handleMessage(`Error: ${errorMessage}`, 'error')
    },
  })
}
