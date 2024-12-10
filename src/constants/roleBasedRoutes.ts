import { RoleBasedRoutes } from '@/models'
import { Role } from './role'

const baseRoutes: RoleBasedRoutes = {
  '/protected': [Role.ADMIN, Role.CLIENT],
  '/protected/profile': [Role.ADMIN, Role.CLIENT],
}

const userRoutes: RoleBasedRoutes = {
  '/protected/users': [Role.ADMIN],
  '/protected/users/create': [Role.ADMIN],
  '/protected/users/:userId/edit': [Role.ADMIN],
  '/protected/users/:userId/show': [Role.ADMIN, Role.CLIENT],
}

const taskRoutes: RoleBasedRoutes = {
  '/protected/tasks': [Role.ADMIN, Role.CLIENT],
  '/protected/tasks/create': [Role.CLIENT],
  '/protected/tasks/:taskId/edit': [Role.CLIENT],
  '/protected/tasks/:taskId/show': [Role.ADMIN, Role.CLIENT],
}

// Combinamos todas las rutas
export const roleBasedRoutes: RoleBasedRoutes = {
  ...baseRoutes,
  ...userRoutes,
  ...taskRoutes,
}
