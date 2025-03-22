import { useEffect, useReducer } from 'react'
import { RouterContext, SearchParam, User } from '@/models'
import { usersQueryOptions } from '@/services'
import { useDebounce } from '@/hooks'
import { UserActionDialog, Head, TableSkeleton } from '@/components'
import { zeroFillNumber } from '@/utils'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
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
  Password,
  ToggleOff,
  ToggleOn,
  Verified,
  Visibility,
} from '@mui/icons-material'

export interface State {
  searchText: string
  open: boolean
  user: User | null
  actionType: 'verifyEmail' | 'changeStatus' | 'resetPassword'
}
const enum Type {
  SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
  SET_OPEN = 'SET_OPEN',
  SET_USER = 'SET_USER',
  SET_ACTION_TYPE = 'SET_ACTION_TYPE',
}
type Action =
  | { type: Type.SET_SEARCH_TEXT; payload: string }
  | { type: Type.SET_OPEN; payload: boolean }
  | { type: Type.SET_USER; payload: User | null }
  | {
      type: Type.SET_ACTION_TYPE
      payload: 'verifyEmail' | 'changeStatus' | 'resetPassword'
    }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Type.SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload }
    case Type.SET_OPEN:
      return { ...state, open: action.payload }
    case Type.SET_USER:
      return { ...state, user: action.payload }
    case Type.SET_ACTION_TYPE:
      return { ...state, actionType: action.payload }
    default:
      return state
  }
}

const initialState: State = {
  searchText: '',
  open: false,
  user: null,
  actionType: 'changeStatus',
}
export const Route = createFileRoute('/protected/_layout/users/')({
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
      usersQueryOptions({ currentPage, search, perPage }),
    )
  },
  component: Users,
  pendingComponent: TableSkeleton,
})

function Users() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { actionType, open, user, searchText } = state
  const theme = useTheme()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { currentPage = 1, search = '', perPage = 10 } = Route.useSearch() // Agregar perPage desde la búsqueda// Agregar perPage desde la búsqueda
  const { data } = useSuspenseQuery(
    usersQueryOptions({ currentPage, search, perPage }),
  )
  const navigate = useNavigate()

  // const [searchText, setSearchText] = useState<string>(search || '')
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
    dispatch({ type: Type.SET_SEARCH_TEXT, payload: event.target.value })
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
    dispatch({ type: Type.SET_SEARCH_TEXT, payload: '' })
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
    navigate({ to: '/protected/users/create' })
  }

  const handleDialogOpen = () => {
    //setOpen(true)
    dispatch({ type: Type.SET_OPEN, payload: true })
  }

  const handleDialogClose = () => {
    // setUser(null)
    // setActionType('changeStatus')
    // setOpen(false)
    dispatch({ type: Type.SET_USER, payload: null })
    dispatch({ type: Type.SET_ACTION_TYPE, payload: 'changeStatus' })
    dispatch({ type: Type.SET_OPEN, payload: false })
  }

  const handleConfirm = () => {
    // setUser(null)
    // setActionType('changeStatus')
    dispatch({ type: Type.SET_USER, payload: null })
    dispatch({ type: Type.SET_ACTION_TYPE, payload: 'changeStatus' })
    handleDialogClose()
  }

  return (
    <Paper>
      <Head title="Usuarios" />
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
        <Grid2
          size={{ xs: 12, sm: 'auto' }}
          display="flex"
          alignItems="center"
          my={{ xs: 2, md: 0 }}
        >
          <Tooltip title="Registrar Usuario">
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
      </Grid2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Verificado</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.data.length === 0 && (<TableRow><TableCell colSpan={7} align='center' size='medium'>No hay Datos</TableCell></TableRow>)}
            {data.results.data.map((user: User) => (
              <TableRow key={`user-${user.id}`}>
                <TableCell>{zeroFillNumber(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    variant="outlined"
                    color={user.email_verified_at ? 'success' : 'error'}
                    label={user.email_verified_at ? 'Si' : 'No'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    variant="outlined"
                    color={user.status === 1 ? 'success' : 'error'}
                    label={user.status === 1 ? 'Activo' : 'Inactivo'}
                  />
                </TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  {' '}
                  <Link
                    to="/protected/users/$userId/show"
                    params={{ userId: user.id.toString() }}
                  >
                    <Tooltip title={`Información de ${user.name}`}>
                      <IconButton
                        color="info"
                        aria-label="Informacion"
                        onClick={handleClearSearch}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Link
                    to="/protected/users/$userId/edit"
                    params={{ userId: user.id.toString() }}
                  >
                    <Tooltip title={`Editar a ${user.name}`}>
                      <IconButton
                        color="warning"
                        aria-label="Editar"
                        onClick={handleClearSearch}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip
                    title={`${user.status === 1 ? 'Desativar' : 'Activar'}`}
                  >
                    <IconButton
                      color="warning"
                      aria-label="Cambiar Estado"
                      onClick={() => {
                        // setActionType('changeStatus')
                        // setUser(user)
                        dispatch({
                          type: Type.SET_ACTION_TYPE,
                          payload: 'changeStatus',
                        })
                        dispatch({ type: Type.SET_USER, payload: user })
                        handleDialogOpen()
                      }}
                    >
                      {user.status === 1 ? (
                        <ToggleOff color="warning" />
                      ) : (
                        <ToggleOn color="success" />
                      )}
                    </IconButton>
                  </Tooltip>
                  {!user.email_verified_at && user.status === 1 && (
                    <Tooltip title="Verificar Cuenta de Correo">
                      <IconButton
                        color="info"
                        aria-label="Verificar Cuenta de Correo"
                        onClick={() => {
                          // setActionType('verifyEmail')
                          // setUser(user)
                          dispatch({
                            type: Type.SET_ACTION_TYPE,
                            payload: 'verifyEmail',
                          })
                          dispatch({ type: Type.SET_USER, payload: user })
                          handleDialogOpen()
                        }}
                      >
                        <Verified />
                      </IconButton>
                    </Tooltip>
                  )}
                  {user.email_verified_at && user.status === 1 && (
                    <Tooltip title="Restablecer Contraseña">
                      <IconButton
                        color="warning"
                        aria-label="Restablecer Contraseña"
                        onClick={() => {
                          // setActionType('resetPassword')
                          // setUser(user)
                          dispatch({
                            type: Type.SET_ACTION_TYPE,
                            payload: 'resetPassword',
                          })
                          dispatch({ type: Type.SET_USER, payload: user })
                          handleDialogOpen()
                        }}
                      >
                        <Password />
                      </IconButton>
                    </Tooltip>
                  )}
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
      {user && (
        <UserActionDialog
          open={open}
          onClose={handleDialogClose}
          onConfirm={handleConfirm}
          user={user}
          actionType={actionType}
        />
      )}
    </Paper>
  )
}
