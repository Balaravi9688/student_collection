import { Router } from "express";
import * as studentController from "../controller/studentsController.js";

const router = Router();

router.get("/", studentController.getAllStudentsWithMarks );
router.get("/:id", studentController.getStudentByIdWithMarks );
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export default router;
