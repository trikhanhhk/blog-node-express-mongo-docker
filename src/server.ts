import 'reflect-metadata'
import * as http from 'http'
import app from './app'

const PORT = process.env.PORT || 3000
const server = http.createServer(app.instance)
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`)
})
