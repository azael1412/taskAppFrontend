import { useState } from 'react'

import { Head, LogoWithTitle, RequiredFieldsMessage } from '@/components'
import { useMutateResetPasswordByUser } from '@/hooks'
import { ErrorStrings, PasswordErrors, Response } from '@/models'
import { convertRegistrationErrorToStrings } from '@/utils'
import { ResetPasswordFormData, resetPasswordschema } from '@/validation'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const Route = createFileRoute('/(auth)/_authlayout/reset-password')({
  validateSearch: (search: Record<string, unknown>): { token: string } => {
    // validate and parse the search params into a typed state
    return {
      token: (search.token as string) || '',
    }
  },
  component: ResetPassword,
})
function ResetPassword() {
  const title = 'Restablecer contraseña'
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { token = '' } = Route.useSearch()
  const { mutate, isPending } = useMutateResetPasswordByUser()
  const [serverError, setServerError] = useState<ErrorStrings<PasswordErrors>>()

  const {
    handleSubmit,
    control,
    formState: { errors },
    formState,
  } = useForm({
    resolver: yupResolver(resetPasswordschema),
    mode: 'onChange',
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

  const onSubmit = (data: ResetPasswordFormData) => {
    mutate(
      { ...data, token },
      {
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            const axiosError = e as AxiosError
            if (axiosError.request.status === 422) {
              const serverErrorData = axiosError.response
                ?.data as Response<PasswordErrors>
              setServerError(
                convertRegistrationErrorToStrings(serverErrorData.results),
              )
            } else {
              console.log({ e })
            }
          }
        },
      },
    )
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Head title={title} />
          <LogoWithTitle title={title} />
          <RequiredFieldsMessage />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
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
                      error={!!errors.password || !!serverError?.password}
                      helperText={
                        errors.password?.message || serverError?.password
                      }
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
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
                  name="password_confirmation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirmar contraseña*"
                      type="text"
                      error={
                        !!errors.password_confirmation ||
                        !!serverError?.password_confirmation
                      }
                      helperText={
                        errors.password_confirmation?.message ||
                        serverError?.password_confirmation
                      }
                      fullWidth
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
                  {isPending ? <CircularProgress size={36} /> : 'Recuperar'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
