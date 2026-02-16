import db from '../config/db.js';

export const registerDoctor = async (req, res) => {
  try {
    const {
      full_name,
      gender,
      age,
      email,
      phone_number,
      city_id,
      speciality_id,
      institute_name,
      degree_name,
      experience_years,
      consultation_fee
    } = req.body;

    const profile_picture_url = req.file ? `/uploads/${req.file.filename}` : null;

    // --- 1. Basic Field Check ---
    if (!full_name || !email || !phone_number || !consultation_fee || !city_id || !speciality_id) {
      return res.status(400).json({ success: false, message: "Missing required fields (Name, Email, Phone, Fee, City, Speciality)" });
    }

    // --- 2. Email Validation (Regex) ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email Format" });
    }

    // --- 3. Phone Validation (10 Digits) ---
    if (phone_number.length < 10) {
      return res.status(400).json({ success: false, message: "Phone number must be at least 10 digits" });
    }

    // --- 4. Logic Checks ---
    if (age < 23 || age > 100) { // Doctors are usually adults!
      return res.status(400).json({ success: false, message: "Please provide a valid age (23-100)" });
    }
    if (consultation_fee < 0) {
      return res.status(400).json({ success: false, message: "Consultation Fee cannot be negative" });
    }

    const [existing] = await db.query(
      "SELECT id FROM doctors WHERE email = ? OR phone_number = ?",
      [email, phone_number]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Doctor with this Email or Phone already exists." });
    }

    const [cityCheck] = await db.query("SELECT id FROM cities WHERE id = ?", [city_id]);
    if (cityCheck.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid City Selected" });
    }

    const [specCheck] = await db.query("SELECT id FROM specialities WHERE id = ?", [speciality_id]);
    if (specCheck.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid Speciality Selected" });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const {
      search,
      city,
      speciality,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    const offset = (page - 1) * limit;
    const queryParams = [];

    let sql = `
      SELECT 
        d.id, d.full_name, d.gender, d.age, d.email, d.phone_number, 
        d.profile_picture_url, d.experience_years, d.consultation_fee, d.search_count,
        c.name as city_name, 
        s.name as speciality_name 
      FROM doctors d
      LEFT JOIN cities c ON d.city_id = c.id
      LEFT JOIN specialities s ON d.speciality_id = s.id
      WHERE 1=1
    `;

    if (city) {
      sql += ` AND c.name = ?`;
      queryParams.push(city);
    }

    if (speciality) {
      sql += ` AND s.name = ?`;
      queryParams.push(speciality);
    }

    if (search) {
      sql += ` AND (d.full_name LIKE ? OR s.name LIKE ?)`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    if (sort === 'top') {
      sql += ` ORDER BY d.search_count DESC`;
    } else {
      sql += ` ORDER BY d.id DESC`;
    }

    sql += ` LIMIT ? OFFSET ?`; //for pagination
    queryParams.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.query(sql, queryParams);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });

  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        d.*, 
        c.name as city_name, 
        s.name as speciality_name 
      FROM doctors d
      LEFT JOIN cities c ON d.city_id = c.id
      LEFT JOIN specialities s ON d.speciality_id = s.id
      WHERE d.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const doctor = rows[0];

    await db.query("UPDATE doctors SET search_count = search_count + 1 WHERE id = ?", [id]);

    res.json({
      success: true,
      data: doctor
    });

  } catch (error) {
    console.error("Get Doctor Details Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
