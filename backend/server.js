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
  origin: process.env.FRONTEND_URL || '*', // Use environment variable for frontend URL or default to '*'
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

// Serve frontend build only in production
if (process.env.NODE_ENV === 'productio') {
  // Do not serve frontend files here if you're deploying frontend separately
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'productio' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
