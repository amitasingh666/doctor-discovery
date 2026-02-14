import express from 'express';
import upload from '../middlewares/multer.js'; 
import { registerDoctor } from '../controllers/doctorControllers.js';

const router = express.Router();

router.post('/register', upload.single('profile_picture'), registerDoctor);

export default router;