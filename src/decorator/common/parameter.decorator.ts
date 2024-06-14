import { ParameterMetadata } from '~/type/Parameter'
import { MetadataKeys } from '../meta.keys'

function paramMeterFactory(metaDatakey: MetadataKeys) {
  return (paramName?: string): any => {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      const type = Reflect.getMetadata('design:type', target, propertyKey)
      console.log('type', target)
      const existingBodyParameters: ParameterMetadata[] = Reflect.getOwnMetadata(metaDatakey, target, propertyKey) || []
      existingBodyParameters.push({ index: parameterIndex, name: paramName })
      Reflect.defineMetadata(metaDatakey, existingBodyParameters, target, propertyKey)
    }
  }
}

export const Body = paramMeterFactory(MetadataKeys.BODY_PARAMETER)
export const Query = paramMeterFactory(MetadataKeys.QUERY_PARAMETER)
export const Param = paramMeterFactory(MetadataKeys.PATH_PARAMETER)
export const Req = paramMeterFactory(MetadataKeys.REQUEST_PARAMETER)
export const Res = paramMeterFactory(MetadataKeys.RESPONSE_PARAMETER)
