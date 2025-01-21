import mongoose from "mongoose";


let initialized = false

export const connectDb = async (dbName: string = '') => {
  mongoose.set('strictQuery', true)

  if (initialized) {
    console.log('MongoDB already connected.')
    return
  }

  try {
    await mongoose.connect(`${process.env.MDB_A}${dbName}${process.env.MDB_B}`)
    initialized = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}