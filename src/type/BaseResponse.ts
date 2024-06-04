import { HttpStatusCode } from '~/constants/httpStatus'

export interface PaginationMeta {
  total: number
  itemsPerPage: number
  lastPage: number
  currentPage: number
  nextPage: number
  prevPage: number
}

export class BaseResponse<T> {
  constructor(
    public content: T,
    public pagination?: PaginationMeta,
    public message: string = 'Success',
    public statusCode: number = HttpStatusCode.SUCCESS
  ) {}
}
