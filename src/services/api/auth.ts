import { EndpointsService } from '@/constants'
import {
  Auth,
  LoginFormInputs,
  ProfileFormInputs,
  ResetPassword,
  Response,
  ResponseWithOutData,
} from '@/models'
import { http } from '@/utils'

import { AxiosResponse } from 'axios'

export const signIn = async (
  data: LoginFormInputs,
): Promise<Response<Auth>> => {
  const response: AxiosResponse = await http.post(EndpointsService.SIGNIN, data)
  return response.data
}

export const refreshToken = async (): Promise<Response<Auth>> => {
  const response: AxiosResponse = await http.post(EndpointsService.REFRESHTOKEN)
  return response.data
}

export const logout = async (): Promise<ResponseWithOutData> => {
  const response: AxiosResponse = await http.post(EndpointsService.LOGOUT)
  return response.data
}

export const verifyEmailByEmail = async (
  email: string,
): Promise<ResponseWithOutData> => {
  const response: AxiosResponse = await http.post(
    EndpointsService.VERIFYEMAIL + email,
  )
  return response.data
}

export const forgotPassword = async (
  email: string,
): Promise<ResponseWithOutData> => {
  const response: AxiosResponse = await http.post(
    EndpointsService.FORGOTPASSWORD,
    {
      email,
    },
  )
  return response.data
}
export const ressetPasswordByUser = async (
  data: ResetPassword,
): Promise<ResponseWithOutData> => {
  const response: AxiosResponse = await http.post(
    EndpointsService.RESETPASSWORD,
    data,
  )
  return response.data
}

export const updateProfile = async (
  data: ProfileFormInputs,
): Promise<ResponseWithOutData> => {
  const response: AxiosResponse = await http.post(
    EndpointsService.UPDATEPROFILE,
    data,
  )
  return response.data
}
