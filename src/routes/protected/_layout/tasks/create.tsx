import { useEffect, useReducer, useState } from 'react'

import { taskCreateOrEditInitialState, taskCreateOrEditReducer, TaskCreateOrEditType } from '@/store'
import { ExitDialog, FormLayout, FormSkeleton } from '@/components'
import { taskSchema, TaskFormData } from '@/validation'
import {
  ErrorStrings,
  Response,
  ResponseWithOutData,
  TaskErrors,
} from '@/models'
import { useMutateTaskCreate } from '@/hooks'
import { convertRegistrationErrorToStrings } from '@/utils'

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
  FormHelperText,
  Tooltip,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'

import { CKEditor,} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const Route = createFileRoute('/protected/_layout/tasks/create')({
  component: Create,
  pendingComponent: FormSkeleton,
})

function Create() {
  const [state, dispatch] = useReducer(taskCreateOrEditReducer, taskCreateOrEditInitialState)
  const { hasValue, isFocused, shouldRedirect } = state
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(taskSchema),
    mode: 'all',
  })
  const theme = useTheme()
  const navigate = useNavigate()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const [serverError, setServerError] = useState<ErrorStrings<TaskErrors>>()
  const { mutate, isPending } = useMutateTaskCreate()
  const {
    proceed,
    reset: resetBlocker,
    status,
  } = useBlocker({
    shouldBlockFn: () => isDirty,
    enableBeforeUnload: false,
    withResolver: true,
  })

  const setShouldRedirect = (value: boolean) => {
    dispatch({ type: TaskCreateOrEditType.SET_SHOULD_REDIRECT, payload: value })
  }

  const setIsFocused = (value: boolean) => {
    dispatch({ type: TaskCreateOrEditType.SET_IS_FOCUSED, payload: value })
  }

  const setHasValue = (value: boolean) => {
    dispatch({ type: TaskCreateOrEditType.SET_HAS_VALUE, payload: value })
  }
  // Obtiene el valor actual del campo de descripción
  // const descriptionValue = watch('description', '')

  // Reiniciar el estado de bloqueo después de guardar o redirigir
  useEffect(() => {
    if (shouldRedirect) {
      // Desbloquear y luego redirigir
      if(proceed){
        proceed()
      }
      navigate({
        to: '/protected/tasks',
        search: { currentPage: 1, search: '', perPage: 10 },
      })
    }
  }, [shouldRedirect, navigate, proceed])
  const onSubmit = (data: TaskFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset({
          title: '',
          description: '',
          status: 0,
        })

        // Marcar que estamos listos para redirigir
        setShouldRedirect(true)
      },
      onError: (e: AxiosError<ResponseWithOutData>) => {
        if (e.request.status === 422) {
          const serverErrorData = e.response?.data as Response<TaskErrors>
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
        <FormLayout title="Registrar Tarea">
          <Grid2 size={{ xs: 12, sm: 6 }} alignItems="center">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Titulo*"
                  error={!!errors.title || !!serverError?.title}
                  helperText={errors.title?.message || serverError?.title}
                  fullWidth
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} alignItems="center">
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
                    <MenuItem value={0}>Pendiente</MenuItem>
                    <MenuItem value={1}>Hecho</MenuItem>
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
          {/* <Grid2 size={{ xs: 12 }} alignItems="center">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Descripcion*"
                  error={!!errors.description || !!serverError?.description}
                  helperText={
                    errors.description?.message || serverError?.description
                  }
                  fullWidth
                  multiline
                  rows={6}
                />
              )}
            />
          </Grid2> */}

          <Grid2 size={{ xs: 12 }} alignItems="center">
            <Box sx={{ position: 'relative', marginBottom: '16px' }}>
              <InputLabel
                sx={{
                  position: 'absolute',
                  left: '12px',
                  top: 0, // Ajusta la posición según el foco o si hay valor
                  fontSize: isFocused || hasValue ? '12px' : '16px',
                  color: errors.description
                    ? '#db3700'
                    : theme.palette.text.primary,
                  transition: 'all 0.2s ease-in-out',
                  pointerEvents: 'none',
                }}
              >
                Descripción*
              </InputLabel>
              <Controller
                name="description"
                control={control}
                defaultValue="" // Ajusta según el valor predeterminado
                render={({ field: { onChange, value } }) => {
                  return (
                    <Box
                      sx={{
                        borderRadius: 1,
                        border: `1px solid ${errors.description ? '#db3700' : '#ccc'}`,
                        padding: '20px 12px 12px 12px',
                        backgroundColor:
                          theme.palette.mode === 'dark' ? '#333' : '#fff',
                        '&:hover': {
                          borderColor: errors.description
                            ? '#db3700'
                            : theme.palette.primary.main,
                        },
                        '&:focus-within': {
                          borderColor: errors.description
                            ? '#db3700'
                            : theme.palette.primary.main,
                        },
                        '& .ck.ck-editor__main>.ck-editor__editable': {
                          backgroundColor:
                            theme.palette.mode === 'dark' ? '#222' : '#fff',
                          color:
                            theme.palette.mode === 'dark' ? '#fff' : '#000',
                          minHeight: '150px',
                          padding: '12px',
                        },
                      }}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        config={{
                          licenseKey: 'GPL',
                          toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            //'link',
                            'bulletedList',
                            'numberedList',
                            // '|',
                            // 'blockQuote',
                          ],
                        }}
                        onChange={(_, editor) => {
                          const data = editor.getData()
                          onChange(data)
                          setHasValue(data.length > 0) // Detectar si hay contenido
                        }}
                        onFocus={() => setIsFocused(true)} // Cambia el estado cuando el editor está enfocado
                        onBlur={() => setIsFocused(false)} // Cambia el estado cuando el editor pierde el enfoque
                        onReady={(editor) => {
                          const editableElement =
                            editor.ui.view.editable.element
                          if (editableElement) {
                            editableElement.style.backgroundColor =
                              theme.palette.mode === 'dark' ? '#222' : '#fff'
                            editableElement.style.color =
                              theme.palette.mode === 'dark' ? '#fff' : '#000'
                          }
                        }}
                      />
                    </Box>
                  )
                }}
              />

              {errors.description && (
                <FormHelperText
                  error={!!errors.description}
                  sx={{ mx: '14px', color: '#db3700' }}
                >
                  {errors.description?.message}
                </FormHelperText>
              )}
            </Box>
          </Grid2>

          <Grid2 container size={{ xs: 12 }} mt={1} alignItems="center">
            {isPending ? (
              <CircularProgress size={36} />
            ) : (
              <>
                {!isFullWidth && (
                  <Grid2 size={{ xs: 12, sm: 'auto' }}>
                    <Tooltip title="Regresar">
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
                    </Tooltip>
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
        onClose={resetBlocker|| (() => {})}
        onExit={proceed|| (() => {})}
      />
    </Paper>
  )
}
