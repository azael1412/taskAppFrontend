import BaseLayout from './BaseLayout'
import Head from './Head'

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'

const NotFound = () => {
  const title: string = '404 - Pagina No Encontrada'
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  return (
    <BaseLayout>
      <Head title={title} />
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
        <Typography
          component="h1"
          variant={isSmall ? 'h3' : isMedium ? 'h2' : 'h1'}
          fontWeight={400}
          sx={{ textWrap: 'balance' }}
        >
          {title}
        </Typography>
        <Link to="/">
          <Button color="primary" size="large" startIcon={<ArrowBack />}>
            Regresar
          </Button>
        </Link>
      </Box>
    </BaseLayout>
  )
}
export default NotFound
