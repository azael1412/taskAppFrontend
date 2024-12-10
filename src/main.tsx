// import { StrictMode } from 'react'
import { routeTree } from './routeTree.gen'
import { store } from './store'
import { ErrorComponent, NotFound } from './components'

import { createRoot } from 'react-dom/client'

import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

// import '@fontsource/roboto'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
// import '@fontsource/roboto/900.css'

// import '@fontsource/montserrat'
// import '@fontsource/montserrat/300.css'
// import '@fontsource/montserrat/400.css'
// import '@fontsource/montserrat/500.css'
// import '@fontsource/montserrat/700.css'
// import '@fontsource/montserrat/900.css'

import '@fontsource/rubik'
import '@fontsource/rubik/300.css'
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/700.css'
import '@fontsource/rubik/900.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 1800000,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: (failureCount, error) => {
        return failureCount < 3 && error.name === 'NetworkError'
      },
    },
  },
})
// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ErrorComponent,
  //defaultPendingComponent: LoadingPage,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
const helmetContext = {}

createRoot(rootElement).render(
  // <StrictMode>
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>,
  //</StrictMode>, 
)
