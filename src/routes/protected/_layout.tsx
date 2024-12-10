import { useEffect, useCallback, useState } from 'react'

import {
  AccessDenied,
  BreadcrumbsComponent,
  LayoutSkeleton,
} from '@/components'
import {
  DrawerHeader,
  Main,
  PersistentDrawer,
} from '@/components/PersistentDrawerLeft'

import { Message, Role, USER_EXPIRES_IN, USER_KEY } from '@/constants'
import { AppStore } from '@/store'
import { logout, login } from '@/store/reducers/auth'
import { Auth as AuthState } from '@/store/models/auth'
import { me, refreshToken } from '@/services'

import {
  canAccessRoute,
  getItemLocalStorage,
  isAuthenticated,
  removeItemLocalStorage,
  setItemLocalStorage,
} from '@/utils'

import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios, { AxiosError } from 'axios'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { showMessage } from '@/store/reducers/snackbar'

export const Route = createFileRoute('/protected/_layout')({
  beforeLoad: async () => {
    const isLogged = isAuthenticated()
    if (!isLogged) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: Layout,
  pendingComponent: LayoutSkeleton,
})

function Layout() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [loading, setLoading] = useState<boolean>(true)
  const open = useSelector((state: AppStore) => state.ui.isMenuOpen)
  const { isAuthenticated, user } = useSelector((state: AppStore) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  // Función para refrescar el token
  const refreshAuthToken = useCallback(async () => {
    const resp = await refreshToken()
    setItemLocalStorage(USER_KEY, resp.results.access_token)
    setItemLocalStorage(USER_EXPIRES_IN, resp.results.expires_in)
    const auth: AuthState = {
      user: resp.results.user,
      isAuthenticated: true,
    }
    dispatch(login(auth))
  }, [dispatch])

  // Función para verificar autenticación y token
  const checkAuthAndRefreshToken = useCallback(async () => {
    const token = getItemLocalStorage(USER_KEY)
    const expiresAt = getItemLocalStorage(USER_EXPIRES_IN)
    const currentDate = new Date()
    if (token && expiresAt) {
      try {
        const currentTokenDate = new Date(expiresAt)
        const timeRemaining = currentTokenDate.getTime() - currentDate.getTime()
        const minutesRemaining = timeRemaining / (1000 * 60)
        console.log({ minutesRemaining })
        if (minutesRemaining <= 0) {
          throw new Error('El token ha caducado.')
        } else if (minutesRemaining <= 5) {
          await refreshAuthToken()
          console.info('El token se esta refrescando')
        } else {
          //checar para cada que entre a una pagina no obtenga el usuario solo una vez is se requiere
          // Realiza petición para obtener la información del usuario
          if (!isAuthenticated && !user) {
            console.info('user not authenticated', { user, isAuthenticated })
            const resp = await me()
            const auth: AuthState = {
              user: resp.results,
              isAuthenticated: true,
            }
            dispatch(login(auth))
          }
        }
      } catch (error) {
        console.error(error)
        handleError(error)
        handleLogout()
      }
    }
  }, [dispatch, refreshAuthToken, location.pathname])

  // Manejo de errores unificado
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error('Error Axios:', axiosError.response || axiosError.message)
    } else {
      console.error('Error desconocido:', error)
    }
  }

  // Función de logout unificada
  const handleLogout = useCallback(() => {
    removeItemLocalStorage(USER_KEY)
    removeItemLocalStorage(USER_EXPIRES_IN)
    dispatch(logout())
    showMessage({
      message: Message.LOGOUT,
      type: 'error',
      isOpen: true,
      duration: 7000,
    })
  }, [dispatch])

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthAndRefreshToken()
      setLoading(false) // Cambia el estado de carga después de verificar
    }
    verifyAuth()
  }, [checkAuthAndRefreshToken])
  // useEffect(() => {
  //   checkAuthAndRefreshToken()
  // }, [checkAuthAndRefreshToken, location])
  // return <LoadingPage />
  if (loading) {
    return <LayoutSkeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const hasAccess = canAccessRoute(user?.role.name as Role, location.pathname) // Verificar si puede acceder

  //console.log(location)
  return hasAccess ? (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawer />
      <Main open={open} sx={{ overflowX: 'auto' }}>
        <DrawerHeader />
        <Box px={{ md: 3 }}>
          {open && fullScreen ? (
            <>...</>
          ) : (
            <>
              <BreadcrumbsComponent />
              <Outlet />
            </>
          )}
        </Box>
      </Main>
    </Box>
  ) : (
    <AccessDenied />
  )
}
