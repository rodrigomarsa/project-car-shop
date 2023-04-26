import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router.route('/cars')
  .post((req, res, next) => new CarController(req, res, next).create())
  .get((req, res, next) => new CarController(req, res, next).getAll());

router.route('/cars/:id')
  .get((req, res, next) => new CarController(req, res, next).getById())
  .put((req, res, next) => new CarController(req, res, next).updateById());

export default router;