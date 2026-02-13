import db from '../config/db.js';

export const registerDoctor = async (req, res) => {
  try {
    const { 
      full_name, 
      gender, 
      age, 
      email, 
      phone_number, 
      city_id,         //id from dropdown
      speciality_id,   //id from dropdown
      institute_name, 
      degree_name, 
      experience_years, 
      consultation_fee 
    } = req.body;

    const profile_picture_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!full_name || !email || !consultation_fee || !city_id || !speciality_id) {
       return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const [existing] = await db.query(
      "SELECT id FROM doctors WHERE email = ? OR phone_number = ?", 
      [email, phone_number]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "Doctor with this Email or Phone already exists." });
    }

    const sql = `
      INSERT INTO doctors (
        full_name, gender, age, email, phone_number, profile_picture_url,
        city_id, speciality_id, institute_name, degree_name, experience_years, consultation_fee
      ) VALUES (?)
    `;

    const values = [
      full_name, gender, age, email, phone_number, profile_picture_url,
      city_id, speciality_id, institute_name, degree_name, experience_years, consultation_fee
    ];

    const [result] = await db.query(sql, [values]);

    res.status(201).json({
      success: true,
      message: "Doctor registered successfully!",
      doctorId: result.insertId
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error during registration" });
  }
};