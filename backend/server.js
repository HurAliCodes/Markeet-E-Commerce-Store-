import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { logger } from './logger.js';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// Routes Import
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import metaRouter from './routes/metaRoute.js';
import reviewRouter from './routes/reviewRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  'https://yourdomain.com',
  'https://yourdomain.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
};

// Connect to DB
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); 
app.use(cors(corsOptions));
app.use(logger())

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/meta', metaRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});