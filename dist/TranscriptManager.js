"use strict";
// src/transcriptManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcripts = void 0;
exports.initialize = initialize;
exports.getAll = getAll;
exports.addStudent = addStudent;
exports.getTranscript = getTranscript;
exports.getStudentIDs = getStudentIDs;
exports.deleteStudent = deleteStudent;
exports.addGrade = addGrade;
exports.getGrade = getGrade;
exports.updateGrade = updateGrade;
exports.deleteGrade = deleteGrade;
exports.listGrades = listGrades;
exports.reset = reset;
var nextID = 5;
exports.transcripts = [
    { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
    { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
];
// ======================= FUNCTIONS =======================
// initializes the database with 4 students
function initialize() {
    exports.transcripts = [
        { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
        { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
        { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
        { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
    ];
    nextID = 5;
}
// returns a list of all transcripts
function getAll() {
    return exports.transcripts;
}
// creates empty transcript for student & returns new ID
function addStudent(name) {
    var newStudent = { studentID: nextID++, studentName: name };
    exports.transcripts.push({ student: newStudent, grades: [] });
    return newStudent.studentID;
}
// gets transcript for a student
function getTranscript(studentID) {
    return exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
}
// returns list of IDs for a given student name
function getStudentIDs(studentName) {
    return exports.transcripts
        .filter(function (t) { return t.student.studentName === studentName; })
        .map(function (t) { return t.student.studentID; });
}
// deletes a student
function deleteStudent(studentID) {
    var idx = exports.transcripts.findIndex(function (t) { return t.student.studentID === studentID; });
    if (idx === -1)
        throw new Error("Student not found");
    exports.transcripts.splice(idx, 1);
}
// adds a grade for a course
function addGrade(studentID, course, grade) {
    var transcript = exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
    if (!transcript)
        throw new Error("Student not found");
    var exists = transcript.grades.find(function (g) { return g.course === course; });
    if (exists)
        throw new Error("Grade for this course already exists");
    transcript.grades.push({ course: course, grade: grade });
}
// gets a grade
function getGrade(studentID, course) {
    var transcript = exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
    if (!transcript)
        throw new Error("Student not found");
    var grade = transcript.grades.find(function (g) { return g.course === course; });
    if (!grade)
        throw new Error("Grade not found");
    return grade.grade;
}
// updates a grade
function updateGrade(studentID, course, grade) {
    var transcript = exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
    if (!transcript)
        throw new Error("Student not found");
    var existing = transcript.grades.find(function (g) { return g.course === course; });
    if (!existing)
        throw new Error("Grade for course not found");
    existing.grade = grade;
}
// deletes a grade
function deleteGrade(studentID, course) {
    var transcript = exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
    if (!transcript)
        throw new Error("Student not found");
    var idx = transcript.grades.findIndex(function (g) { return g.course === course; });
    if (idx === -1)
        throw new Error("Grade for course not found");
    transcript.grades.splice(idx, 1);
}
// lists all grades for a student
function listGrades(studentID) {
    var transcript = exports.transcripts.find(function (t) { return t.student.studentID === studentID; });
    if (!transcript)
        throw new Error("Student not found");
    return transcript.grades;
}
// clears ALL transcripts
function reset() {
    exports.transcripts = [];
    nextID = 1;
}
