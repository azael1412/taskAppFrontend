import { Role } from '@/constants'
import { roleBasedRoutes } from '@/constants/roleBasedRoutes'

const matchRoute = (pattern: string, path: string): boolean => {
  const regex = new RegExp(
    `^${pattern.replace(/:\w+/g, '[^/]+')}$`, // Reemplaza ":variable" con un valor dinámico
  )
  return regex.test(path)
}

export const canAccessRoute = (role: Role, currentPath: string): boolean => {
  for (const pattern in roleBasedRoutes) {
    if (matchRoute(pattern, currentPath)) {
      const allowedRoles = roleBasedRoutes[pattern]
      return allowedRoles.includes(role)
    }
  }

  return false // Si no coincide ninguna ruta, denegar acceso
}
