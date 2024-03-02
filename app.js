import express from 'express';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import corsOptions from './config/corsOptions.js';
import userRouter from './routes/users.js'
import globalErrorHandler from './utils/globalErrorHandler.js';

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

// app.use(cookieParser());

app.use('/users', userRouter);


app.use(globalErrorHandler);

export default app;