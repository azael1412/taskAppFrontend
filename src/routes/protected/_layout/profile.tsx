import { useMutateProfile } from '@/hooks'
import {
  ErrorStrings,
  Response,
  ResponseWithOutData,
  UserErrors,
} from '@/models'
import { UpdateProfileFormData, updateProfileSchema } from '@/validation'

import {
  TextField,
  Button,
  Paper,
  Grid2,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'

import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ExitDialog, FormLayout } from '@/components'
import { useSelector } from 'react-redux'
import { AppStore } from '@/store'
import { convertRegistrationErrorToStrings } from '@/utils'
import { AxiosError } from 'axios'
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material'
export const Route = createFileRoute('/protected/_layout/profile')({
  component: Profile,
})

function Profile() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { user } = useSelector((state: AppStore) => state.auth)
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { mutate, isPending } = useMutateProfile()
  // Estado para controlar la redirección después de guardar
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
  const [serverError, setServerError] = useState<ErrorStrings<UserErrors>>()
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    mode: 'all',
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  })
  const {
    proceed,
    reset: resetBlocker,
    status,
  } = useBlocker({
    condition: isDirty,
  })
  // Reiniciar el estado de bloqueo después de guardar o redirigir
  useEffect(() => {
    if (shouldRedirect) {
      // Desbloquear y luego redirigir
      proceed()
      navigate({
        to: '/protected',
      })
    }
  }, [shouldRedirect, navigate, proceed])

  const onSubmit = (data: UpdateProfileFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        })

        // Marcar que estamos listos para redirigir
        setShouldRedirect(true)
      },
      onError: (e: AxiosError<ResponseWithOutData>) => {
        if (e.request.status === 422) {
          const serverErrorData = e.response?.data as Response<UserErrors>
          setServerError(
            convertRegistrationErrorToStrings(serverErrorData.results),
          )
        } else {
          console.error({ e })
        }
      },
    })
  }

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

  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mx={2}>
        {isFullWidth && (
          <IconButton
            aria-label="Regresar"
            onClick={() =>
              navigate({
                to: '/protected',
              })
            }
            edge="start"
          >
            <ArrowBack />{' '}
            <Typography variant="caption" component="span">
              Regresar
            </Typography>
          </IconButton>
        )}
        <FormLayout title="Actualizar Perfil">
          <Grid2 size={{ xs: 12, md: 'grow' }} alignItems="center">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Nombre*"
                  error={!!errors.name || !!serverError?.name}
                  helperText={errors.name?.message || serverError?.name}
                  fullWidth
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 'grow' }} alignItems="center">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Correo*"
                  error={!!errors.email || !!serverError?.email}
                  helperText={errors.email?.message || serverError?.email}
                  fullWidth
                  disabled
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 'grow' }} alignItems="center">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Contraseña*"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password || !!serverError?.password}
                  helperText={errors.password?.message || serverError?.password}
                  fullWidth
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
          </Grid2>

          <Grid2 size={{ xs: 12, md: 'grow' }} alignItems="center">
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Confirmar Contraseña*"
                  error={
                    !!errors.password_confirmation ||
                    !!serverError?.password_confirmation
                  }
                  helperText={
                    errors.password_confirmation?.message ||
                    serverError?.password_confirmation
                  }
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                />
              )}
            />
          </Grid2>

          <Grid2 container size={{ xs: 12 }} mt={1} alignItems="center">
            {isPending ? (
              <CircularProgress size={36} />
            ) : (
              <>
                {!isFullWidth && (
                  <Grid2 size={{ xs: 12, sm: 'auto' }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      size="small"
                      fullWidth={isFullWidth}
                      onClick={() =>
                        navigate({
                          to: '/protected',
                        })
                      }
                    >
                      Regresar
                    </Button>
                  </Grid2>
                )}

                <Grid2
                  size={{ xs: 12, sm: 'auto' }}
                  // sx={{ ml: { md: 2, lg:0 },/* mt: { xs: 2, md: 15 }*/ }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!isValid || isPending}
                    fullWidth={isFullWidth}
                  >
                    Guardar
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </FormLayout>
      </Box>
      <ExitDialog
        open={status === 'blocked'}
        onClose={resetBlocker}
        onExit={proceed}
      />
    </Paper>
  )
}
