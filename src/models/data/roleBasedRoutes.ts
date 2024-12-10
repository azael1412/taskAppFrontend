import { Role } from '@/constants'

export interface RoleBasedRoutes {
  [key: string]: Role[] // Las rutas ahora permiten un array de enums Role
}
