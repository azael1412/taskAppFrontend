import React from 'react'
import { useTSRBreadCrumbs } from '@/hooks'
// Importar tu hook
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink } from '@tanstack/react-router' // Asumiendo que usas TanStack Router para navegación

const BreadcrumbComponent: React.FC = () => {
  const { breadcrumb_routes } = useTSRBreadCrumbs()

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
      {breadcrumb_routes.map((route, index) => {
        const isLast = index === breadcrumb_routes.length - 1

        return isLast ? (
          // Si es el último, mostrarlo como un Typography sin enlace
          <Typography key={route.path} color="text.primary">
            {route.name}
          </Typography>
        ) : (
          // Si no es el último, mostrarlo como un enlace de navegación
          <Link
            key={route.path}
            component={RouterLink}
            to={route.path} // Usar TanStack Router para navegación
            underline="hover"
            color="inherit"
          >
            {route.name}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default BreadcrumbComponent
