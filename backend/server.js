import express from 'express';
import db from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import cors from 'cors';

const app = express();
const port = 5000;

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/doctors", doctorRoutes);
app.use("/api/data", dataRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});