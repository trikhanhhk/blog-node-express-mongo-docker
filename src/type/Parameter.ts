import { ParamIn } from '~/constants/enum'

export interface IParameter {
  type: any
  source: ParamIn // path, query, header, body
  required: boolean
}

export interface ParameterMetadata {
  index: number
  name?: string
}
