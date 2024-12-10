import { queryOptions } from '@tanstack/react-query'
import { getRoles } from '../api'

export const rolesQueryOptions = () =>
  queryOptions({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  })
