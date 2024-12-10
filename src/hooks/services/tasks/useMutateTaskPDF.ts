import { ResponseWithOutData } from '@/models'
import { taskPDF } from '@/services'
import { useAuthActions } from '@/hooks'

import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

const useMutateTaskPDF = () => {
  const { handleLogout, handleMessage } = useAuthActions()

  return useMutation({
    mutationFn: taskPDF,
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data?.message
        : 'Error desconocido'
      if (e.status === 404 || e.status === 401) {
        handleLogout(`Error: ${errorMessage}`, 'error')
        return
      }
      handleMessage(`Error: ${errorMessage}`, 'error')
    },
  })
}
export default useMutateTaskPDF
