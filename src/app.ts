import express from 'express'
import * as bodyParser from 'body-parser'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error.middlewares'
import cookieParser from 'cookie-parser'
import { controllers } from './controllers'
import dotenv from 'dotenv'
import validateEnv from './utils/validateEnv'
import { initalRouter } from './routers/initalRouter'

dotenv.config()
validateEnv()
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
    initalRouter(this._instance, controllers)
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
