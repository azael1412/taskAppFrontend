import { ResponseWithOutData } from '@/models'
import { forgotPassword } from '@/services'
import { useAuthActions } from '@/hooks'

import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import axios, { AxiosError } from 'axios'

export function useMutateForgotPassword() {
  const navigate = useNavigate()
  const { handleMessage } = useAuthActions()

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      handleMessage(
        'Se le enviará un correo para poder restablecer su contraseña',
        'info',
      )
      navigate({ to: '/', replace: true })
    },
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data?.message
        : 'Error desconocido'
      if (e.status === 406) {
        handleMessage(`¡La cuenta de correo proporcionada no existe!`, 'error')
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
