// import { useLocation } from "@tanstack/react-router";

// export function useTSRBreadCrumbs() {
//   const current = useLocation();

//   const route_history = current.pathname
//     .split("/")
//     .filter((x) => x && x.length > 0);

//   const breadcrumb_routes = route_history.reduce(
//     (acc: { name: string; path: string }[], route) => {
//       const prev_path = acc[acc.length - 1]?.path ?? "";
//       acc.push({ name: route, path: `${prev_path}/${route}` });
//       return acc;
//     },
//     [],
//   );
//   return { breadcrumb_routes };
// }
import { useLocation } from '@tanstack/react-router'

// Definir el mapeo de rutas a nombres personalizados
const routeNameMap: { [key: string]: string } = {
  protected: 'Home',
  users: 'Usuarios',
  tasks: 'Tareas',
  dashboard: 'Tablero',
  settings: 'Configuraciones',
  create: 'Registrar',
  show: 'Información',
  edit: 'Editar',
  profile: 'Perfil',
  // Agrega más rutas principales y sus nombres aquí
}

export function useTSRBreadCrumbs() {
  const current = useLocation()

  const route_history = current.pathname
    .split('/')
    .filter((x) => x && x.length > 0)

  const breadcrumb_routes = route_history.reduce(
    (acc: { name: string; path: string }[], route, index) => {
      const isParameter = /^[0-9]+$/.test(route) // Detectar si es un ID (parámetro)
      const prev_path = acc[acc.length - 1]?.path ?? ''

      // Si la ruta existe en el mapeo, usamos el nombre personalizado
      const routeName = routeNameMap[route] || route

      if (!isParameter) {
        acc.push({ name: routeName, path: `${prev_path}/${route}` })
      } else if (index === route_history.length - 1) {
        // Si es el último segmento y es un parámetro, añadimos un nombre genérico (show/edit)
        const lastRouteName = route_history.includes('edit') ? 'Editar' : 'Ver'
        acc.push({ name: lastRouteName, path: `${prev_path}/${route}` })
      }

      return acc
    },
    [],
  )

  return { breadcrumb_routes }
}
