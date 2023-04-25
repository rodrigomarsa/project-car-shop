import express from 'express';
import carRouter from './Routes/carRouter';
import errorMiddleware from './Middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(errorMiddleware);

export default app;
