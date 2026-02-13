const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4171",
  database: "doctor_discovery"
});

pool.getConnection((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = pool.promise();