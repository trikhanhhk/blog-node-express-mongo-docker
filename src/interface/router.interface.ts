import { Methods } from '~/constants/enum'

export interface IRouter {
  method: Methods
  path: string
  handlerName: string | symbol
}
