import { Paginate } from '@/models'

export interface Response<T> {
  code: number
  message: string
  results: T
}

export interface ResponseWithOutData {
  code: number
  message: string
}

export interface DataWithPagination<T> {
  data: T[]
  paginate: Paginate
}
