import express from 'express';
import { getDealers } from '../controllers/dealersController';

const router = express.Router();

router.get('/', getDealers);

export default router;
