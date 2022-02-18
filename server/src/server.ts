import 'dotenv/config';
import express, { Response, Request } from 'express';
import compression from 'compression';
import { limiter } from '@middlewares/limiter';
import helmet from 'helmet';
import { db } from '@config/db';
import { User } from '@models/User';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

app.get('/hello', async (req: Request, res: Response) => {
  await User.create({
    avatar: 'https://avatars2.githubusercontent.com/u/17098281?s=460&v=4',
    email: 'john@gmail.com',
    name: 'John Doe',
  });
  res.send('Hello World 👋');
});

const port = process.env.PORT || 3000;
const host = process.env.APP_HOSTNAME || 'localhost';
const url = process.env.APP_URL || `http://${host}:${port}`;

// listen to port you specified
app.listen(port, async () => {
  console.log(`🚀 Server ready at: ${url}`);
  const { connection } = await db();
  console.log(`👋 Connected to database successfully : ${connection.name}`);
});
