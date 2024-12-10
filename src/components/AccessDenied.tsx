import Head from './Head'

import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'

import { Link } from '@tanstack/react-router'

export const AccessDenied = () => {
  const title: string = '403 - No Autorizado'
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head title={title} />
      <Typography
        component="h1"
        variant={isSmall ? 'h3' : isMedium ? 'h2' : 'h1'}
        fontWeight={400}
        sx={{ textWrap: 'balance' }}
      >
        {title}
      </Typography>
      <Typography variant='subtitle1'>No tienes permiso para acceder a esta página.</Typography>
      <Link to="/protected">
        <Button color="primary" size="large" startIcon={<ArrowBack />}>
          Regresar
        </Button>
      </Link>
    </Box>
  )
}
