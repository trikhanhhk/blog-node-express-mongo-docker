import { IApiProperty } from '~/type/ApiProperty'

export default function generateExampleFromDto(dtoClass: any): any {
  const example: any = {}
  const properties: IApiProperty[] = Reflect.getMetadata('api:properties', dtoClass.prototype) || []

  properties.forEach(({ propertyKey, type }) => {
    example[propertyKey] = getExampleValue(type)
  })

  return example
}

function getExampleValue(type: any): any {
  switch (type) {
    case String:
      return 'string example'
    case Number:
      return 123
    case Boolean:
      return true
    default:
      return null
  }
}
