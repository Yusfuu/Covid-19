import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { db } from '@config/db';
import { limiter } from '@middlewares/limiter';
import { admin, center, user } from '@routes/index';
import cors from 'cors';

const app = express();

const corsOptions = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

// All routes should live here.
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});
app.use('/api/user', user);
app.use('/api/admin', admin);
app.use('/api/center', center);

const port = process.env.PORT || 5000;

// listen to port you specified
app.listen(port, async () => {
  const { connection } = await db();
  console.log(`🚀 Server ready at: http://localhost:${port}`);
  console.log(`👋 Connected to database successfully : ${connection.name}`);
});
