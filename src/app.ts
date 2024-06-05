import express, { Handler, NextFunction, RequestHandler } from 'express'
import * as bodyParser from 'body-parser'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error.middlewares'
import cookieParser from 'cookie-parser'
import { controllers } from './controllers'
import { IRouter } from './interface/router.interface'
import { MetadataKeys } from './decorator/meta.keys'
import { CreateUserDto } from './entities/users/createUser.dto'
import validationMiddleware from './middlewares/validation.middlewares'
import IValidator from './interface/validator.interface'

class App {
  private readonly _instance: express.Application

  get instance(): express.Application {
    return this._instance
  }

  constructor() {
    this._instance = express()
    this._instance.use(express.json())
    this._instance = express()

    this.connectToTheDatabase()

    this.initializeMiddlewares()
    this.registerRouters()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this._instance.use(bodyParser.json())
    this._instance.use(cookieParser())
    this._instance.use(errorMiddleware)
  }

  private async registerRouters() {
    this._instance.get('/', (req, res) => {
      res.json({ message: 'Hello World!' })
    })

    const info: Array<{ api: string; handler: string }> = []

    controllers.forEach((controllerClass) => {
      const controllerInstance = new controllerClass() as any

      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass)
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      const validators: IValidator[] = Reflect.getMetadata(MetadataKeys.VALIDATORS, controllerClass) || []
      const exRouter = express.Router()

      routers.forEach(({ method, path, handlerName }) => {
        const validator = validators.filter((value) => value.handlerName === handlerName)[0]
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
      })

      this._instance.use(basePath, exRouter)
    })
    console.table(info)
  }

  private connectToTheDatabase() {
    const { MONGO_URI } = process.env
    mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/blogdb')
  }

  private initializeErrorHandling() {
    this._instance.use(errorMiddleware)
  }
}

export default new App()
