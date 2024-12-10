import { useState } from 'react'

import { Head, LogoWithTitle, RequiredFieldsMessage } from '@/components'
import { useMutateForgotPassword } from '@/hooks'
import { ErrorStrings, PasswordErrors, Response } from '@/models'
import { convertRegistrationErrorToStrings } from '@/utils'
import { ForgotPasswordFormData, forgotPasswordschema } from '@/validation'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  TextField,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'

export const Route = createFileRoute('/(auth)/_authlayout/forgot-password')({
  component: ForgotPassword,
})
function ForgotPassword() {
  const title = 'Olvido Su Contraseña'

  const { mutate, isPending } = useMutateForgotPassword()
  const [serverError, setServerError] = useState<ErrorStrings<PasswordErrors>>()

  const {
    handleSubmit,
    control,
    formState: { errors },
    formState,
  } = useForm({
    resolver: yupResolver(forgotPasswordschema),
    mode: 'onChange',
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    const { email } = data
    mutate(email, {
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
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Correo electrónico*"
                      error={!!errors.email || !!serverError?.email}
                      helperText={errors.email?.message || serverError?.email}
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
