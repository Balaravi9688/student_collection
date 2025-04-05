import pool from "../config/db.js";

export const createTablesIfNotExists = async () => {
  const createStudentsTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      dob DATE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;

  const createMarksTableQuery = `
    CREATE TABLE IF NOT EXISTS marks (
      student_id INT PRIMARY KEY,
      tamil INT NOT NULL,
      english INT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(createStudentsTableQuery);
    await pool.query(createMarksTableQuery);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
