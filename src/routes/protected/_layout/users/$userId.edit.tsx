import { useEffect, useState } from 'react'

import { ExitDialog, FormLayout, FormSkeleton } from '@/components'
import { userEditSchema, UserEditFormData } from '@/validation'
import {
  ErrorStrings,
  Response,
  ResponseWithOutData,
  RouterContext,
  UserErrors,
} from '@/models'
import { useMutateUserEdit } from '@/hooks'
import { convertRegistrationErrorToStrings } from '@/utils'
import { rolesQueryOptions, userByIdQueryOptions } from '@/services'

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
  FormHelperText,
  IconButton,
  Typography
} from '@mui/material'

import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from '@tanstack/react-router'
import { ArrowBack } from '@mui/icons-material'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSuspenseQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/protected/_layout/users/$userId/edit')({
  loader: async ({ context, params: { userId } }) => {
    const { queryClient } = context as RouterContext
    const roles = queryClient.ensureQueryData(rolesQueryOptions())
    const user = queryClient.ensureQueryData(userByIdQueryOptions(userId))
    const [myData1, myData2] = await Promise.all([roles, user])
    return { myData1, myData2 }
  },
  component: Edit,
  pendingComponent: FormSkeleton,
})

function Edit() {
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const rolesData = useSuspenseQuery(rolesQueryOptions())
  const roles = rolesData.data.results
  const [serverError, setServerError] = useState<ErrorStrings<UserErrors>>()
  const { mutate, isPending } = useMutateUserEdit()
  const userId = Route.useParams().userId
  const { data } = useSuspenseQuery(userByIdQueryOptions(userId))
  const user = data.results
  // Estado para controlar la redirección después de guardar
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(userEditSchema),
    mode: 'all',
    defaultValues: {
      email: user.email,
      name: user.name,
      role_id: user.role.id,
      status: user.status,
    },
  })
  const {
    proceed,
    reset: resetBlocker,
    status,
  } = useBlocker({
    shouldBlockFn: () => isDirty,
    enableBeforeUnload: false,
    withResolver: true,
  })

  // Reiniciar el estado de bloqueo después de guardar o redirigir
  useEffect(() => {
    if (shouldRedirect) {
      // Desbloquear y luego redirigir
      if (proceed) {
        proceed()
      }
      navigate({
        to: '/protected/users',
        search: { currentPage: 1, search: '', perPage: 10 },
      })
    }
  }, [shouldRedirect, navigate, proceed])
  const onSubmit = (data: UserEditFormData) => {
    mutate(
      { ...data, id: userId, _method: 'put' },
      {
        onSuccess: () => {
          reset({
            name: '',
            email: '',
            role_id: 1,
            status: 0,
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
      },
    )
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
        <FormLayout title="Editar Usuario">
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }} alignItems="center">
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
              error={!!errors.role_id || !!serverError?.role_id}
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
                    {roles.map((m) => {
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
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }} alignItems="center">
            <FormControl
              variant="outlined"
              error={!!errors.status || !!serverError?.status}
              fullWidth
              margin="normal"
            >
              <InputLabel id="status-label">Estado*</InputLabel>
              <Controller
                name="status"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    labelId="status-label"
                    label="Estado*"
                    fullWidth
                    {...field}
                  >
                    <MenuItem value={0}>Inactivo</MenuItem>
                    <MenuItem value={1}>Activo</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {(errors.status || serverError?.status) && (
              <FormHelperText error={!!errors.status} color="danger">
                {errors.status?.message || serverError?.status}
              </FormHelperText>
            )}
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
        onClose={resetBlocker || (() => { })}
        onExit={proceed || (() => { })}
      />
    </Paper>
  )
}
