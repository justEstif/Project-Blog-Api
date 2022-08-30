import endpoints from '../endpoints.config'
import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await connect(endpoints.MONGO_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export { connectDB }
