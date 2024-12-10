import { FC } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  // useTheme,
  // useMediaQuery,
} from '@mui/material'

interface ExitDialogProps {
  open: boolean
  onClose: () => void
  onExit: () => void
}

const ExitDialog: FC<ExitDialogProps> = ({ open, onClose, onExit }) => {
  // const theme = useTheme()
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Dialog
      // fullScreen={fullScreen}
      open={open}
      onClose={undefined} // Deshabilitar cierre al hacer clic fuera
      disableEscapeKeyDown // Deshabilitar cierre al presionar la tecla ESC
    >
      <DialogTitle>Confirmar Salida</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro de que desea salir sin guardar los cambios?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button onClick={onExit} color="info">
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExitDialog
