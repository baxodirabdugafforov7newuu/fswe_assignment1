import express, { Request, Response } from "express";
import {
  transcripts,
  initialize,
  getAll,
  addStudent,
  getTranscript,
  getStudentIDs,
  deleteStudent,
  addGrade,
  getGrade,
  updateGrade,
  deleteGrade,
  listGrades,
  reset,
} from "./TranscriptManager";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================== ROUTES ====================

// Debugging: list all transcripts
app.get("/transcripts", (req: Request, res: Response) => {
  res.json(getAll());
});

// Get transcript by student ID
app.get("/transcripts/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const transcript = getTranscript(id);
  if (!transcript) {
    return res.status(404).json({ error: "Transcript not found" });
  }
  res.json(transcript);
});

// Add grade to a student in a course
app.post("/transcripts/:id/:course", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = req.params.course;
    const grade = Number(req.body.grade);

    if (isNaN(grade)) {
      return res.status(400).json({ error: "Grade must be a number" });
    }

    addGrade(id, course, grade);
    res.send("OK");
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get grade for student in course
app.get("/transcripts/:id/:course", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = req.params.course;
    const grade = getGrade(id, course);
    res.json({ studentID: id, course, grade });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// Add a new student
app.post("/transcripts", (req: Request, res: Response) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const id = addStudent(name);
  res.json({ studentID: id });
});

// Get student IDs by name (query parameter)
app.get("/studentids", (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (!name) {
    return res.status(400).json({ error: "Name query param is required" });
  }
  const ids = getStudentIDs(name);
  res.json(ids);
});

// Delete a student
app.delete("/transcripts/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    deleteStudent(id);
    res.send("Deleted");
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// Update grade
app.put("/transcripts/:id/:course", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = req.params.course;
    const grade = Number(req.body.grade);

    if (isNaN(grade)) {
      return res.status(400).json({ error: "Grade must be a number" });
    }

    updateGrade(id, course, grade);
    res.send("Updated");
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete grade
app.delete("/transcripts/:id/:course", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = req.params.course;
    deleteGrade(id, course);
    res.send("Deleted");
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// List grades for a student
app.get("/grades/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const grades = listGrades(id);
    res.json(grades);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// Reset database
app.post("/reset", (req: Request, res: Response) => {
  reset();
  res.send("Database reset");
});

// Initialize with 4 students
app.post("/initialize", (req: Request, res: Response) => {
  initialize();
  res.send("Initialized with 4 students");
});

// ==================== START SERVER ====================
app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
