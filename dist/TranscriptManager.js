var express = require("express");
var app = express();
var PORT = 8080;
// Parse both form data (-d "x=y") and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Initial transcripts
var transcripts = [
    { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
    { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
];
var nextID = 5;
// GET /transcripts/:id → fetch transcript
app.get("/transcripts/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var transcript = transcripts.find(function (t) { return t.student.studentID === id; });
    if (!transcript)
        return res.status(404).json({ error: "Transcript not found" });
    res.json(transcript);
});
// POST /transcripts/:id/:course -d grade=85 → add grade
app.post("/transcripts/:id/:course", function (req, res) {
    var id = parseInt(req.params.id);
    var course = req.params.course;
    var grade = parseInt(req.body.grade);
    var transcript = transcripts.find(function (t) { return t.student.studentID === id; });
    if (!transcript)
        return res.status(404).json({ error: "Transcript not found" });
    // Add or update grade
    var existing = transcript.grades.find(function (g) { return g.course === course; });
    if (existing) {
        existing.grade = grade;
    }
    else {
        transcript.grades.push({ course: course, grade: grade });
    }
    res.send("OK");
});
// GET /transcripts/:id/:course → fetch one grade
app.get("/transcripts/:id/:course", function (req, res) {
    var id = parseInt(req.params.id);
    var course = req.params.course;
    var transcript = transcripts.find(function (t) { return t.student.studentID === id; });
    if (!transcript)
        return res.status(404).json({ error: "Transcript not found" });
    var gradeEntry = transcript.grades.find(function (g) { return g.course === course; });
    if (!gradeEntry)
        return res.status(404).json({ error: "Grade not found" });
    res.json({ studentID: id, course: gradeEntry.course, grade: gradeEntry.grade });
});
// POST /transcripts -d name=Aziza → create new transcript
app.post("/transcripts", function (req, res) {
    var name = req.body.name;
    if (!name)
        return res.status(400).json({ error: "Name is required" });
    var newTranscript = {
        student: { studentID: nextID++, studentName: name },
        grades: [],
    };
    transcripts.push(newTranscript);
    res.json({ studentID: newTranscript.student.studentID });
});
// GET /studentids?name=Jasur → return all IDs with that name
app.get("/studentids", function (req, res) {
    var name = req.query.name;
    if (!name)
        return res.status(400).json({ error: "Name query required" });
    var ids = transcripts
        .filter(function (t) { return t.student.studentName === name; })
        .map(function (t) { return t.student.studentID; });
    res.json(ids);
});
// Start server
app.listen(PORT, function () {
    console.log("Initial list of transcripts:");
    console.log(transcripts);
    console.log("Express server now listening on localhost:".concat(PORT));
});
