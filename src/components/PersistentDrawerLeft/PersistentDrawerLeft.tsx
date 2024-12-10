import { useState, useCallback } from 'react'

import { BRAND_NAME } from '@/constants'
import { useMutateLogout, useTSRBreadCrumbs } from '@/hooks'
import { AppStore } from '@/store'
import { toggleDarkMode, toggleSideMenu } from '@/store/reducers/ui'
import { AppBar, drawerWidth } from './styles'
import ReusableListItem from '../ReusableListItem'

import { useTheme } from '@mui/material/styles'
import {
  IconButton,
  Box,
  Drawer,
  Toolbar,
  // List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Collapse,
  Avatar,
  Menu,
  Tooltip,
  MenuItem,
  ListSubheader,
  useMediaQuery,
} from '@mui/material'

import {
  // ExpandLess as ExpandLessIcon,
  // ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  // Inbox as InboxIcon,
  // Mail as MailIcon,
  Brightness7,
  Brightness4,
  Group,
  Assignment,
} from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from '@tanstack/react-router'
// import { RouterLink } from '../RouterLink'

// const settings = ['Profile', 'Account', 'Dashboard']
const PersistentDrawerLeft = () => {
  const { breadcrumb_routes } = useTSRBreadCrumbs()
  const theme = useTheme()
  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const { isMenuOpen: open, isDark } = useSelector(
    (state: AppStore) => state.ui,
  )
  const { user } = useSelector((state: AppStore) => state.auth)
  const { mutate } = useMutateLogout()

  const dispatch = useDispatch()
  // const [openSubmenu, setOpenSubmenu] = useState<boolean>(false)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    setAnchorElUser(null)
    mutate()
  }

  const handleDrawer = useCallback(() => {
    dispatch(toggleSideMenu())
  }, [dispatch])

  // const handleSubmenuClick = useCallback(() => {
  //   setOpenSubmenu((prevOpen) => !prevOpen)
  // }, [])

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          {!isFullWidth &&
            breadcrumb_routes.map((route, index) => {
              const isLast = index === breadcrumb_routes.length - 1
              const routeName = route.name + (isLast ? '' : ' / ')
              return (
                <Typography
                  variant="h6"
                  noWrap
                  key={route.path}
                  color="text.primary"
                >
                  {routeName} &nbsp;
                </Typography>
              )
            })}

          <Box sx={{ flexGrow: 1 }} />
          <Box
          // sx={{ flexGrow: 0 }}
          >
            <Tooltip title="Abrir Configuraciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))} */}
              <Link
                to="/protected/profile"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>
                  <Typography sx={{ textAlign: 'center' }}>Perfil</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>
                  Cerrar Sesión
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawer}
      >
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            to="/protected"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold' }}
              textAlign="center"
            >
              {BRAND_NAME}
            </Typography>
          </Link>
          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar aria-label="recipe" src={undefined} />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              azael1412
            </Typography>
          </Stack> */}
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <ListSubheader>Panel de Administración</ListSubheader>
        {user?.role.id === 1 && (
          <ReusableListItem
            navigateOpt={{
              to: '/protected/users',
              search: { currentPage: 1, search: '', perPage: 10 },
            }}
            icon={Group}
            text="Usuarios"
            fuzzy
          />
        )}
        <ReusableListItem
          navigateOpt={{
            to: '/protected/tasks',
          }}
          icon={Assignment}
          text="Tareas"
          fuzzy
        />

        {/* <ListItem disablePadding>
          <ListItemButton
          //onClick={() => navigate({ to: '/protected' })}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Item 2" />
          </ListItemButton>
        </ListItem> */}
        {/* 
        <ListItem disablePadding onClick={handleSubmenuClick}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Item 2" />
            {openSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Subitem 1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Subitem 2" />
            </ListItemButton>
          </List>
        </Collapse> */}
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Divider />
        <ListSubheader>Configuraci&oacute;n</ListSubheader>
        <ListItem disablePadding onClick={() => dispatch(toggleDarkMode())}>
          <ListItemButton>
            <ListItemIcon>
              {isDark ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText
              primary={`${isDark ? 'Modo Claro' : 'Modo Oscuro'}`}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  )
}

export default PersistentDrawerLeft
