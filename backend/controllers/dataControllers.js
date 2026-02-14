import db from '../config/db.js';

export const getCities = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cities");
    res.json(rows);
  } catch (error) {
    console.error("Get Cities Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getSpecialities = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM specialities");
    res.json(rows);
  } catch (error) {
    console.error("Get Specialities Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};