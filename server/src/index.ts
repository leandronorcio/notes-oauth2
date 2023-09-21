import express from 'express';
import session from 'express-session';
import { authRouter } from './routes/authRouter';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
