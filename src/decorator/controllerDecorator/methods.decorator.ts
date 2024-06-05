import { Methods } from '~/constants/enum'
import { IRouter } from '~/interface/router.interface'
import { MetadataKeys } from '../meta.keys'

const methodDecoratorFactory = (method: Methods) => {
  return (path: string): any => {
    return (target: object, propertykey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      const controllerClass = target.constructor

      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : []

      routers.push({
        method,
        path,
        handlerName: propertykey
      })

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
    }
  }
}

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Put = methodDecoratorFactory(Methods.PUT)
export const Patch = methodDecoratorFactory(Methods.PATCH)
export const Delete = methodDecoratorFactory(Methods.DELETE)
