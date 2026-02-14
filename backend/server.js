import express from 'express';
import db from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

const app = express();
const port = 5000;

// 1. Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// // 2. Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });


app.use("/api/doctors", doctorRoutes);

app.use("/api/data", dataRoutes);

// 3. Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});