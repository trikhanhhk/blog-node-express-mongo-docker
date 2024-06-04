import { cleanEnv, num, port, str } from 'envalid'

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_INITDB_ROOT_USERNAME: str(),
    MONGO_INITDB_ROOT_PASSWORD: str(),
    MONGO_DB_NAME: str(),
    MONGO_DB_PORT: port(),
    MONGO_HOST: str(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    PORT: num()
  })
}
export default validateEnv
