import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/hello-word')({
  component: () => <div>Hello /hello-word!</div>,
})
