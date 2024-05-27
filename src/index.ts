import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';

dotenv.config(); // Load các biến môi trường từ tệp .env

const app = express()
const port = process.env.PORT;

//connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb'

mongoose.connect(mongoURI).then(() => {
  console.log('Connect to MongoDB')
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error)
})

//đăng ký routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`)
})