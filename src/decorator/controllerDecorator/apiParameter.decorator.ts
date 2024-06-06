import { IParameter } from '~/type/Parameter'
import { MetadataKeys } from '../meta.keys'
import { ParamIn } from '~/constants/enum'

function ApiParameter(dtoClass: any, source: ParamIn, required: boolean = true) {
  return function (target: any, propertyKey: string) {
    const parameters: IParameter[] = Reflect.getMetadata(MetadataKeys.PARAMETERS, target, propertyKey) || []
    parameters.push({ type: dtoClass, source, required })
    Reflect.defineMetadata(MetadataKeys.PARAMETERS, parameters, target, propertyKey)
  }
}

export default ApiParameter
