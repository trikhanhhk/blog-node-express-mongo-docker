import dotenv from 'dotenv'
import validateEnv from './utils/validateEnv'
import 'reflect-metadata'
import * as http from 'http'
import app from './app'
import swaggerUi from 'swagger-ui-express'

dotenv.config()
validateEnv()

const PORT = process.env.PORT || 3000
const server = http.createServer(app.instance)
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`)
})
