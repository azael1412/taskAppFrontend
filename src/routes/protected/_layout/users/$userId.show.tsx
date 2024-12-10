import { FormLayout } from '@/components'
import { RouterContext } from '@/models'
import { userByIdQueryOptions } from '@/services'
import { zeroFillNumber } from '@/utils'

import {
  Box,
  Paper,
  Grid2 as Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Chip,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/protected/_layout/users/$userId/show')({
  loader: ({ context, params }) => {
    const { userId } = params
    const { queryClient } = context as RouterContext
    return queryClient.ensureQueryData(userByIdQueryOptions(userId))
  },
  // pendingComponent: TableSkeleton,
  component: Show,
})

function Show() {
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { userId } = Route.useParams()
  const { data } = useSuspenseQuery(userByIdQueryOptions(userId))
  const user = data.results
  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
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
      <FormLayout
        title={'Información de ' + user.name}
        requiredFieldsMessage={false}
      >
        {/* Name */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              ID:
            </Typography>
            <Typography variant="body1">{zeroFillNumber(user.id)}</Typography>
          </Box>
        </Grid>
        {/* Name */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Nombre:
            </Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Box>
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Correo:
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>
        </Grid>

        {/* Email Verified At */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Correo Electrónico Verificado:
            </Typography>
            <Typography variant="body1">
              {user.email_verified_at ? 'Si' : 'No'}
            </Typography>
          </Box>
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Estado:
            </Typography>
            <Typography variant="body1">
              <Chip
                component="span"
                variant="outlined"
                color={user.email_verified_at ? 'success' : 'error'}
                label={user.email_verified_at ? 'Si' : 'No'}
              />
            </Typography>
          </Box>
        </Grid>

        {/* Role */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Rol:
            </Typography>
            <Typography variant="body1">{user.role.name}</Typography>
          </Box>
        </Grid>

        {/* Created At */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha de Creación:
            </Typography>
            <Typography variant="body1">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : 'N/A'}
            </Typography>
          </Box>
        </Grid>

        {/* Updated At */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha de Actualización:
            </Typography>
            <Typography variant="body1">
              {user.updated_at
                ? new Date(user.updated_at).toLocaleDateString()
                : 'N/A'}
            </Typography>
          </Box>
        </Grid>

        <Grid container size={{ xs: 12 }} mt={1} alignItems="center">
          {!isFullWidth && (
            <Grid size={{ xs: 12, sm: 'auto' }}>
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
            </Grid>
          )}

          <Grid
            size={{ xs: 12, sm: 'auto' }}
            // sx={{ ml: { md: 2, lg:0 },/* mt: { xs: 2, md: 15 }*/ }}
          >
            <Button
              type="button"
              variant="contained"
              color="warning"
              size="small"
              sx={{ color: 'white' }}
              fullWidth={isFullWidth}
              onClick={() =>
                navigate({
                  to: '/protected/users/$userId/edit',
                  params: { userId: user.id.toString() },
                })
              }
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </FormLayout>
    </Paper>
  )
}
