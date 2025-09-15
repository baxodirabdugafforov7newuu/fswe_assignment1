// Transcript manager

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

// RESET to initial students
export function initialize() {
  transcripts = [
    { student: { studentID: 1, studentName: "Sardor" }, grades: [] },
    { student: { studentID: 2, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 3, studentName: "Jasur" }, grades: [] },
    { student: { studentID: 4, studentName: "Nigora" }, grades: [] },
  ];
  nextID = 5;
}

// GET all transcripts
export function getAll(): Transcript[] {
  return transcripts;
}

// ADD student
export function addStudent(name: string): StudentID {
  const newStudent: Student = { studentID: nextID++, studentName: name };
  transcripts.push({ student: newStudent, grades: [] });
  return newStudent.studentID;
}

// GET transcript
export function getTranscript(studentID: StudentID): Transcript | undefined {
  return transcripts.find(t => t.student.studentID === studentID);
}

// GET ids by name
export function getStudentIDs(studentName: string): StudentID[] {
  return transcripts
    .filter(t => t.student.studentName === studentName)
    .map(t => t.student.studentID);
}

// DELETE student
export function deleteStudent(studentID: StudentID) {
  const idx = transcripts.findIndex(t => t.student.studentID === studentID);
  if (idx === -1) throw new Error("Student not found");
  transcripts.splice(idx, 1);
}

// ADD grade
export function addGrade(studentID: StudentID, course: Course, grade: number) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const exists = transcript.grades.find(g => g.course === course);
  if (exists) throw new Error("Grade already exists");

  transcript.grades.push({ course, grade });
}

// GET grade
export function getGrade(studentID: StudentID, course: Course): number {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const grade = transcript.grades.find(g => g.course === course);
  if (!grade) throw new Error("Grade not found");

  return grade.grade;
}

// UPDATE grade
export function updateGrade(studentID: StudentID, course: Course, grade: number) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const existing = transcript.grades.find(g => g.course === course);
  if (!existing) throw new Error("Grade not found");

  existing.grade = grade;
}

// DELETE grade
export function deleteGrade(studentID: StudentID, course: Course) {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");

  const idx = transcript.grades.findIndex(g => g.course === course);
  if (idx === -1) throw new Error("Grade not found");

  transcript.grades.splice(idx, 1);
}

// LIST grades
export function listGrades(studentID: StudentID): CourseGrade[] {
  const transcript = transcripts.find(t => t.student.studentID === studentID);
  if (!transcript) throw new Error("Student not found");
  return transcript.grades;
}

// RESET all
export function reset() {
  transcripts = [];
  nextID = 1;
}
