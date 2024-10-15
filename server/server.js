import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()

import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js'

connectDB();

const app = express() 
app.use(cors({ origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} port ${PORT}`.bgYellow);
    
})