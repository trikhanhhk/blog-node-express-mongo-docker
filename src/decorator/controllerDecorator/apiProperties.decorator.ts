function ApiProperty(type: any) {
  return function (target: any, propertyKey: string) {
    const existingProperties = Reflect.getMetadata('api:properties', target) || []
    existingProperties.push({ propertyKey, type })
    Reflect.defineMetadata('api:properties', existingProperties, target)
  }
}

export default ApiProperty
