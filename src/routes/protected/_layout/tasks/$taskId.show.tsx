import { RouterContext } from '@/models'
import { taskByIdQueryOptions } from '@/services'
import { FormLayout } from '@/components'
import { openBlobInNewTab, zeroFillNumber } from '@/utils'

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

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { AppStore } from '@/store'
import { useMutateTaskPDF } from '@/hooks'

export const Route = createFileRoute('/protected/_layout/tasks/$taskId/show')({
  loader: ({ context, params }) => {
    const { taskId } = params
    const { queryClient } = context as RouterContext
    return queryClient.ensureQueryData(taskByIdQueryOptions(taskId))
  },
  component: Show,
})

function Show() {
  const { mutate } = useMutateTaskPDF()
  const { user } = useSelector((state: AppStore) => state.auth)
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { taskId } = Route.useParams()
  const { data } = useSuspenseQuery(taskByIdQueryOptions(taskId))
  const task = data.results

  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      {isFullWidth && (
        <IconButton
          aria-label="Regresar"
          onClick={() =>
            navigate({
              to: '/protected/tasks',
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
        title={'Información de ' + task.title}
        requiredFieldsMessage={false}
      >
        <Grid size={{ xs: 12, sm: user?.role.id === 1 ? 4 : 6 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              ID:
            </Typography>
            <Typography variant="body1">{zeroFillNumber(task.id)}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: user?.role.id === 1 ? 4 : 6 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Titulo:
            </Typography>
            <Typography variant="body1" sx={{ textWrap: 'balance' }}>
              {task.title}
            </Typography>
          </Box>
        </Grid>
        {/* Verificación del campo user */}
        {user?.role.id === 1 && 'user' in task && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Hecho Por:
              </Typography>
              <Typography variant="body1" sx={{ textWrap: 'balance' }}>
                {task.user.name}
              </Typography>
            </Box>
          </Grid>
        )}
        {/* Status */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Estado:
            </Typography>
            <Typography variant="body1">
              <Chip
                component="span"
                variant="outlined"
                color={task.status === 1 ? 'success' : 'error'}
                label={task.status === 1 ? 'Hecho' : 'Pendiente'}
              />
            </Typography>
          </Box>
        </Grid>

        {/* Created At */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha de Creación:
            </Typography>
            <Typography variant="body1">
              {task.created_at
                ? new Date(task.created_at).toLocaleDateString()
                : 'N/A'}
            </Typography>
          </Box>
        </Grid>

        {/* Updated At */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha de Actualización:
            </Typography>
            <Typography variant="body1">
              {task.updated_at
                ? new Date(task.updated_at).toLocaleDateString()
                : 'N/A'}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción:
            </Typography>
            <Box
              component="div"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
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
                    to: '/protected/tasks',
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
              color="info"
              size="small"
              sx={{ color: 'white' }}
              fullWidth={isFullWidth}
              onClick={() => {
                mutate(task.id.toString(), {
                  onSuccess(data) {
                    try {
                      openBlobInNewTab(data)
                    } catch (error) {
                      console.error('Error al descargar el PDF', error)
                    }
                  },
                })
              }}
            >
              Descargar PDF
            </Button>
          </Grid>

          {user?.role.id === 2 && (
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
                    to: '/protected/tasks/$taskId/edit',
                    params: { taskId: task.id.toString() },
                  })
                }
              >
                Editar
              </Button>
            </Grid>
          )}
        </Grid>
      </FormLayout>
    </Paper>
  )
}
