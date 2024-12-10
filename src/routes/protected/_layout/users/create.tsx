import { useEffect, useState } from 'react'

import { ExitDialog, FormLayout, FormSkeleton } from '@/components'
import { userCreateSchema, UserCreateFormData } from '@/validation'
import {
  ErrorStrings,
  Response,
  ResponseWithOutData,
  RouterContext,
  UserErrors,
} from '@/models'
import { useMutateUserCreate } from '@/hooks'
import { convertRegistrationErrorToStrings } from '@/utils'
import { rolesQueryOptions } from '@/services'

import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Grid2,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from '@mui/material'

import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AxiosError } from 'axios'
import { ArrowBack } from '@mui/icons-material'

export const Route = createFileRoute('/protected/_layout/users/create')({
  loader: ({ context }) => {
    const { queryClient } = context as RouterContext
    return queryClient.ensureQueryData(rolesQueryOptions())
  },
  component: Create,
  pendingComponent: FormSkeleton,
})

function Create() {
  // Estado para controlar la redirección después de guardar
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(userCreateSchema),
    mode: 'all',
  })
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { data } = useSuspenseQuery(rolesQueryOptions())
  const [serverError, setServerError] = useState<ErrorStrings<UserErrors>>()
  const { mutate, isPending } = useMutateUserCreate()
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
        to: '/protected/users',
        search: { currentPage: 1, search: '', perPage: 10 },
      })
    }
  }, [shouldRedirect, navigate, proceed])
  const onSubmit = (data: UserCreateFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset({
          name: '',
          email: '',
          role_id: 1,
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

  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mx={2}>
        {isFullWidth && (
          <IconButton
            aria-label="Regresar"
            onClick={() =>
              navigate({
                to: '/protected/users',
                search: { currentPage: 1, search: '', perPage: 10 },
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
        <FormLayout title="Registrar Usuario">
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
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }} alignItems="center">
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
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }} alignItems="center">
            <FormControl
              variant="outlined"
              error={!!errors.role_id}
              fullWidth
              margin="normal"
            >
              <InputLabel id="role-label">Rol*</InputLabel>
              <Controller
                name="role_id"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <Select labelId="role-label" label="Rol" fullWidth {...field}>
                    {data.results.map((m) => {
                      return (
                        <MenuItem key={`${m.id}`} value={m.id}>
                          {m.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                )}
              />
            </FormControl>
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
                      // fullWidth={isFullWidth}
                      onClick={() =>
                        navigate({
                          to: '/protected/users',
                          search: { currentPage: 1, search: '', perPage: 10 },
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
