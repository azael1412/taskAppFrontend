import React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { ToOptions, useMatchRoute, useNavigate } from '@tanstack/react-router'

type NavigateOptions = ToOptions & {
  replace?: boolean
  resetScroll?: boolean
  ignoreBlocker?: boolean
}

interface ReusableListItemProps {
  navigateOpt: NavigateOptions
  //to: string // Ruta destino
  icon: SvgIconComponent // El componente del ícono (por ejemplo, InboxIcon)
  text: string // El texto a mostrar
  //onClick: () => void; // Función de clic
  fuzzy?: boolean //Si es true, coincidirá con la ubicación actual utilizando una coincidencia difusa. Por ejemplo, /posts coincidirá con una ubicación actual de /posts/123
}

const ReusableListItem: React.FC<ReusableListItemProps> = ({
  icon: Icon,
  text,
  navigateOpt,
  fuzzy = false,
}) => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const theme = useTheme() // Obtener el tema actual
  // Verificar si la ruta está activa, con opción exacta o no
  const isActive = matchRoute({ to: navigateOpt.to, fuzzy })

  const handleClick = () => {
    navigate(navigateOpt) // Usar el objeto options para la navegación
  }
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleClick}
        sx={{
          backgroundColor: isActive
            ? theme.palette.mode === 'dark'
              ? theme.palette.primary.dark
              : '#f0f0f0' // Gris claro cuando está activo en modo claro
            : 'transparent',
          color: isActive
            ? theme.palette.mode === 'dark'
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary // Texto visible en modo claro
            : theme.palette.text.primary,
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.main
                : theme.palette.action.hover,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
          },
        }}
      >
        <ListItemIcon>
          <Icon
            sx={{
              color: isActive
                ? theme.palette.mode === 'dark'
                  ? theme.palette.primary.contrastText // Blanco cuando está activo en modo oscuro
                  : theme.palette.primary.main // Ícono visible en modo claro (gris oscuro)
                : theme.palette.mode === 'dark'
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.main, // Ícono inactivo en modo claro
              '&:hover': {
                color: isActive
                  ? 'gray' // Cambia a gris cuando está seleccionado y se hace hover
                  : theme.palette.mode === 'dark'
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.dark, // Ícono oscuro en modo claro al hacer hover
              },
            }}
          />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default ReusableListItem
