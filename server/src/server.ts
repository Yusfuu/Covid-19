import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import { limiter } from '@middlewares/limiter';
import helmet from 'helmet';
import { db } from '@config/db';
import { user } from '@routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

// All routes should live here
app.use('/api/user', user);

const port = process.env.PORT || 5000;

// listen to port you specified
app.listen(port, async () => {
  console.log(`🚀 Server ready at: ${port}`);
  const { connection } = await db();
  console.log(`👋 Connected to database successfully : ${connection.name}`);
});
