import { Container } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_authlayout')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <Container component="main" maxWidth="xs">
      <Outlet />
    </Container>
  )
}
