import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();

router.route('/motorcycles')
  .post((req, res, next) => new MotorcycleController(req, res, next).create())
  .get((req, res, next) => new MotorcycleController(req, res, next).getAll());

router.route('/motorcycles/:id')
  .get((req, res, next) => new MotorcycleController(req, res, next).getById())
  .put((req, res, next) => new MotorcycleController(req, res, next).updateById())
  .delete((req, res, next) => new MotorcycleController(req, res, next).deleteById());

export default router;