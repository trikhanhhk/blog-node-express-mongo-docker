import express, { NextFunction } from 'express'
import { MetadataKeys } from '~/decorator/meta.keys'
import IValidator from '~/interface/validator.interface'
import validationMiddleware from '~/middlewares/validation.middlewares'
import { pathInfoAutogen, swaggerAutogen } from '~/swagger/swagger.config'
import { IParameter } from '~/type/Parameter'
import swaggerUi from 'swagger-ui-express'
import { IRouter } from '~/interface/router.interface'

export const initalRouter = async (instance: express.Application, controllers: any[]) => {
  instance.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
  })

  const info: Array<{ api: string; handler: string }> = []
  const pathInfo: Record<string, any> = {}

  controllers.forEach((controllerClass) => {
    const controllerInstance = new controllerClass() as any

    const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass)
    const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
    const validators: IValidator[] = Reflect.getMetadata(MetadataKeys.VALIDATORS, controllerClass) || []
    const exRouter = express.Router()

    routers.forEach(({ method, path, handlerName }) => {
      const validator = validators.filter((value) => value.handlerName === handlerName)[0]
      console.log('validator', validators)
      const parameters: IParameter[] =
        Reflect.getMetadata(MetadataKeys.PARAMETERS, controllerInstance, handlerName) || []
      exRouter[method](
        path,
        validator
          ? validationMiddleware(validator?.type, validator.skipMissingProperties)
          : (req, res, next) => {
              next()
            },
        async (req: express.Request, res: express.Response, next: NextFunction) => {
          try {
            const handlerFunction = controllerInstance[handlerName].bind(controllerInstance)
            const response = await handlerFunction(req, res)
            res.send(response)
          } catch (error) {
            next(error)
          }
        }
      )

      info.push({
        api: `${method.toLocaleUpperCase()} ${basePath + path}`,
        handler: `${controllerClass.name}.${String(handlerName)}`
      })

      if (!pathInfo[`${basePath}${path}`]) {
        pathInfo[`${basePath}${path}`] = {}
      }

      pathInfoAutogen(pathInfo, basePath, path, parameters, method, handlerName, controllerClass)
    })

    instance.use(basePath, exRouter)
  })

  console.table(info)

  instance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAutogen(pathInfo)))
}
