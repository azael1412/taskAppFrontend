import { Message } from '@/constants'
import { ResponseWithOutData } from '@/models'
import { me, updateProfile } from '@/services'
import { useAuthActions } from '@/hooks'
import { AppStore } from '@/store'

import { login } from '@/store/reducers/auth'
import { Auth as AuthState } from '@/store/models/auth'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import axios, { AxiosError } from 'axios'

const useMutateProfile = () => {
  const { handleLogout, handleMessage } = useAuthActions()
  const { user } = useSelector((state: AppStore) => state.auth)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      const resp = await me()
      const auth: AuthState = {
        user: resp.results,
        isAuthenticated: true,
      }
      dispatch(login(auth))

      if (user?.role.id === 1) {
        await queryClient.invalidateQueries({
          queryKey: ['users'],
          refetchType: 'active',
        })
      }

      // navigate({
      //   to: '/protected/users',
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
export default useMutateProfile
