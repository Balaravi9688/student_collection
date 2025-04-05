import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import "./App.css"

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/students`);
      setStudents(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  };

  const handleStudentAdded = () => {
    setShowModal(false);
    fetchStudents();
  };

  const handleEditClick = (data) => {
    setShowModal(true);
    setSelectedData(data);
  };

  return (
    <div className="container mt-4" style={{ padding: "40px", backgroundColor: "#f4f7fc", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="animated-title mb-0 text-center" style={{ marginLeft: "45px" }}>Students Collection</h1>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedData(null);
            setShowModal(true);
          }}
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            fontSize: "16px",
            padding: "10px 18px",
            marginRight: "42px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Add Student
        </Button>
      </div>

      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setShowModal={setShowModal}
        handleEditClick={handleEditClick}
      />

      <Modal
        show={showModal}
        onHide={() => {
          setSelectedData(null);
          setShowModal(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedData ? "Edit Existing Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <StudentForm
            onStudentAdded={handleStudentAdded}
            selectedData={selectedData}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => document.getElementById("submitStudentForm").click()}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
