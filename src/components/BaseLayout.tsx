import { FC } from 'react'

import { AppStore } from '@/store'
import { lightTheme, darkTheme } from '@/themes'
import { hideMessage } from '@/store/reducers/snackbar'

import { CssBaseline, ThemeProvider, Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

export type BaseLayoutProps = {
  children: JSX.Element | JSX.Element[]
}
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: AppStore) => state.ui.isDark)
  const snackbar = useSelector((state: AppStore) => state.snackbar)
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.isOpen}
        autoHideDuration={snackbar.duration}
        onClose={() => dispatch(hideMessage())}
      >
        <Alert
          onClose={() => dispatch(hideMessage())}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </ThemeProvider>
  )
}
export default BaseLayout
