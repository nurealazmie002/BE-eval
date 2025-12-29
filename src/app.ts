import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mainRouter from './routes/index.js'; 
import { errorHandler } from './middlewares/errorHandler.js'; 
import prisma from './prisma.js';
import { setupSwagger } from './swagger.js';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Perpustakaan API',
    documentation: '/api-docs',
    version: '1.0.0'
  });
});

setupSwagger(app);

app.use('/api', mainRouter);

app.use(errorHandler); 

export { app, prisma };

const startServer = async () => {
  try {
    await prisma.$connect(); 
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📖 API Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

startServer();