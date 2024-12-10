import { EndpointsService } from '@/constants'
import { Response, Role } from '@/models'
import { http } from '@/utils'
import { AxiosResponse } from 'axios'

export const getRoles = async (): Promise<Response<Role[]>> => {
  const response: AxiosResponse = await http.get(`${EndpointsService.ROLES}`)
  return response.data
}
