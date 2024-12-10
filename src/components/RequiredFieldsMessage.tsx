import { FC } from 'react'

import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'

interface RequiredFieldsMessageProps {
  variant?: Variant
  message?: string
}

const RequiredFieldsMessage: FC<RequiredFieldsMessageProps> = ({
  variant = 'caption',
  message = 'Campos requeridos *',
}) => {
  return (
    <Typography variant={variant} color="textPrimary">
      {message}
    </Typography>
  )
}

export default RequiredFieldsMessage
