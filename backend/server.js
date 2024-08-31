import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables from .env file
dotenv.config();
connectDB();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['https://campus-connect-8pea.vercel.app', 'https://cc-backend-eta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/api/config/cloudinary', (req, res) => {
  res.send(process.env.CLOUDINARY_URL);
});

app.get('/api/config/cloudinarypreset', (req, res) => {
  res.send(process.env.CLOUDINARY_UPLOAD_PRESET);
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Remove the production block since frontend is deployed separately
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error stack trace
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
