import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  Button,
  Container,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function StudentList({ students, fetchStudents, handleEditClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState("");
  const studentsPerPage = 5;

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/students/${id}`);
          Swal.fire("Deleted", "Student removed successfully!", "success");
          fetchStudents();
        } catch (error) {
          Swal.fire("Error", "Failed to delete student", "error");
        }
      }
    });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const filteredStudents = students.filter((student) =>
    student.id.toString().includes(searchId)
  );

  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <Container className="mt-4" style={{ padding: "40px" }}>
      <div className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            width: "300px",
            margin: "0 auto",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
          }}
        />
      </div>

      <div className="student-table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {filteredStudents.length === 0 ? (
          <div className="text-center" style={{ fontSize: "18px", fontWeight: "bold", color: "#888" }}>
            No records found
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>English Mark</th>
                <th>Tamil Mark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents?.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.dob}</td>
                  <td>{student.email}</td>
                  <td>{student.englishMark}</td>
                  <td>{student.tamilMark}</td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Edit Student</Tooltip>}
                    >
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleEditClick(student)}
                      >
                        <FaEdit />
                      </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Delete Student</Tooltip>}
                    >
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination with Previous, Next and Arrow Marks */}
      {filteredStudents.length > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </Pagination.Prev>

            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Pagination.Prev>

            {[...Array(totalPages).keys()].map((num) => (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === currentPage}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Pagination.Next>

            <Pagination.Next
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </Pagination.Next>
          </Pagination>
        </div>
      )}
    </Container>
  );
}
