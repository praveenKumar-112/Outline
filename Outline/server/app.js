
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export default app;
