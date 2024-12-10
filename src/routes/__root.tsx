import { Suspense } from 'react'

import {
  BaseLayout,
  CircularIndeterminate,
  NoConnection,
  TanStackRouterDevtools,
} from '@/components'
import { useOnlineStatus } from '@/hooks'

import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const isOnline = useOnlineStatus()
  return (
    <BaseLayout>
      {!isOnline ? <NoConnection /> : <Outlet />}
      {/* <Outlet /> */}
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Suspense fallback={<CircularIndeterminate />}>
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </BaseLayout>
  )
}
