import { FC, ReactNode } from 'react'

import { RequiredFieldsMessage, Head } from '@/components'

import { Grid2, Typography } from '@mui/material'

interface FormLayoutProps {
  title: string
  children: ReactNode
  requiredFieldsMessage?: boolean
}

const FormLayout: FC<FormLayoutProps> = ({
  title,
  children,
  requiredFieldsMessage = true,
}) => {
  return (
    <Grid2 container spacing={1} py={2}>
      <Grid2 size={{ xs: 12 }} alignItems="center">
        <Head title={title} />
        <Typography
          variant="h6"
          textAlign="left"
          sx={{ cursor: 'text', textWrap: 'balance' }}
          fontWeight={500}
        >
          {title}
        </Typography>
      </Grid2>

      {requiredFieldsMessage && (
        <Grid2 size={{ xs: 12 }} alignItems="center">
          <RequiredFieldsMessage />
        </Grid2>
      )}

      {children}
    </Grid2>
  )
}

export default FormLayout
