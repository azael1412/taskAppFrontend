import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#db5858',
      main: '#d32f2f',
      dark: '#932020',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4791db',
      main: '#1976d2',
      dark: '#115293',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: `"Rubik", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,  // Usa el color primary.main desde el tema
        }),
      },
    },
  }
})
