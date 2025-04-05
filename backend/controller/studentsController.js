import * as studentModel from "../models/studentModel.js";

const validateStudentData = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("Name is required and should be a string.");
  }

  if (!data.dob || isNaN(Date.parse(data.dob))) {
    errors.push("Valid date of birth is required.");
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push("Valid email is required.");
  }

  if (!data.tamil || parseInt(data.tamil) < 0 || parseInt(data.tamil) > 100) {
    errors.push("Tamil marks should be a number between 0 and 100.");
  }

  if (!data.english || parseInt(data.english) < 0 || parseInt(data.english) > 100) {
    errors.push("English marks should be a number between 0 and 100.");
  }

  return errors;
};

export const getAllStudentsWithMarks = async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudentsWithMarks();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

export const getStudentByIdWithMarks = async (req, res, next) => {
  const studentId = req.params.id;

  // Basic validation for student ID
  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  try {
    const student = await studentModel.getStudentByIdWithMarks(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req, res, next) => {
  const { name, dob, email, tamil, english } = req.body;

  const validationErrors = validateStudentData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const newStudent = await studentModel.addStudentWithMarks(
      name,
      dob,
      email,
      tamil,
      english
    );
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  const { name, dob, email, tamil, english } = req.body;
  const studentId = req.params.id;

  // Basic validation for student ID
  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  // Validate the incoming data
  const validationErrors = validateStudentData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const updatedStudent = await studentModel.updateStudentWithMarks(
      studentId,
      name,
      dob,
      email,
      tamil,
      english
    );
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  const studentId = req.params.id;

  // Basic validation for student ID
  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  try {
    const deletedStudent = await studentModel.deleteStudent(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student and their marks deleted successfully" });
  } catch (err) {
    next(err);
  }
};
