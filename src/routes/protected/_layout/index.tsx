import { Head } from '@/components'
import { AppStore } from '@/store'

import { Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/protected/_layout/')({
  component: Welcome,
})
function Welcome() {
  const { user } = useSelector((state: AppStore) => state.auth)
  return (
    <>
      <Head title="Home" />
      <Typography variant="h5" sx={{ textWrap: 'balance' }}>
        Bienvenido(a) {user?.name}
      </Typography>
    </>
  )
}
