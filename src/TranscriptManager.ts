// src/transcriptManager.ts

export type StudentID = number;
export type Student = { studentID: number; studentName: string };
export type Course = string;
export type CourseGrade = { course: Course; grade: number };
export type Transcript = { student: Student; grades: CourseGrade[] };

let nextID = 5;

export let transcripts: Transcript[] = [
  { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
  { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
  { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
  { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
];

// ======================= FUNCTIONS =======================

// initializes the database with 4 students
export function initialize() {
  transcripts = [
    { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
    { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
  ];
  nextID = 5;
}

// returns a list of all transcripts
export function getAll(): Transcript[] {
  return transcripts;
}

// creates empty transcript for student & returns new ID
export function addStudent(name: string): StudentID {
  const newStudent: Student = { studentID: nextID++, studentName: name };
  transcripts.push({ student: newStudent, grades: [] });
  return newStudent.studentID;
}

// gets transcript for a student
export function getTranscript(studentID: StudentID): Transcript | undefined {
  return transcripts.find(t => t.student.studentID === studentID);
}

// returns list of IDs for a given student name
export function getStudentIDs(studentName: string): StudentID[] {
  return transcripts
    .filter(t => t.student.studentName === studentName)
    .map(t => t.student.studentID);
}

// deletes a student
export function deleteStudent(studentID: StudentID) {
  const idx = transcripts.findIndex(t => t.student.studentID === studentID);
  if (idx === -1) throw new Error("Student not found");
  transcripts.splice(idx, 1);
}

// adds a grade for a course
export function addGrade(studentID: StudentID, course: Course, grade: number) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const exists = transcript.grades.find(g => g.course === course);
  if (exists) throw new Error("Grade for this course already exists");

  transcript.grades.push({ course, grade });
}

// gets a grade
export function getGrade(studentID: StudentID, course: Course): number {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const grade = transcript.grades.find(g => g.course === course);
  if (!grade) throw new Error("Grade not found");

  return grade.grade;
}

// updates a grade
export function updateGrade(studentID: StudentID, course: Course, grade: number) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const existing = transcript.grades.find(g => g.course === course);
  if (!existing) throw new Error("Grade for course not found");

  existing.grade = grade;
}

// deletes a grade
export function deleteGrade(studentID: StudentID, course: Course) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const idx = transcript.grades.findIndex(g => g.course === course);
  if (idx === -1) throw new Error("Grade for course not found");

  transcript.grades.splice(idx, 1);
}

// lists all grades for a student
export function listGrades(studentID: StudentID): CourseGrade[] {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");
  return transcript.grades;
}

// clears ALL transcripts
export function reset() {
  transcripts = [];
  nextID = 1;
}
