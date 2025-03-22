import { useEffect, useReducer } from 'react'

import { Head, TableSkeleton, TaskActionDialog } from '@/components'
import { useDebounce, useMutateTaskPDF } from '@/hooks'
import { RouterContext, SearchParam, Task, TaskWithoutUser } from '@/models'
import { tasksQueryOptions } from '@/services'
import { AppStore } from '@/store'
import { openBlobInNewTab, zeroFillNumber } from '@/utils'
import { taskIndexReducer, taskIndexStateInitialState, TaskIndexType } from '@/store'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  Grid2,
  useMediaQuery,
  useTheme,
  Chip,
  Tooltip,
} from '@mui/material'
import {
  Add,
  Clear,
  Edit,
  PictureAsPdf,
  ToggleOff,
  ToggleOn,
  Visibility,
} from '@mui/icons-material'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/protected/_layout/tasks/')({
  component: Tasks,
  validateSearch: (search: Record<string, unknown>): SearchParam => {
    return {
      currentPage: Number(search?.currentPage ?? 1),
      search: (search?.search as string) || '',
      perPage: Number(search?.perPage ?? 10),
    }
  },
  loader: ({ context, params }) => {
    const { currentPage = 1, search = '', perPage = 10 } = params as SearchParam
    const { queryClient } = context as RouterContext
    return queryClient.ensureQueryData(
      tasksQueryOptions({ currentPage, search, perPage }),
    )
  },
  pendingComponent: TableSkeleton,
})

function Tasks() {
  const { user } = useSelector((state: AppStore) => state.auth)
  const [state, dispatch] = useReducer(taskIndexReducer, taskIndexStateInitialState)
  const { open, task, searchText } = state
  const theme = useTheme()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { currentPage = 1, search = '', perPage = 10 } = Route.useSearch() // Agregar perPage desde la búsqueda// Agregar perPage desde la búsqueda
  const { data } = useSuspenseQuery(
    tasksQueryOptions({ currentPage, search, perPage }),
  )
  const { mutate } = useMutateTaskPDF()
  const navigate = useNavigate()

  //const [searchText, setSearchText] = useState<string>(search || '')
  // const [open, setOpen] = useState(false)
  // const [user, setUser] = useState<User | null>(null)
  // const [actionType, setActionType] = useState<
  //   'verifyEmail' | 'changeStatus' | 'resetPassword'
  // >('changeStatus')
  // Aplica debounce al valor del campo de búsqueda
  const debouncedSearchText = useDebounce(searchText, 500) // 500 ms de retraso

  // Actualiza la URL solo cuando el valor debounced cambie
  useEffect(() => {
    navigate({
      search: (old) =>
        ({
          ...old,
          search: debouncedSearchText || '', // Actualiza con el valor debounced
          currentPage: 1, // Reinicia la página al buscar
        }) as never,
    })
  }, [debouncedSearchText, navigate])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setSearchText(event.target.value)
    dispatch({ type: TaskIndexType.SET_SEARCH_TEXT, payload: event.target.value })
  }
  /*const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    // Actualiza la URL con el nuevo valor de búsqueda
    navigate({
      search: (old) =>
        ({
          ...old,
          search: event.target.value,
          currentPage: 1, // Reinicia la página al buscar algo nuevo
        }) as never,
    })
  }*/

  const handleChangePage = (_event: unknown, newPage: number) => {
    // Actualiza la URL cuando cambias de página
    navigate({
      search: (old) =>
        ({
          ...old,
          currentPage: newPage + 1, // newPage es 0-indexed, pero currentPage es 1-indexed
        }) as never,
    })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPerPage = parseInt(event.target.value, 10)
    // Actualiza la URL con el nuevo valor de perPage
    navigate({
      search: (old) =>
        ({
          ...old,
          perPage: newPerPage,
          currentPage: 1, // Reinicia la paginación cuando cambian las filas por página
        }) as never,
    })
  }

  const handleClearSearch = () => {
    //setSearchText('')
    dispatch({ type: TaskIndexType.SET_SEARCH_TEXT, payload: '' })
    navigate({
      search: (old) =>
        ({
          ...old,
          search: '', // Limpia el parámetro de búsqueda
          currentPage: 1, // Reinicia la página
        }) as never,
    })
  }

  const handleRegister = () => {
    // Navega a la página de registro
    navigate({ to: '/protected/tasks/create' })
  }

  const handleDialogOpen = () => {
    //setOpen(true)
    dispatch({ type: TaskIndexType.SET_OPEN, payload: true })
  }

  const handleDialogClose = () => {
    // setUser(null)
    // setActionType('changeStatus')
    // setOpen(false)
    dispatch({ type: TaskIndexType.SET_TASK, payload: null })
    //dispatch({ type: TaskIndexType.SET_ACTION_TYPE, payload: 'changeStatus' })
    dispatch({ type: TaskIndexType.SET_OPEN, payload: false })
  }

  const handleConfirm = () => {
    // setUser(null)
    // setActionType('changeStatus')
    dispatch({ type: TaskIndexType.SET_TASK, payload: null })
    //dispatch({ type: TaskIndexType.SET_ACTION_TYPE, payload: 'changeStatus' })
    handleDialogClose()
  }

  return (
    <Paper>
      <Head title="Tareas" />
      <Grid2 container spacing={2} marginBottom={2}>
        <Grid2 size={{ xs: 12, sm: 'grow' }} alignItems="center">
          <TextField
            label="Buscar"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            variant="outlined"
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    {searchText && (
                      <Tooltip title="Limpiar">
                        <IconButton
                          aria-label="Limpiar búsqueda"
                          onClick={handleClearSearch}
                        >
                          <Clear />
                        </IconButton>
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid2>
        {user?.role.id === 2 && (
          <Grid2
            size={{ xs: 12, sm: 'auto' }}
            display="flex"
            alignItems="center"
            my={{ xs: 2, md: 0 }}
          >
            <Tooltip title="Registrar Tarea">
              <Button
                variant="contained"
                fullWidth={isFullWidth}
                color="primary"
                startIcon={<Add />}
                onClick={handleRegister}
                // style={{ marginLeft: '1rem' }}
              >
                Registrar
              </Button>
            </Tooltip>
          </Grid2>
        )}
      </Grid2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titulo</TableCell>
              {user?.role.id === 1 && <TableCell>Hecho Por</TableCell>}
              <TableCell>Estado</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.data.length === 0 && (<TableRow><TableCell colSpan={user?.role.id === 1?5:4} align='center' size='medium'>No hay Datos</TableCell></TableRow>)}
            {data.results.data.map((task: Task | TaskWithoutUser) => (
              <TableRow key={`task-${task.id}`}>
                <TableCell>{zeroFillNumber(task.id)}</TableCell>
                <TableCell>{task.title}</TableCell>
                {user?.role.id === 1 && 'user' in task && (
                  <TableCell>{task.user.name}</TableCell>
                )}
                <TableCell>
                  <Chip
                    variant="outlined"
                    color={task.status === 1 ? 'success' : 'error'}
                    label={task.status === 1 ? 'Hecho' : 'Pendiente'}
                  />
                </TableCell>
                <TableCell>
                  {' '}
                  <Link
                    to="/protected/tasks/$taskId/show"
                    params={{ taskId: task.id.toString() }}
                  >
                    <Tooltip title={`Información de ${task.title}`}>
                      <IconButton
                        color="info"
                        aria-label="Informacion"
                        onClick={handleClearSearch}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  {user?.role.id === 2 && (
                    <Link
                      to="/protected/tasks/$taskId/edit"
                      params={{ taskId: task.id.toString() }}
                    >
                      <Tooltip title={`Editar a ${task.title}`}>
                        <IconButton
                          color="warning"
                          aria-label="Editar"
                          onClick={handleClearSearch}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  )}
                  {user?.role.id === 2 && (
                    <Tooltip
                      title={`${task.status === 1 ? 'Pendiente' : 'Hecho'}`}
                    >
                      <IconButton
                        color="warning"
                        aria-label="Cambiar Estado"
                        onClick={() => {
                          // setActionType('changeStatus')
                          // setUser(user)
                          // dispatch({
                          //   type: TaskIndexType.SET_ACTION_TYPE,
                          //   payload: 'changeStatus',
                          // })
                          dispatch({
                            type: TaskIndexType.SET_TASK,
                            payload: task as Task,
                          })
                          handleDialogOpen()
                        }}
                      >
                        {task.status === 1 ? (
                          <ToggleOff color="warning" />
                        ) : (
                          <ToggleOn color="success" />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={'Generar PDF'}>
                    <IconButton
                      color="error"
                      aria-label="Generar PDF"
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
                      <PictureAsPdf />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.results.paginate.last_page * perPage} // Usar perPage del query param
        page={currentPage - 1} // currentPage es 1-indexed
        onPageChange={handleChangePage}
        rowsPerPage={perPage} // Usar perPage del query param
        rowsPerPageOptions={[5, 10, 25, 50]} // Opciones dinámicas para cambiar perPage
        onRowsPerPageChange={handleChangeRowsPerPage} // Maneja el cambio de perPage
      />
      {task && (
        <TaskActionDialog
          open={open}
          onClose={handleDialogClose}
          onConfirm={handleConfirm}
          task={task as Task}
        />
      )}
    </Paper>
  )
}
