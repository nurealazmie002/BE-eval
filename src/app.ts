import express from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes'; 
import { errorHandler } from './middlewares/errorHandler'; 
import prisma from './prisma';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api', mainRouter);

app.use(errorHandler); 

app.listen(PORT, async () => {
  try {
    await prisma.$connect(); 
    console.log('✅ Database connected successfully');
    console.log(`🚀 Server is running on port ${PORT}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); 
  }
});