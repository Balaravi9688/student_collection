import pool from "../config/db.js";

const getAllStudentsWithMarks = async () => {
  const result = await pool.query(`
    SELECT s.id, s.name, s.dob, s.email, m.tamil, m.english
    FROM students s
    LEFT JOIN marks m ON s.id = m.student_id
  `);

  const formattedResult = result?.rows?.map((student) => {
    return {
      ...student,
      dob: student.dob.toISOString().split("T")[0],
    };
  });
  return formattedResult;
};


const getStudentByIdWithMarks = async (studentId) => {
  const result = await pool.query(
    `
    SELECT s.id, s.name, s.dob, s.email, m.tamil, m.english
    FROM students s
    LEFT JOIN marks m ON s.id = m.student_id
    WHERE s.id = $1
  `,
    [studentId]
  );
  return result.rows[0];
};

const addStudentWithMarks = async (name, dob, email, tamil, english) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Insert student
    const studentResult = await client.query(
      "INSERT INTO students (name, dob, email) VALUES ($1, $2, $3) RETURNING id",
      [name, dob, email]
    );
    const studentId = studentResult.rows[0].id;

    // Insert marks for the student
    await client.query(
      "INSERT INTO marks (student_id, tamil, english) VALUES ($1, $2, $3)",
      [studentId, tamil, english]
    );

    await client.query("COMMIT");
    return { studentId, name, dob, email, tamil, english };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateStudentWithMarks = async (
  studentId,
  name,
  dob,
  email,
  tamil,
  english
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Update student
    await client.query(
      "UPDATE students SET name = $1, dob = $2, email = $3 WHERE id = $4",
      [name, dob, email, studentId]
    );

    // Update marks for the student
    await client.query(
      "UPDATE marks SET tamil = $1, english = $2 WHERE student_id = $3",
      [tamil, english, studentId]
    );

    await client.query("COMMIT");
    return { studentId, name, dob, email, tamil, english };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteStudent = async (studentId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM marks WHERE student_id = $1", [studentId]);

    const result = await client.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [studentId]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export {
  getAllStudentsWithMarks,
  getStudentByIdWithMarks,
  addStudentWithMarks,
  updateStudentWithMarks,
  deleteStudent,
};
