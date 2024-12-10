import BaseLayout from '../BaseLayout'
import { Box, Skeleton, Typography } from '@mui/material'

const LoadingPage = () => {
  return (
    <BaseLayout>
      <Box sx={{ p: 3 }}>
        {/* Simulando el título de la página */}
        <Typography variant="h2">
          <Skeleton width="60%" />
        </Typography>

        {/* Simulando subtítulo */}
        <Typography variant="h5" sx={{ mt: 2 }}>
          <Skeleton width="40%" />
        </Typography>

        {/* Simulando párrafos de texto */}
        <Box sx={{ mt: 4 }}>
          {Array.from(new Array(2)).map((_, index) => (
            <Typography key={'p1-' + index} variant="body1" sx={{ mb: 2 }}>
              <Skeleton width="100%" />
              <Skeleton width="95%" />
              <Skeleton width="90%" />
            </Typography>
          ))}
        </Box>

        {/* Simulando otra sección */}
        <Typography variant="h4" sx={{ mt: 4 }}>
          <Skeleton width="50%" />
        </Typography>

        {/* Simulando más párrafos */}
        <Box sx={{ mt: 2 }}>
          {Array.from(new Array(3)).map((_, index) => (
            <Typography key={'p2-' + index} variant="body1" sx={{ mb: 2 }}>
              <Skeleton width="100%" />
              <Skeleton width="92%" />
            </Typography>
          ))}
        </Box>

        {/* Simulando otra sección */}
        <Typography variant="h4" sx={{ mt: 4 }}>
          <Skeleton width="50%" />
        </Typography>

        {/* Simulando más párrafos */}
        <Box sx={{ mt: 2 }}>
          {Array.from(new Array(3)).map((_, index) => (
            <Typography key={'p3-' + index} variant="body1" sx={{ mb: 2 }}>
              <Skeleton width="100%" />
              <Skeleton width="92%" />
            </Typography>
          ))}
        </Box>
      </Box>
    </BaseLayout>
  )
}
export default LoadingPage
