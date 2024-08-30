import mongoose from 'mongoose'
import 'dotenv/config'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for sockets
      retryWrites: true // Enable retryable writes
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  }
}

export default connectDB
