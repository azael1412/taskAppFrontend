import { EndpointsService } from '@/constants'
import {
  DataWithPagination,
  Response,
  DataWIthPaginationAndSearch,
  Task,
  ResponseWithOutData,
  TaskCreateFormInputs,
  TaskEditFormInputs,
  TaskWithoutUser,
} from '@/models'
import { http } from '@/utils'

import { AxiosResponse } from 'axios'

export const taskList = async ({
  currentPage,
  search,
  perPage,
}: DataWIthPaginationAndSearch): Promise<
  Response<DataWithPagination<Task | TaskWithoutUser>>
> => {
  const response: AxiosResponse = await http.get(
    `${EndpointsService.TASKS}?page=${currentPage}&q=${search}&perPage=${perPage}`,
  )
  return response.data
}

export const taskShow = async (
  id: string,
): Promise<Response<Task | TaskWithoutUser>> => {
  const response: AxiosResponse = await http.get(
    `${EndpointsService.TASKS}/${id}`,
  )
  return response.data
}

export const taskChangeStatus = async (
  id: string,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.TASKS}/change-status/${id}`,
  )
  return response.data
}

export const taskCreate = async (
  data: TaskCreateFormInputs,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(EndpointsService.TASKS, data)
  return response.data
}

export const taskEdit = async (
  data: TaskEditFormInputs,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.TASKS}/${data.id}/edit`,
    data,
  )
  return response.data
}

export const taskPDF = async (id: string): Promise<Blob> => {
  const response: AxiosResponse = await http.get(
    `${EndpointsService.TASKS}/${EndpointsService.PDF}/${id}`,
    {
      responseType: 'blob', // Esto le dice a axios que espere un archivo binario
    },
  )
  return response.data
}
