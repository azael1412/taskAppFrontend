import { taskList, taskShow } from '../api'
import { DataWIthPaginationAndSearch } from '@/models'

import { queryOptions } from '@tanstack/react-query'

export const tasksQueryOptions = ({
  currentPage,
  search,
  perPage,
}: DataWIthPaginationAndSearch) =>
  queryOptions({
    queryKey: ['tasks', { currentPage, search, perPage }],
    queryFn: () => taskList({ currentPage, search, perPage }),
  })

export const taskByIdQueryOptions = (taskId: string) =>
  queryOptions({
    queryKey: ['tasks', { taskId }],
    queryFn: () => taskShow(taskId),
  })
