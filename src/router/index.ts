import express, { Router } from 'express';
import apparel from './apparel';

const router: Router  = express.Router();

export default (): express.Router => {
  apparel(router);
  return router;
};