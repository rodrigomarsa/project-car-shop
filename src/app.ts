import express from 'express';
import carRouter from './Routes/carRouter';
import motorcycleRouter from './Routes/motorcycleRouter';
import errorMiddleware from './Middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(errorMiddleware);

export default app;
