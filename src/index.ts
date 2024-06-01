import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'; // Sửa lại import authRoutes
import dotenv from 'dotenv';
import errorHandler from './middlewares/error/error.middleware';
import { logger } from './logger/winston.config';
dotenv.config(); // Load các biến môi trường từ tệp .env

const app = express();
const port = process.env.PORT;

// export {logger}

// Kết nối tới MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb';

mongoose.connect(mongoURI).then(() => {
  logger.info('Connected to MongoDB');
}).catch((error) => {
  logger.error('Failed to connect to MongoDB', error);
});

// Đăng ký routes
app.use('/api/v1', [userRoutes, authRoutes]);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
