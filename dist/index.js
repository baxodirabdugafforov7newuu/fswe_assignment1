"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var TranscriptManager_1 = require("./TranscriptManager");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// ==================== ROUTES ====================
// Debugging: list all transcripts
app.get("/transcripts", function (req, res) {
    res.json((0, TranscriptManager_1.getAll)());
});
// Get transcript by student ID
app.get("/transcripts/:id", function (req, res) {
    var id = Number(req.params.id);
    var transcript = (0, TranscriptManager_1.getTranscript)(id);
    if (!transcript) {
        return res.status(404).json({ error: "Transcript not found" });
    }
    res.json(transcript);
});
// Add grade to a student in a course
app.post("/transcripts/:id/:course", function (req, res) {
    try {
        var id = Number(req.params.id);
        var course = req.params.course;
        var grade = Number(req.body.grade);
        if (isNaN(grade)) {
            return res.status(400).json({ error: "Grade must be a number" });
        }
        (0, TranscriptManager_1.addGrade)(id, course, grade);
        res.send("OK");
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Get grade for student in course
app.get("/transcripts/:id/:course", function (req, res) {
    try {
        var id = Number(req.params.id);
        var course = req.params.course;
        var grade = (0, TranscriptManager_1.getGrade)(id, course);
        res.json({ studentID: id, course: course, grade: grade });
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
// Add a new student
app.post("/transcripts", function (req, res) {
    var name = req.body.name;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    var id = (0, TranscriptManager_1.addStudent)(name);
    res.json({ studentID: id });
});
// Get student IDs by name (query parameter)
app.get("/studentids", function (req, res) {
    var name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: "Name query param is required" });
    }
    var ids = (0, TranscriptManager_1.getStudentIDs)(name);
    res.json(ids);
});
// Delete a student
app.delete("/transcripts/:id", function (req, res) {
    try {
        var id = Number(req.params.id);
        (0, TranscriptManager_1.deleteStudent)(id);
        res.send("Deleted");
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
// Update grade
app.put("/transcripts/:id/:course", function (req, res) {
    try {
        var id = Number(req.params.id);
        var course = req.params.course;
        var grade = Number(req.body.grade);
        if (isNaN(grade)) {
            return res.status(400).json({ error: "Grade must be a number" });
        }
        (0, TranscriptManager_1.updateGrade)(id, course, grade);
        res.send("Updated");
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Delete grade
app.delete("/transcripts/:id/:course", function (req, res) {
    try {
        var id = Number(req.params.id);
        var course = req.params.course;
        (0, TranscriptManager_1.deleteGrade)(id, course);
        res.send("Deleted");
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
// List grades for a student
app.get("/grades/:id", function (req, res) {
    try {
        var id = Number(req.params.id);
        var grades = (0, TranscriptManager_1.listGrades)(id);
        res.json(grades);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
// Reset database
app.post("/reset", function (req, res) {
    (0, TranscriptManager_1.reset)();
    res.send("Database reset");
});
// Initialize with 4 students
app.post("/initialize", function (req, res) {
    (0, TranscriptManager_1.initialize)();
    res.send("Initialized with 4 students");
});
// ==================== START SERVER ====================
app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});
