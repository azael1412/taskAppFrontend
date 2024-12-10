import { API_URL, USER_KEY } from '@/constants'
import { getItemLocalStorage } from '@/utils'

import axios, { AxiosInstance } from 'axios'

const baseURL = API_URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

/* Adding the token to the header of the request. */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemLocalStorage(USER_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
