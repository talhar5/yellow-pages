import express from 'express';
const app = express();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config.js';
import userRouter from './user/userRouter.js'
import authRouter from './auth/authRouter.js';
import notesRouter from './notes/notesRouter.js';
import connectDb from './utils/connectdb.js';
// importing middlewares
import authenticateMiddleware from './middleware/authenticateMiddleware.js'
import setHeaders from './middleware/setHeaders.js'

// mouting middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(setHeaders);

app.get('/', (req, res) => {
    res.send("root path hit")
})

// mounting routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', authenticateMiddleware, notesRouter);

connectDb();
app.listen(config.PORT, () => {
    console.log("Server is listening on port: ", config.PORT)
})