import mongoose from 'mongoose'
import 'dotenv/config'

let connectionPromise

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured')

  connectionPromise ??= mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
  }).catch((error) => {
    connectionPromise = undefined
    throw error
  })

  const connection = await connectionPromise
  return connection.connection
}

export default connectDB
