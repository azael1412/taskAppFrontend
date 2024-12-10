import {
  AppBar,
  Toolbar,
  IconButton,
  Skeleton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Theme,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'

const AppBarSkeleton = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton edge="start" aria-label="menu">
          <Skeleton variant="circular" width={40} height={40} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const DrawerSkeleton: FC<{ open: boolean }> = ({ open }) => {
  return (
    <Drawer variant="persistent" open={open}>
      <Box sx={{ width: 250 }}>
        <List>
          {Array.from(new Array(7)).map((_, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemIcon>
              <ListItemText>
                <Skeleton variant="text" width={120} height={40} />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
const LayoutSkeleton: FC = () => {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  )
  const [open, setOpen] = useState(isLargeScreen)

  // Effect to open/close drawer based on screen size changes
  useEffect(() => {
    setOpen(isLargeScreen)
  }, [isLargeScreen])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarSkeleton />
      <DrawerSkeleton open={open} />
    </Box>
  )
}

export default LayoutSkeleton
