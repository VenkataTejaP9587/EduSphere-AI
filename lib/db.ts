import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'faculty' | 'student' | 'parent';
  avatar?: string;
  institution?: string;
  batch?: string;
  studentId?: string; // For parents
  level?: number;
  xp?: number;
  streak?: number;
  department?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Institution {
  id: string;
  name: string;
  campus: string;
  departments: number;
  students: number;
  renewal: string;
  tier: 'standard' | 'enterprise';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  thumbnail?: string;
  category: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  totalLectures: number;
  enrolled: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoDuration?: number;
  order: number;
  isFree: boolean;
  createdAt: string;
}

export interface Batch {
  id: string;
  courseId: string;
  name: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  status: 'upcoming' | 'active' | 'completed';
  facultyId: string;
  schedule?: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  batchId?: string;
  enrolledAt: string;
  progress: number;
  completedAt?: string;
  status: 'active' | 'completed' | 'dropped';
}

export interface FeeStructure {
  id: string;
  courseId: string;
  batchId?: string;
  name: string;
  amount: number;
  dueDate: string;
  type: 'one-time' | 'installment';
  installmentNumber?: number;
}

export interface Payment {
  id: string;
  userId: string;
  feeStructureId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  batchId?: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  attachments?: string[];
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  submittedAt: string;
  files?: string[];
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface Class {
  id: string;
  courseId: string;
  batchId?: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  meetingUrl?: string;
  recordingUrl?: string;
  facultyId: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Attendance {
  id: string;
  userId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedAt: string;
}

export interface CommunityChannel {
  id: string;
  courseId?: string;
  batchId?: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  category: string;
  createdAt: string;
}

export interface CommunityMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  replies?: number;
  image?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'grade' | 'class' | 'fee' | 'community' | 'announcement';
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  credentialId: string;
  verifyUrl: string;
  score: number;
  grade: string;
  skills: string[];
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completedAt: string;
  watchTime: number;
}

export interface Database {
  users: User[];
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  batches: Batch[];
  enrollments: Enrollment[];
  feeStructures: FeeStructure[];
  payments: Payment[];
  assignments: Assignment[];
  assignmentSubmissions: AssignmentSubmission[];
  classes: Class[];
  attendance: Attendance[];
  communityChannels: CommunityChannel[];
  communityMessages: CommunityMessage[];
  notifications: Notification[];
  certificates: Certificate[];
  progress: Progress[];
  institutions: Institution[];
}

export function getDb(): Database {
  const defaultDb: Database = {
    users: [],
    courses: [],
    modules: [],
    lessons: [],
    batches: [],
    enrollments: [],
    feeStructures: [],
    payments: [],
    assignments: [],
    assignmentSubmissions: [],
    classes: [],
    attendance: [],
    communityChannels: [],
    communityMessages: [],
    notifications: [],
    certificates: [],
    progress: [],
    institutions: [
      { id: "inst-001", name: "Delhi Institute of Technology", campus: "New Delhi, India", departments: 12, students: 4850, renewal: "2026-12-15", tier: "enterprise", status: "active", createdAt: new Date().toISOString() },
      { id: "inst-002", name: "Mumbai Tech University", campus: "Mumbai, India", departments: 8, students: 3120, renewal: "2027-01-20", tier: "enterprise", status: "active", createdAt: new Date().toISOString() },
      { id: "inst-003", name: "Bangalore Science College", campus: "Bangalore, India", departments: 6, students: 1200, renewal: "2026-10-08", tier: "standard", status: "active", createdAt: new Date().toISOString() },
      { id: "inst-004", name: "Chennai Engineering Academy", campus: "Chennai, India", departments: 14, students: 3677, renewal: "2026-08-11", tier: "enterprise", status: "inactive", createdAt: new Date().toISOString() },
    ],
  };

  if (!fs.existsSync(DB_FILE)) {
    saveDb(defaultDb);
    return defaultDb;
  }

  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(data) as Partial<Database>;
    
    // Merge parsed DB with defaults to ensure missing collections are initialized
    const mergedDb: Database = {
      users: parsed.users || [],
      courses: parsed.courses || [],
      modules: parsed.modules || [],
      lessons: parsed.lessons || [],
      batches: parsed.batches || [],
      enrollments: parsed.enrollments || [],
      feeStructures: parsed.feeStructures || [],
      payments: parsed.payments || [],
      assignments: parsed.assignments || [],
      assignmentSubmissions: parsed.assignmentSubmissions || [],
      classes: parsed.classes || [],
      attendance: parsed.attendance || [],
      communityChannels: parsed.communityChannels || [],
      communityMessages: parsed.communityMessages || [],
      notifications: parsed.notifications || [],
      certificates: parsed.certificates || [],
      progress: parsed.progress || [],
      institutions: parsed.institutions || defaultDb.institutions,
    };
    
    return mergedDb;
  } catch (error) {
    console.error("Error reading or parsing database file. Using defaults.", error);
    return defaultDb;
  }
}

export function saveDb(db: Database) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

// User operations
export function getUsers() {
  return getDb().users;
}

export function getUserById(id: string) {
  return getDb().users.find(u => u.id === id);
}

export function getUserByEmail(email: string) {
  return getDb().users.find(u => u.email === email);
}

export function addUser(user: User) {
  const db = getDb();
  db.users.push(user);
  saveDb(db);
}

export function deleteUser(id: string) {
  const db = getDb();
  db.users = db.users.filter(u => u.id !== id);
  db.users = db.users.filter(u => u.studentId !== id);
  saveDb(db);
}

// Course operations
export function getCourses() {
  return getDb().courses;
}

export function getCourseById(id: string) {
  return getDb().courses.find(c => c.id === id);
}

export function getCoursesByInstructor(instructorId: string) {
  return getDb().courses.filter(c => c.instructorId === instructorId);
}

export function addCourse(course: Course) {
  const db = getDb();
  db.courses.push(course);
  saveDb(db);
}

export function updateCourse(id: string, updates: Partial<Course>) {
  const db = getDb();
  const index = db.courses.findIndex(c => c.id === id);
  if (index !== -1) {
    db.courses[index] = { ...db.courses[index], ...updates, updatedAt: new Date().toISOString() };
    saveDb(db);
  }
}

export function deleteCourse(id: string) {
  const db = getDb();
  db.courses = db.courses.filter(c => c.id !== id);
  saveDb(db);
}

// Module operations
export function getModulesByCourse(courseId: string) {
  return getDb().modules.filter(m => m.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function addModule(module: Module) {
  const db = getDb();
  db.modules.push(module);
  saveDb(db);
}

// Lesson operations
export function getLessonsByModule(moduleId: string) {
  return getDb().lessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function addLesson(lesson: Lesson) {
  const db = getDb();
  db.lessons.push(lesson);
  saveDb(db);
}

// Batch operations
export function getBatches() {
  return getDb().batches;
}

export function getBatchesByCourse(courseId: string) {
  return getDb().batches.filter(b => b.courseId === courseId);
}

export function addBatch(batch: Batch) {
  const db = getDb();
  db.batches.push(batch);
  saveDb(db);
}

// Enrollment operations
export function getEnrollmentsByUser(userId: string) {
  return getDb().enrollments.filter(e => e.userId === userId);
}

export function getEnrollmentsByCourse(courseId: string) {
  return getDb().enrollments.filter(e => e.courseId === courseId);
}

export function addEnrollment(enrollment: Enrollment) {
  const db = getDb();
  db.enrollments.push(enrollment);
  saveDb(db);
}

// Fee operations
export function getFeeStructuresByCourse(courseId: string) {
  return getDb().feeStructures.filter(f => f.courseId === courseId);
}

export function addFeeStructure(fee: FeeStructure) {
  const db = getDb();
  db.feeStructures.push(fee);
  saveDb(db);
}

// Payment operations
export function getPaymentsByUser(userId: string) {
  return getDb().payments.filter(p => p.userId === userId);
}

export function addPayment(payment: Payment) {
  const db = getDb();
  db.payments.push(payment);
  saveDb(db);
}

// Assignment operations
export function getAssignmentsByCourse(courseId: string) {
  return getDb().assignments.filter(a => a.courseId === courseId);
}

export function addAssignment(assignment: Assignment) {
  const db = getDb();
  db.assignments.push(assignment);
  saveDb(db);
}

// Assignment submission operations
export function getSubmissionsByAssignment(assignmentId: string) {
  return getDb().assignmentSubmissions.filter(s => s.assignmentId === assignmentId);
}

export function getSubmissionsByUser(userId: string) {
  return getDb().assignmentSubmissions.filter(s => s.userId === userId);
}

export function addSubmission(submission: AssignmentSubmission) {
  const db = getDb();
  db.assignmentSubmissions.push(submission);
  saveDb(db);
}

// Class operations
export function getClassesByCourse(courseId: string) {
  return getDb().classes.filter(c => c.courseId === courseId);
}

export function addClass(classItem: Class) {
  const db = getDb();
  db.classes.push(classItem);
  saveDb(db);
}

// Attendance operations
export function getAttendanceByUser(userId: string) {
  return getDb().attendance.filter(a => a.userId === userId);
}

export function addAttendance(attendance: Attendance) {
  const db = getDb();
  db.attendance.push(attendance);
  saveDb(db);
}

// Community operations
export function getCommunityChannels(courseId?: string, batchId?: string) {
  const db = getDb();
  return db.communityChannels.filter(c => {
    if (courseId && c.courseId !== courseId) return false;
    if (batchId && c.batchId !== batchId) return false;
    return true;
  });
}

export function addCommunityChannel(channel: CommunityChannel) {
  const db = getDb();
  db.communityChannels.push(channel);
  saveDb(db);
}

export function getMessagesByChannel(channelId: string) {
  return getDb().communityMessages.filter(m => m.channelId === channelId);
}

export function addCommunityMessage(message: CommunityMessage) {
  const db = getDb();
  db.communityMessages.push(message);
  saveDb(db);
}

// Notification operations
export function getNotificationsByUser(userId: string) {
  return getDb().notifications.filter(n => n.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addNotification(notification: Notification) {
  const db = getDb();
  db.notifications.push(notification);
  saveDb(db);
}

export function markNotificationAsRead(notificationId: string) {
  const db = getDb();
  const index = db.notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    db.notifications[index].read = true;
    saveDb(db);
  }
}

// Certificate operations
export function getCertificatesByUser(userId: string) {
  return getDb().certificates.filter(c => c.userId === userId);
}

export function addCertificate(certificate: Certificate) {
  const db = getDb();
  db.certificates.push(certificate);
  saveDb(db);
}

// Progress operations
export function getProgressByUserAndCourse(userId: string, courseId: string) {
  return getDb().progress.filter(p => p.userId === userId && p.courseId === courseId);
}

export function addProgress(progress: Progress) {
  const db = getDb();
  db.progress.push(progress);
  saveDb(db);
}

// Institution operations
export function getInstitutions() {
  return getDb().institutions || [];
}

export function addInstitution(institution: Institution) {
  const db = getDb();
  if (!db.institutions) db.institutions = [];
  db.institutions.push(institution);
  saveDb(db);
}
