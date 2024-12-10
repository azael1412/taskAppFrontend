import { Head, LogoWithTitle } from '@/components'
import { useMutateVerifyEmailByEmail } from '@/hooks'
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import JSConfetti from 'js-confetti'

export const Route = createFileRoute('/(auth)/_authlayout/active-account')({
  validateSearch: (search: Record<string, unknown>): { token: string } => {
    // validate and parse the search params into a typed state
    return {
      token: (search.token as string) || '',
    }
  },
  component: ActiveAccount,
})

function ActiveAccount() {
  const { mutate, isPending /*, isError, error*/ } =
    useMutateVerifyEmailByEmail()
  const { token } = Route.useSearch()
  const jsConfetti = new JSConfetti()
  const title = 'Activar Cuenta de Usuario'

  const handleSubmit = () =>
    mutate(token, {
      onSuccess: () => {
        jsConfetti.addConfetti()
      },
    })

  return (
    <Box
      sx={{
        height: '100vh', // Ocupa toda la altura de la pantalla
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Head title={title} />
            <LogoWithTitle title={title} />
            <Typography mt={2} variant="caption">
              De click en el siguiente botón para activar su cuenta de usuario.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? <CircularProgress size={36} /> : 'Activar Cuenta'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
