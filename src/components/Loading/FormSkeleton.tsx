import { FC } from 'react'
import {
  Paper,
  Box,
  Skeleton,
  Grid2,
  useTheme,
  useMediaQuery,
} from '@mui/material'

const FormSkeleton: FC = () => {
  const theme = useTheme()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Paper>
      <Box component="form" mx={2}>
        {/* Título simulado */}
        <Skeleton variant="text" width="30%" height={40} />

        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 'grow' }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Grid2>
        </Grid2>

        {/* Botones */}
        <Grid2 container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid2 size={{ xs: 12, sm: 'auto' }}>
            <Skeleton
              variant="rectangular"
              width={isFullWidth ? '100%' : 100}
              height={40}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 'auto' }}>
            <Skeleton
              variant="rectangular"
              width={isFullWidth ? '100%' : 100}
              height={40}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  )
}

export default FormSkeleton
