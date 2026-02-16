import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4171",
  database: "doctor_discovery",
});

pool.getConnection()
  .then((connection) => {
    console.log("MySQL Connected Successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("MySQL Connection Failed:", err.message);
  });

export default pool;