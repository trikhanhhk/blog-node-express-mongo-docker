import IValidator from '~/interface/validator.interface'
import { MetadataKeys } from '../meta.keys'

export function Validate(type: any, skipMissingProperties: boolean = false): any {
  return (target: object, propertykey: string | symbol) => {
    const targetClass = target.constructor

    const validators: IValidator[] = Reflect.hasMetadata(MetadataKeys.VALIDATORS, targetClass)
      ? Reflect.getMetadata(MetadataKeys.VALIDATORS, targetClass)
      : []

    validators.push({
      handlerName: propertykey,
      type,
      skipMissingProperties
    })

    Reflect.defineMetadata(MetadataKeys.VALIDATORS, validators, targetClass)
  }
}
