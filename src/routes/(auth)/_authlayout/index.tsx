import { useEffect, useState } from 'react'

import { LogoWithTitle } from '@/components/LogoWithTitle'
import Head from '@/components/Head'

import { logout } from '@/store/reducers/auth'
import { LoginFormData, loginSchema } from '@/validation'
import { BRAND_NAME, USER_EXPIRES_IN, USER_KEY } from '@/constants'
import { useMutateSignIn } from '@/hooks'
import {
  getItemLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from '@/utils'

import {
  TextField,
  Checkbox,
  Button,
  Grid2 as Grid,
  FormControlLabel,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { RequiredFieldsMessage } from '@/components'

export const Route = createFileRoute('/(auth)/_authlayout/')({
  component: SignIn,
})

function SignIn() {
  const queryClient = useQueryClient()
  const { mutate, isPending /*, isError, error*/ } = useMutateSignIn()
  const [email] = useState<boolean>(!!getItemLocalStorage('email'))
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const title: string = 'Iniciar Sesion'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
    formState,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (email) {
      reset({
        email: getItemLocalStorage('email') || '',
        password: '',
        remember: true,
      })
    }
  }, [reset, email])

  useEffect(() => {
    const token = getItemLocalStorage(USER_KEY)
    if (token) {
      removeItemLocalStorage(USER_KEY)
      removeItemLocalStorage(USER_EXPIRES_IN)
      dispatch(logout())
      queryClient.invalidateQueries() // Invalida todas las queries
      navigate({ to: '/', replace: true })
    }
  }, [navigate, dispatch, queryClient])

  const onSubmit = (data: LoginFormData) => {
    //console.log(data)
    mutate(data, {
      onSuccess: () => {
        if (data.remember) {
          setItemLocalStorage('email', data.email)
        } else {
          removeItemLocalStorage('email')
        }
      },
    })
  }
  return (
    <Box
      sx={{
        height: '100vh', // Ocupa toda la altura de la pantalla
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
      }}
    >
      <Head title={title} description={`Inicio de sesión en ${BRAND_NAME}`} />
      <LogoWithTitle title={title} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Box mb={3}>
              <RequiredFieldsMessage />
            </Box>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo electrónico*"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  slotProps={{
                    htmlInput: {
                      maxLength: 80,
                    },
                  }}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña*"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  // inputProps={{
                  //   maxLength: 16,
                  // }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 16,
                    },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="cambiar la visibilidad de la contraseña"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Recordar sesión"
                  control={
                    <Checkbox
                      {...field}
                      {...(email && { defaultChecked: true })}
                      defaultChecked={email ?? false}
                    />
                  }
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!formState.isValid || isPending}
            >
              {isPending ? <CircularProgress size={36} /> : 'Iniciar sesión'}
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Link
              to="/forgot-password"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <Link to={`/${PublicRoutes.AUTH}/${PublicRoutes.SIGNUP}?email=${emailRef}`}>
                ¿No tienes una cuenta?
              </Link>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  )
}
