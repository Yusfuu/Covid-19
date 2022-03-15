import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { db } from '@config/db';
import { limiter } from '@middlewares/limiter';
import { admin, auth, center, director, user } from '@routes/index';
import { session } from '@lib/session';
import jwt from 'express-jwt';
import cors from 'cors';

const app = express();

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'],
};

const checkJwt = jwt({
  secret: '51sQRtfbq8BOkhCtan0UGegua303sXFh',
  algorithms: ['HS256'],
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(session);
app.use(limiter);

app.get('/protected', checkJwt, (req, res) => {
  res.json({
    user: 'admin',
  });
});

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/admin', admin);
app.use('/api/director', director);
app.use('/api/center', center);

export const unauthorizedError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  next(error);
};

app.use(unauthorizedError);

const port = process.env.PORT || 5000;

// listen to port you specified
app.listen(port, async () => {
  const { connection } = await db();
  console.log(`🚀 Server ready at: http://localhost:${port}`);
  console.log(`👋 Connected to database successfully : ${connection.name}`);
});
