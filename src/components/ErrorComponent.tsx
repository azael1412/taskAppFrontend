import { useEffect, useState } from 'react'
import { AppStore } from '@/store'
import { ResponseWithOutData } from '@/models'

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ArrowBack, Refresh } from '@mui/icons-material'

import { AxiosError } from 'axios'

import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import {
  Link,
  Navigate,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'

import { useSelector } from 'react-redux'

const ErrorComponent = ({ error: err }: ErrorComponentProps) => {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: AppStore) => state.auth)
  const [axiosError, setAxiosError] = useState<ResponseWithOutData | null>(null)
  const queryErrorResetBoundary = useQueryErrorResetBoundary()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  useEffect(() => {
    queryErrorResetBoundary.reset()

    if (err instanceof AxiosError) {
      const errorData = err.response?.data as ResponseWithOutData
      setAxiosError(errorData)
    }
  }, [err, queryErrorResetBoundary])

  // Redirigir en caso de errores específicos
  if (axiosError?.code === 403 || axiosError?.code === 404) {
    return <Navigate to={isAuthenticated ? '/protected' : '/'} />
  }

  const renderButton = () => {
    if (isAuthenticated) {
      if (axiosError?.code === 500 || axiosError?.code === 406) {
        return (
          <Link to="/protected" replace>
            <Button color="primary" size="large" startIcon={<ArrowBack />}>
              Regresar
            </Button>
          </Link>
        )
      }

      return (
        <Button
          color="primary"
          size="large"
          startIcon={<Refresh />}
          onClick={() => router.invalidate()}
        >
          Reintentar
        </Button>
      )
    }

    return (
      <Link to="/" replace>
        <Button color="primary" size="large" startIcon={<ArrowBack />}>
          Regresar
        </Button>
      </Link>
    )
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Typography
        component="h1"
        color="red"
        variant={isSmall ? 'h3' : isMedium ? 'h2' : 'h1'}
        fontWeight={400}
      >
        Error:
      </Typography> */}
      <Typography
        component="h1"
        sx={{ textWrap: 'balance' }}
        variant={isSmall ? 'h4' : isMedium ? 'h3' : 'h2'}
        fontWeight={400}
      >
        {axiosError?.code || '500'} -{' '}
        {axiosError?.message || 'Error en el Cliente'}
      </Typography>
      {renderButton()}
    </Box>
  )
}

export default ErrorComponent
