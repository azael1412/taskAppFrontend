import { userList, userShow } from '../api'
import { DataWIthPaginationAndSearch } from '@/models'

import { queryOptions } from '@tanstack/react-query'

export const usersQueryOptions = ({
  currentPage,
  search,
  perPage,
}: DataWIthPaginationAndSearch) =>
  queryOptions({
    queryKey: ['users', { currentPage, search, perPage }],
    queryFn: () => userList({ currentPage, search, perPage }),
    retry: (failureCount, error) => {
      return failureCount < 3 && error.name === 'NetworkError'
    },
    // staleTime: Infinity,
    // gcTime: 1800000,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
    // refetchOnWindowFocus: true,
  })

export const userByIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['users', { userId }],
    queryFn: () => userShow(userId),
  })
