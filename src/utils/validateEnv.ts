import 'dotenv/config'
import { cleanEnv, str, port } from 'envalid'

const validateEnv = cleanEnv(process.env, {
  MONGO_PASSWORD: str(),
  MONGO_PATH: str(),
  MONGO_USER: str(),
  JWT_SECRET: str(),
  PORT: port({ default: 3000 })
})

export default validateEnv
