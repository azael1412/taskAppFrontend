import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'
import logoLight from '@/assets/img/logo_light.png'
import logoDark from '@/assets/img/logo_dark.png'
import { useSelector } from 'react-redux'
import { AppStore } from '@/store'

interface LogoWithTitleProps {
  // src?: string
  width?: number | string
  height?: number | string
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  title: string
  variant?: Variant
  mt?: number | string
  mb?: number | string
}

const LogoWithTitle: React.FC<LogoWithTitleProps> = ({
  // src = logo,
  width = 250,
  height = 130,
  objectFit = 'cover',
  title,
  variant = 'h5',
  mt = 0,
  mb = 2,
}) => {
  const isDarkMode = useSelector((state: AppStore) => state.ui.isDark)
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={mt}
      mb={mb}
    >
      <Box
        component="img"
        src={isDarkMode ? logoDark  : logoLight}
        width={width}
        height={height}
        style={{ objectFit }}
        alt="logo"
      />
      <Typography component="h1" variant={variant} mb={2} fontWeight={500}>
        {title}
      </Typography>
    </Box>
  )
}

export default LogoWithTitle
