import { Box, Typography, Button } from '@mui/material'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import { styled } from '@mui/material/styles'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}))

export default function NoConnection() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <Container>
      <WifiOffIcon sx={{ fontSize: 80, color: 'gray' }} />
      <Typography variant="h4" gutterBottom sx={{ textWrap: 'balance' }}>
        No tienes conexión a Internet
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textWrap: 'balance' }}
      >
        Por favor, verifica tu conexión de red y vuelve a intentarlo.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRetry}
        sx={{ mt: 2 }}
      >
        Reintentar
      </Button>
    </Container>
  )
}
