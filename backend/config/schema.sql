-- 1.cities Table
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 2.Specialities Table
CREATE TABLE specialities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 3.Doctors Table
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    age INT, 
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    profile_picture_url TEXT,
    institute_name VARCHAR(255),
    degree_name VARCHAR(255),
    experience_years INT DEFAULT 0,
    consultation_fee DECIMAL(10, 2) NOT NULL,
    search_count INT DEFAULT 0,
    city_id INT,
    speciality_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);