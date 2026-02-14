import express from 'express';
import { getCities, getSpecialities } from '../controllers/dataControllers.js';

const router = express.Router();

router.get('/cities', getCities);
router.get('/specialities', getSpecialities);

export default router;