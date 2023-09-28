import express from 'express';
import session from 'express-session';
import { authRouter } from './routes/authRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notesRouter } from './routes/notesRouter';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from the frontend site
    credentials: true, // Allow frontend to send cookies to our API
  })
);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
