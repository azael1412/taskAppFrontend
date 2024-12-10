import { Message } from '@/constants'
import { ResponseWithOutData } from '@/models'
import { taskChangeStatus } from '@/services'
import { useAuthActions } from '@/hooks'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'

const useMutateTaskChangeStatus = () => {
  const { handleLogout, handleMessage } = useAuthActions()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: taskChangeStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks'],
        refetchType: 'active',
      })

      navigate({
        to: '/protected/tasks',
        search: { currentPage: 1, search: '', perPage: 10 },
      })
      handleMessage(Message.SAVEDATA, 'success')
    },
    onError: (e: AxiosError<ResponseWithOutData>) => {
      const errorMessage = axios.isAxiosError(e)
        ? e.response?.data?.message
        : 'Error desconocido'
        if (e.status === 404 || e.status === 401) {
          handleLogout(`Error: ${errorMessage}`, 'error')
          return 
        }
      if (e.status !== 422) {
        handleMessage(`Error: ${errorMessage}`, 'error')
      }
  
    },
  })
}
export default useMutateTaskChangeStatus
