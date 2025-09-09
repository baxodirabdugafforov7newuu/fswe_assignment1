const express = require("express");
const app = express();
const PORT = 8080;

// Parse both form data (-d "x=y") and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initial transcripts
let transcripts = [
  { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
  { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
  { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
  { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
];
let nextID = 5;

// GET /transcripts/:id → fetch transcript
app.get("/transcripts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const transcript = transcripts.find(t => t.student.studentID === id);
  if (!transcript) return res.status(404).json({ error: "Transcript not found" });
  res.json(transcript);
});

// POST /transcripts/:id/:course -d grade=85 → add grade
app.post("/transcripts/:id/:course", (req, res) => {
  const id = parseInt(req.params.id);
  const course = req.params.course;
  const grade = parseInt(req.body.grade);

  const transcript = transcripts.find(t => t.student.studentID === id);
  if (!transcript) return res.status(404).json({ error: "Transcript not found" });

  // Add or update grade
  const existing = transcript.grades.find(g => g.course === course);
  if (existing) {
    existing.grade = grade;
  } else {
    transcript.grades.push({ course, grade });
  }
  res.send("OK");
});

// GET /transcripts/:id/:course → fetch one grade
app.get("/transcripts/:id/:course", (req, res) => {
  const id = parseInt(req.params.id);
  const course = req.params.course;

  const transcript = transcripts.find(t => t.student.studentID === id);
  if (!transcript) return res.status(404).json({ error: "Transcript not found" });

  const gradeEntry = transcript.grades.find(g => g.course === course);
  if (!gradeEntry) return res.status(404).json({ error: "Grade not found" });

  res.json({ studentID: id, course: gradeEntry.course, grade: gradeEntry.grade });
});

// POST /transcripts -d name=Aziza → create new transcript
app.post("/transcripts", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newTranscript = {
    student: { studentID: nextID++, studentName: name },
    grades: [],
  };
  transcripts.push(newTranscript);
  res.json({ studentID: newTranscript.student.studentID });
});

// GET /studentids?name=Jasur → return all IDs with that name
app.get("/studentids", (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: "Name query required" });

  const ids = transcripts
    .filter(t => t.student.studentName === name)
    .map(t => t.student.studentID);

  res.json(ids);
});

// Start server
app.listen(PORT, () => {
  console.log("Initial list of transcripts:");
  console.log(transcripts);
  console.log(`Express server now listening on localhost:${PORT}`);
});
