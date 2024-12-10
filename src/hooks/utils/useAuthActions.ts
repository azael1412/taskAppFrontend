import { USER_EXPIRES_IN, USER_KEY } from '@/constants'
import { showMessage } from '@/store/reducers/snackbar'
import { logout } from '@/store/reducers/auth'
import { removeItemLocalStorage } from '@/utils'

import { useNavigate } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

type MessageType = 'success' | 'error' | 'info'

export const useAuthActions = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (message: string, messageType: MessageType) => {
    removeItemLocalStorage(USER_KEY)
    removeItemLocalStorage(USER_EXPIRES_IN)
    dispatch(logout())
    queryClient.invalidateQueries() // Invalida todas las queries
    handleMessage(message, messageType)
    navigate({ to: '/', replace: true })
  }

  const handleMessage = (message: string, messageType: MessageType) => {
    dispatch(
      showMessage({
        message,
        type: messageType,
        isOpen: true,
        duration: 8000,
      }),
    )
  }

  return { handleLogout, handleMessage }
}
