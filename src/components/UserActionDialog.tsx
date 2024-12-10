import { FC } from 'react'

import {
  useMutateUserChangeStatus,
  useMutateUserResetPassword,
  useMutateUserVerifyEmailById,
} from '@/hooks'
import { User } from '@/models'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material'


interface UserActionDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  //   title: string
  //   description: string
  user: User
  actionType: 'verifyEmail' | 'changeStatus' | 'resetPassword'
}

const UserActionDialog: FC<UserActionDialogProps> = ({
  open,
  onClose,
  onConfirm,
  //   title,
  //   description,
  user,
  actionType = 'changeStatus',
}) => {
  // Instancia de los hooks
  const changeStatusMutation = useMutateUserChangeStatus()
  const verifyEmailMutation = useMutateUserVerifyEmailById()
  const resetPasswordMutation = useMutateUserResetPassword()

  // Selección de la mutación según el tipo de acción
  const mutation =
    actionType === 'verifyEmail'
      ? verifyEmailMutation
      : actionType === 'resetPassword'
        ? resetPasswordMutation
        : changeStatusMutation
  const { isPending } = mutation

  // Título y descripción dinámicos basados en la acción
  const title =
    actionType === 'verifyEmail'
      ? 'Confirmar verificación de correo'
      : actionType === 'resetPassword'
        ? 'Confirmar reseteo de contraseña'
        : 'Confirmar cambio de estado'

  const description =
    actionType === 'verifyEmail'
      ? `¿Estás seguro de que deseas verificar el correo ${user.email} del usuario ${user.name}?`
      : actionType === 'resetPassword'
        ? `¿Estás seguro de que deseas resetear la contraseña del usuario ${user.name}?`
        : `¿Estás seguro de que deseas cambiar el estado del usuario ${user.name} a ${user.status === 1 ? 'Inactivo' : 'Activo'}?`

  const handleConfirm = () => {
    mutation.mutate(user.id.toString(), {
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

export default UserActionDialog
