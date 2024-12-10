import { FC } from 'react'

import { Task } from '@/models'
import { useMutateTaskChangeStatus } from '@/hooks'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material'

interface TaskActionDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  //   title: string
  //   description: string
  task: Task
}

const TaskActionDialog: FC<TaskActionDialogProps> = ({
  open,
  onClose,
  onConfirm,
  task,
}) => {
  // Instancia de los hooks
  const changeStatusMutation = useMutateTaskChangeStatus()

  // Selección de la mutación según el tipo de acción
  const mutation = changeStatusMutation
  const { isPending } = mutation

  // Título y descripción dinámicos basados en la acción
  const title = 'Confirmar cambio de estado'

  const description = `¿Estás seguro de que deseas cambiar el estado de la tarea ${task.title} a ${task.status === 1 ? 'Pendiente' : 'Hecho'}?`

  const handleConfirm = () => {
    mutation.mutate(task.id.toString(), {
      onSuccess: () => {
        onConfirm() // Puedes pasar el ID o realizar cualquier otra acción.
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={undefined} // Deshabilitar cierre al hacer clic fuera
      disableEscapeKeyDown // Deshabilitar cierre al presionar la tecla ESC
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {isPending ? (
          <CircularProgress size={36} />
        ) : (
          <>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              color="primary"
              //   autoFocus
              disabled={isPending}
            >
              Confirmar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default TaskActionDialog
