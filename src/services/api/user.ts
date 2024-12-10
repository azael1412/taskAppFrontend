import { EndpointsService } from '@/constants'
import {
  DataWithPagination,
  Response,
  User,
  DataWIthPaginationAndSearch,
  ResponseWithOutData,
  UserCreateFormInputs,
  UserEditFormInputs,
} from '@/models'
import { http } from '@/utils'

import { AxiosResponse } from 'axios'

export const me = async (): Promise<Response<User>> => {
  const response: AxiosResponse = await http.get(EndpointsService.ME)
  return response.data
}

export const userList = async ({
  currentPage,
  search,
  perPage,
}: DataWIthPaginationAndSearch): Promise<
  Response<DataWithPagination<User>>
> => {
  const response: AxiosResponse = await http.get(
    `${EndpointsService.USERS}?page=${currentPage}&q=${search}&perPage=${perPage}`,
  )
  return response.data
}

export const userShow = async (id: string): Promise<Response<User>> => {
  const response: AxiosResponse = await http.get(
    `${EndpointsService.USERS}/${id}`,
  )
  return response.data
}

export const userChangeStatus = async (
  id: string,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.USERS}/change-status/${id}`,
  )
  return response.data
}

export const verifyEmailById = async (
  id: string,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.USERS}/verify-email/${id}`,
  )
  return response.data
}

export const resetPassword = async (
  id: string,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.USERS}/reset-password/${id}`,
  )
  return response.data
}

export const userCreate = async (
  data: UserCreateFormInputs,
): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(EndpointsService.USERS, data)
  return response.data
}

export const userEdit = async ( data:UserEditFormInputs): Promise<Response<ResponseWithOutData>> => {
  const response: AxiosResponse = await http.post(
    `${EndpointsService.USERS}/${data.id}/edit`,data
  )
  return response.data
}