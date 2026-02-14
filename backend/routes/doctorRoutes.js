import express from 'express';
import upload from '../middlewares/multer.js'; 
import { registerDoctor , getDoctors, getDoctorById } from '../controllers/doctorControllers.js';

const router = express.Router();

router.post('/register', upload.single('profile_picture'), registerDoctor);
router.get('/list', getDoctors);
router.get('/:id', getDoctorById);
export default router;