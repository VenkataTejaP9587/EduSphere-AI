// Mock data for EduSphere AI platform

export const currentUser = {
  id: "stu-001",
  name: "Arjun Sharma",
  email: "arjun.sharma@edusphere.ai",
  role: "student",
  avatar: "",
  level: 12,
  xp: 2840,
  xpToNext: 3200,
  streak: 14,
  institution: "Delhi Institute of Technology",
  batch: "CS-2024-B",
  joinedAt: "2024-08-01",
};

export const facultyUser = {
  id: "fac-001",
  name: "Dr. Priya Nair",
  email: "priya.nair@edusphere.ai",
  role: "faculty",
  avatar: "",
  institution: "Delhi Institute of Technology",
  department: "Computer Science",
  coursesCount: 5,
  studentsCount: 312,
};

export const adminUser = {
  id: "adm-001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@edusphere.ai",
  role: "admin",
  avatar: "",
  institution: "Delhi Institute of Technology",
};

export const courses = [
  {
    id: "crs-001",
    title: "Full Stack Web Development",
    instructor: "Dr. Priya Nair",
    thumbnail: "",
    category: "Engineering",
    progress: 68,
    totalLectures: 85,
    completedLectures: 58,
    duration: "42h 30m",
    nextLesson: "React Hooks Deep Dive",
    color: "#6366f1",
    tags: ["React", "Node.js", "MongoDB"],
    enrolled: 312,
    rating: 4.8,
    status: "in_progress",
    level: "intermediate" as const,
  },
  {
    id: "crs-002",
    title: "Data Structures & Algorithms",
    instructor: "Prof. Amit Verma",
    thumbnail: "",
    category: "Computer Science",
    progress: 45,
    totalLectures: 60,
    completedLectures: 27,
    duration: "30h 15m",
    nextLesson: "Graph Traversal Algorithms",
    color: "#22d3ee",
    tags: ["Algorithms", "Python", "C++"],
    enrolled: 285,
    rating: 4.9,
    status: "in_progress",
    level: "intermediate" as const,
  },
  {
    id: "crs-003",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sunita Patel",
    thumbnail: "",
    category: "AI/ML",
    progress: 92,
    totalLectures: 50,
    completedLectures: 46,
    duration: "25h 00m",
    nextLesson: "Neural Networks",
    color: "#a855f7",
    tags: ["Python", "TensorFlow", "Scikit-learn"],
    enrolled: 198,
    rating: 4.7,
    status: "nearly_done",
    level: "advanced" as const,
  },
  {
    id: "crs-004",
    title: "Cloud Computing & DevOps",
    instructor: "Mr. Rahul Singh",
    thumbnail: "",
    category: "Infrastructure",
    progress: 23,
    totalLectures: 45,
    completedLectures: 10,
    duration: "22h 45m",
    nextLesson: "Docker Containers",
    color: "#f59e0b",
    tags: ["AWS", "Docker", "Kubernetes"],
    enrolled: 156,
    rating: 4.6,
    status: "in_progress",
    level: "intermediate" as const,
  },
  {
    id: "crs-005",
    title: "Database Design & SQL",
    instructor: "Prof. Meena Krishnan",
    thumbnail: "",
    category: "Database",
    progress: 100,
    totalLectures: 35,
    completedLectures: 35,
    duration: "18h 20m",
    nextLesson: "Completed",
    color: "#10b981",
    tags: ["SQL", "PostgreSQL", "MongoDB"],
    enrolled: 220,
    rating: 4.8,
    status: "completed",
    level: "beginner" as const,
  },
];

export const assignments = [
  {
    id: "asgn-001",
    title: "Build a RESTful API with Node.js",
    course: "Full Stack Web Development",
    courseColor: "#6366f1",
    dueDate: "2026-05-28",
    submittedAt: null,
    status: "pending",
    priority: "high",
    marks: 100,
    description: "Create a complete REST API with CRUD operations, authentication, and error handling.",
    attachments: 2,
  },
  {
    id: "asgn-002",
    title: "Graph Algorithm Implementation",
    course: "Data Structures & Algorithms",
    courseColor: "#22d3ee",
    dueDate: "2026-05-30",
    submittedAt: null,
    status: "pending",
    priority: "medium",
    marks: 50,
    description: "Implement BFS, DFS, Dijkstra's and A* algorithms with visualization.",
    attachments: 0,
  },
  {
    id: "asgn-003",
    title: "Linear Regression from Scratch",
    course: "Machine Learning Fundamentals",
    courseColor: "#a855f7",
    dueDate: "2026-05-25",
    submittedAt: "2026-05-24",
    status: "submitted",
    priority: "high",
    marks: 75,
    description: "Implement linear regression without using scikit-learn.",
    attachments: 3,
  },
  {
    id: "asgn-004",
    title: "Docker Container Setup",
    course: "Cloud Computing & DevOps",
    courseColor: "#f59e0b",
    dueDate: "2026-06-02",
    submittedAt: null,
    status: "pending",
    priority: "low",
    marks: 40,
    description: "Containerize a web application using Docker and Docker Compose.",
    attachments: 1,
  },
  {
    id: "asgn-005",
    title: "Database Schema Design",
    course: "Database Design & SQL",
    courseColor: "#10b981",
    dueDate: "2026-05-10",
    submittedAt: "2026-05-09",
    status: "graded",
    grade: 92,
    priority: "high",
    marks: 60,
    feedback: "Excellent normalization and well-defined relationships. Minor improvements needed in indexing strategy.",
    attachments: 2,
  },
  {
    id: "asgn-006",
    title: "React Component Library",
    course: "Full Stack Web Development",
    courseColor: "#6366f1",
    dueDate: "2026-05-15",
    submittedAt: "2026-05-14",
    status: "graded",
    grade: 88,
    priority: "medium",
    marks: 80,
    feedback: "Great component design. Could improve performance with memoization.",
    attachments: 4,
  },
];

export const performanceData = [
  { month: "Jan", score: 72, attendance: 88, assignments: 85 },
  { month: "Feb", score: 78, attendance: 92, assignments: 90 },
  { month: "Mar", score: 75, attendance: 85, assignments: 88 },
  { month: "Apr", score: 82, attendance: 94, assignments: 92 },
  { month: "May", score: 88, attendance: 96, assignments: 95 },
  { month: "Jun", score: 85, attendance: 90, assignments: 91 },
];

export const weeklyActivityData = [
  { day: "Mon", hours: 2.5, videos: 4, quizzes: 1 },
  { day: "Tue", hours: 1.8, videos: 2, quizzes: 0 },
  { day: "Wed", hours: 3.2, videos: 6, quizzes: 2 },
  { day: "Thu", hours: 2.0, videos: 3, quizzes: 1 },
  { day: "Fri", hours: 4.1, videos: 8, quizzes: 3 },
  { day: "Sat", hours: 5.5, videos: 10, quizzes: 2 },
  { day: "Sun", hours: 3.8, videos: 7, quizzes: 1 },
];

export const subjectPerformance = [
  { subject: "Full Stack", score: 88, fullMark: 100 },
  { subject: "DSA", score: 72, fullMark: 100 },
  { subject: "ML", score: 85, fullMark: 100 },
  { subject: "Cloud", score: 65, fullMark: 100 },
  { subject: "Database", score: 92, fullMark: 100 },
];

export const weakTopics = [
  { topic: "Graph Algorithms", course: "DSA", score: 48, attempts: 3 },
  { topic: "Docker Networking", course: "DevOps", score: 52, attempts: 2 },
  { topic: "Backpropagation", course: "ML", score: 55, attempts: 4 },
  { topic: "System Calls", course: "OS", score: 61, attempts: 2 },
];

export const attendanceData = {
  overall: 87,
  bySubject: [
    { subject: "Full Stack", percentage: 94, present: 47, total: 50 },
    { subject: "DSA", percentage: 84, present: 42, total: 50 },
    { subject: "ML", percentage: 88, present: 44, total: 50 },
    { subject: "Cloud DevOps", percentage: 80, present: 40, total: 50 },
    { subject: "Database", percentage: 96, present: 48, total: 50 },
  ],
  calendar: {
    "2026-05-01": "present",
    "2026-05-02": "present",
    "2026-05-05": "present",
    "2026-05-06": "absent",
    "2026-05-07": "present",
    "2026-05-08": "late",
    "2026-05-09": "present",
    "2026-05-12": "present",
    "2026-05-13": "present",
    "2026-05-14": "absent",
    "2026-05-15": "present",
    "2026-05-16": "present",
    "2026-05-19": "present",
    "2026-05-20": "present",
    "2026-05-21": "present",
    "2026-05-22": "late",
    "2026-05-23": "present",
  },
};

export const communityChannels = [
  { id: "ch-001", name: "general", type: "text", unread: 12, category: "General" },
  { id: "ch-002", name: "announcements", type: "announcement", unread: 3, category: "General" },
  { id: "ch-003", name: "full-stack-dev", type: "text", unread: 28, category: "Courses" },
  { id: "ch-004", name: "dsa-help", type: "text", unread: 7, category: "Courses" },
  { id: "ch-005", name: "machine-learning", type: "text", unread: 5, category: "Courses" },
  { id: "ch-006", name: "doubts-qa", type: "text", unread: 15, category: "Support" },
  { id: "ch-007", name: "career-advice", type: "text", unread: 0, category: "Support" },
  { id: "ch-008", name: "project-showcase", type: "text", unread: 22, category: "Community" },
  { id: "ch-009", name: "study-groups", type: "voice", unread: 0, category: "Community" },
];

export const communityMessages = [
  {
    id: "msg-001",
    userId: "stu-042",
    userName: "Preethi K",
    userAvatar: "",
    message: "Can anyone help me understand the difference between BFS and DFS in terms of space complexity?",
    timestamp: "10:32 AM",
    reactions: [{ emoji: "👍", count: 5 }, { emoji: "🤔", count: 2 }],
    replies: 8,
  },
  {
    id: "msg-002",
    userId: "fac-001",
    userName: "Dr. Priya Nair",
    userAvatar: "",
    isFaculty: true,
    message: "Great question! BFS uses O(V) space due to the queue, while DFS uses O(H) where H is the height of the tree. For a balanced tree this is O(log n), but worst case is O(V).",
    timestamp: "10:45 AM",
    reactions: [{ emoji: "🙌", count: 14 }, { emoji: "❤️", count: 6 }],
    replies: 3,
  },
  {
    id: "msg-003",
    userId: "stu-023",
    userName: "Rohan Mehta",
    userAvatar: "",
    message: "Just deployed my React portfolio site! Used everything from the Full Stack course 🚀",
    timestamp: "11:15 AM",
    reactions: [{ emoji: "🔥", count: 21 }, { emoji: "👏", count: 18 }],
    replies: 12,
    image: true,
  },
  {
    id: "msg-004",
    userId: "stu-001",
    userName: "Arjun Sharma",
    userAvatar: "",
    isMe: true,
    message: "@Preethi K Also worth noting: DFS is better for pathfinding in mazes, BFS for shortest path in unweighted graphs!",
    timestamp: "11:22 AM",
    reactions: [{ emoji: "💡", count: 7 }],
    replies: 2,
  },
  {
    id: "msg-005",
    userId: "stu-067",
    userName: "Anjali Singh",
    userAvatar: "",
    message: "Assignment 3 submission closes in 3 hours! Don't forget everyone 😅",
    timestamp: "12:00 PM",
    reactions: [{ emoji: "😱", count: 9 }],
    replies: 5,
  },
];

export const aiChatHistory = [
  {
    id: 1,
    role: "ai",
    message: "Hello Arjun! 👋 I'm your AI Study Assistant. I can help you with doubts, generate practice questions, summarize topics, or create personalized study plans. What would you like to work on today?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    message: "Can you explain how neural networks learn through backpropagation?",
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    role: "ai",
    message: "Great topic! **Backpropagation** is the algorithm neural networks use to learn from mistakes. Here's how it works:\n\n**1. Forward Pass**\n- Input data flows through each layer\n- Each neuron applies weights, biases, and an activation function\n- Final output is compared to the expected output using a **loss function**\n\n**2. Backward Pass (Backprop)**\n- The error is propagated backwards through the network\n- Using **chain rule** from calculus, we compute the gradient of the loss with respect to each weight\n- Gradients tell us how much each weight contributed to the error\n\n**3. Weight Update**\n- Weights are updated using gradient descent:\n`W = W - α × ∂L/∂W`\n- α (learning rate) controls how big each update step is\n\nWould you like me to generate some practice questions on this topic, or should I explain vanishing gradients — a common challenge with backprop?",
    timestamp: "10:03 AM",
  },
  {
    id: 4,
    role: "user",
    message: "Yes! Generate 3 practice questions for me",
    timestamp: "10:05 AM",
  },
  {
    id: 5,
    role: "ai",
    message: "Here are 3 practice questions on Backpropagation:\n\n**Q1 (Easy)**\nWhat does the learning rate (α) control in gradient descent? What happens if it's too large or too small?\n\n**Q2 (Medium)**\nGiven a neural network with sigmoid activations, explain why deep networks suffer from the **vanishing gradient problem**. How does ReLU help solve this?\n\n**Q3 (Hard)**\nDerive the gradient update rule for a weight `w₁₂` connecting neuron 1 in layer 1 to neuron 2 in layer 2, given a mean squared error loss function. Show each step using the chain rule.\n\n---\nI've detected that Backpropagation is a **weak topic** for you based on your quiz history. Would you like me to create a 7-day revision plan for ML concepts?",
    timestamp: "10:06 AM",
  },
];

export const certificates = [
  {
    id: "cert-001",
    title: "Database Design & SQL",
    issuedDate: "2026-04-15",
    issuedBy: "Delhi Institute of Technology",
    credentialId: "DIT-DB-2026-001234",
    verifyUrl: "https://edusphere.ai/verify/DIT-DB-2026-001234",
    score: 92,
    grade: "A",
    skills: ["SQL", "PostgreSQL", "Database Design", "Query Optimization"],
    color: "#10b981",
  },
];

export const badges = [
  { id: "b-001", name: "First Login", emoji: "🌟", unlocked: true, description: "Logged in for the first time" },
  { id: "b-002", name: "Speed Learner", emoji: "⚡", unlocked: true, description: "Completed 5 videos in one day" },
  { id: "b-003", name: "Streak Master", emoji: "🔥", unlocked: true, description: "Maintained a 7-day streak" },
  { id: "b-004", name: "Quiz Champion", emoji: "🏆", unlocked: true, description: "Scored 100% on a quiz" },
  { id: "b-005", name: "Top Contributor", emoji: "💬", unlocked: true, description: "Answered 10 community questions" },
  { id: "b-006", name: "Night Owl", emoji: "🦉", unlocked: false, description: "Study after midnight 3 times" },
  { id: "b-007", name: "Course Master", emoji: "🎓", unlocked: false, description: "Complete 5 courses" },
  { id: "b-008", name: "Perfect Attendance", emoji: "📅", unlocked: false, description: "100% attendance for a month" },
];

export const studentNotifications = [
  { id: "n-s1", type: "assignment", title: "Assignment Due Tomorrow", body: "RESTful API assignment is due tomorrow at 11:59 PM", time: "2h ago", read: false },
  { id: "n-s2", type: "grade", title: "Assignment Graded", body: "Your Database Schema Design received 92/100", time: "5h ago", read: false },
  { id: "n-s3", type: "ai", title: "AI Recommendation", body: "Based on your performance, review Graph Algorithms today", time: "1d ago", read: true },
  { id: "n-s4", type: "community", title: "New Reply", body: "Dr. Priya Nair replied to your question in #dsa-help", time: "1d ago", read: true },
  { id: "n-s5", type: "class", title: "Class Starting in 15 min", body: "Machine Learning lecture starts at 2:00 PM", time: "2d ago", read: true },
];

export const facultyNotifications = [
  { id: "n-f1", type: "assignment", title: "New Submissions Received", body: "14 new student submissions for 'Build a RESTful API' ready to grade", time: "1h ago", read: false },
  { id: "n-f2", type: "grade", title: "Leave Request Submitted", body: "Student Arjun Sharma requested academic leave for Jun 10", time: "4h ago", read: false },
  { id: "n-f3", type: "class", title: "OS Class Starting", body: "Your Operating Systems lecture starts in 15 minutes", time: "6h ago", read: true },
  { id: "n-f4", type: "ai", title: "Quiz Published", body: "Graph Algorithm practice quiz was successfully published to CS-2024-B", time: "1d ago", read: true },
];

export const adminNotifications = [
  { id: "n-a1", type: "grade", title: "New Tenant Registrations", body: "32 student accounts successfully onboarded in the last 24 hours", time: "30m ago", read: false },
  { id: "n-a2", type: "ai", title: "Security Sentinel Alert", body: "Suspicious login pattern blocked from IP 192.168.1.105", time: "2h ago", read: false },
  { id: "n-a3", type: "assignment", title: "Payout Disbursed", body: "Weekly revenue balance transfer of ₹4.2L completed successfully", time: "12h ago", read: true },
  { id: "n-a4", type: "class", title: "System Database Backup", body: "Scheduled full DB sync backup completed (24.5 MB)", time: "1d ago", read: true },
];

export const parentNotifications = [
  { id: "n-p1", type: "grade", title: "Attendance Alert", body: "Your child Arjun Sharma was marked late for DSA class today", time: "3h ago", read: false },
  { id: "n-p2", type: "grade", title: "Internal Marks Published", body: "Arjun scored 46/50 (Excellent) in Software Engineering", time: "5h ago", read: false },
  { id: "n-p3", type: "assignment", title: "Fee Installment Due", body: "Next semester tuition installment of ₹12,000 is due by Jun 20", time: "1d ago", read: true },
  { id: "n-p4", type: "community", title: "Parent Teacher Meeting", body: "PTM scheduled for Saturday, Jun 13 at 10:00 AM", time: "2d ago", read: true },
];

export const notifications = studentNotifications;

export const facultyStudents = [
  { id: "s-001", name: "Arjun Sharma", batch: "CS-B", attendance: 87, assignments: 5, avgScore: 84, status: "good", lastActive: "Today", risk: "low" },
  { id: "s-002", name: "Preethi Kumar", batch: "CS-B", attendance: 72, assignments: 3, avgScore: 68, status: "at_risk", lastActive: "2 days ago", risk: "high" },
  { id: "s-003", name: "Rohan Mehta", batch: "CS-A", attendance: 95, assignments: 6, avgScore: 91, status: "excellent", lastActive: "Today", risk: "low" },
  { id: "s-004", name: "Anjali Singh", batch: "CS-A", attendance: 88, assignments: 5, avgScore: 79, status: "good", lastActive: "Yesterday", risk: "low" },
  { id: "s-005", name: "Vikram Rao", batch: "CS-B", attendance: 65, assignments: 2, avgScore: 55, status: "at_risk", lastActive: "5 days ago", risk: "critical" },
  { id: "s-006", name: "Nisha Patel", batch: "CS-A", attendance: 91, assignments: 6, avgScore: 88, status: "excellent", lastActive: "Today", risk: "low" },
  { id: "s-007", name: "Aditya Sinha", batch: "CS-B", attendance: 78, assignments: 4, avgScore: 73, status: "average", lastActive: "Yesterday", risk: "medium" },
  { id: "s-008", name: "Deepika Nair", batch: "CS-A", attendance: 93, assignments: 6, avgScore: 95, status: "excellent", lastActive: "Today", risk: "low" },
];

export const revenueData = [
  { month: "Jan", revenue: 285000, subscriptions: 145, refunds: 12000 },
  { month: "Feb", revenue: 312000, subscriptions: 158, refunds: 9000 },
  { month: "Mar", revenue: 298000, subscriptions: 152, refunds: 15000 },
  { month: "Apr", revenue: 345000, subscriptions: 175, refunds: 8000 },
  { month: "May", revenue: 389000, subscriptions: 198, refunds: 11000 },
  { month: "Jun", revenue: 421000, subscriptions: 214, refunds: 7000 },
];

export const platformStats = {
  totalStudents: 12847,
  totalFaculty: 287,
  totalCourses: 348,
  totalInstitutions: 24,
  monthlyRevenue: 421000,
  completionRate: 73,
  avgRating: 4.7,
  activeSessions: 1234,
};

export const leaderboard = [
  { rank: 1, name: "Deepika Nair", xp: 4280, level: 18, badge: "🏆", streak: 28 },
  { rank: 2, name: "Rohan Mehta", xp: 3920, level: 16, badge: "🥈", streak: 21 },
  { rank: 3, name: "Nisha Patel", xp: 3710, level: 15, badge: "🥉", streak: 19 },
  { rank: 4, name: "Aditya Sinha", xp: 3240, level: 14, badge: "⭐", streak: 15 },
  { rank: 5, name: "Anjali Singh", xp: 3080, level: 13, badge: "⭐", streak: 12 },
  { rank: 6, name: "Arjun Sharma", xp: 2840, level: 12, badge: "⭐", streak: 14, isMe: true },
  { rank: 7, name: "Vikram Rao", xp: 2640, level: 11, badge: "", streak: 8 },
  { rank: 8, name: "Preethi Kumar", xp: 2480, level: 10, badge: "", streak: 5 },
];

export const aiRecommendations = [
  {
    type: "weak_topic",
    title: "Review Graph Algorithms",
    body: "You scored below 60% in last 3 graph quizzes. Suggested: watch lecture 23 again.",
    action: "Start Revision",
    color: "#ef4444",
    icon: "AlertTriangle",
  },
  {
    type: "next_course",
    title: "You're Ready for System Design",
    body: "Based on your DSA and Full Stack progress, System Design is your next best course.",
    action: "Enroll Now",
    color: "#6366f1",
    icon: "Sparkles",
  },
  {
    type: "streak",
    title: "Maintain Your 14-Day Streak!",
    body: "Study at least 30 minutes today to keep your streak alive. You're in top 15%!",
    action: "Continue Learning",
    color: "#f59e0b",
    icon: "Flame",
  },
];
