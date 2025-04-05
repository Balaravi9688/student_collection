import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

function StudentForm({ onStudentAdded, selectedData }) {

  const [student, setStudent] = useState({
    name: "",
    dob: "",
    email: "",
    english: "",
    tamil: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedData) {
      setStudent(selectedData);
    }
  }, [selectedData]);

  const validateForm = () => {
    let newErrors = {};

    if (!student.name.trim()) newErrors.name = "Name is required";
    if (!student.dob) newErrors.dob = "Date of Birth is required";
    if (!student.email.trim()) newErrors.email = "Email is required";
    if (!student.english)
      newErrors.english = "English Mark is required";
    if (!student.tamil) newErrors.tamil = "Tamil Mark is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      if (selectedData) {
        await axios.put(`${baseURL}/students/${selectedData.id}`, student);
      } else {
        await axios.post(`${baseURL}/students`, student);
      }
      Swal.fire("Success", "Student added successfully!", "success");
      onStudentAdded();
    } catch (error) {
      Swal.fire("Error", "Failed to add student", "error");
    }
  };

  return (
    <Form id="studentForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={student.dob}
          onChange={(e) => {
            setStudent({ ...student, dob: e.target.value });
          }}
          isInvalid={!!errors.dob}
        />
        <Form.Control.Feedback type="invalid">
          {errors.dob}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>English Mark</Form.Label>
        <Form.Control
          type="number"
          value={student.english}
          onChange={(e) =>
            setStudent({ ...student, english: e.target.value })
          }
          isInvalid={!!errors.english}
        />
        <Form.Control.Feedback type="invalid">
          {errors.english}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tamil Mark</Form.Label>
        <Form.Control
          type="number"
          value={student.tamil}
          onChange={(e) =>
            setStudent({ ...student, tamil: e.target.value })
          }
          isInvalid={!!errors.tamil}
        />
        <Form.Control.Feedback type="invalid">
          {errors.tamil}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Hidden Submit Button (Clicked via Modal Footer Button) */}
      <button
        type="submit"
        id="submitStudentForm"
        style={{ display: "none" }}
      ></button>
    </Form>
  );
}

export default StudentForm;
