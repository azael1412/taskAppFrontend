import { Message } from '@/constants'
import { ResponseWithOutData } from '@/models'
import { taskEdit } from '@/services'
import { useAuthActions } from '@/hooks'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

const useMutateTaskEdit = () => {
  const { handleLogout, handleMessage } = useAuthActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: taskEdit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks'],
        refetchType: 'active',
      })

      // navigate({
      //   to: '/protected/tasks',
      //   search: { currentPage: 1, search: '', perPage: 10 },
      // })
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
export default useMutateTaskEdit
