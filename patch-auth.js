const fs = require('fs');

const replacements = [
  {
    file: 'app/student/layout.tsx',
    find: `import { currentUser } from "@/lib/mock-data";`,
    replace: `import { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function StudentLayout({ children }: { children: React.ReactNode }) {`,
    replaceFunc: `export default function StudentLayout({ children }: { children: React.ReactNode }) {\n  const currentUser = useAuth();\n  if (!currentUser) return null;`
  },
  {
    file: 'app/admin/layout.tsx',
    find: `import { adminUser } from "@/lib/mock-data";`,
    replace: `import { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function AdminLayout({ children }: { children: React.ReactNode }) {`,
    replaceFunc: `export default function AdminLayout({ children }: { children: React.ReactNode }) {\n  const adminUser = useAuth();\n  if (!adminUser) return null;`
  },
  {
    file: 'app/faculty/layout.tsx',
    find: `import { facultyUser } from "@/lib/mock-data";`,
    replace: `import { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function FacultyLayout({ children }: { children: React.ReactNode }) {`,
    replaceFunc: `export default function FacultyLayout({ children }: { children: React.ReactNode }) {\n  const facultyUser = useAuth();\n  if (!facultyUser) return null;`
  },
  {
    file: 'app/student/page.tsx',
    find: `import { currentUser, courses, assignments, performanceData, subjectPerformance, aiRecommendations, leaderboard, badges } from "@/lib/mock-data";`,
    replace: `import { courses, assignments, performanceData, subjectPerformance, aiRecommendations, leaderboard, badges } from "@/lib/mock-data";\nimport { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function StudentDashboard() {`,
    replaceFunc: `export default function StudentDashboard() {\n  const currentUser = useAuth();\n  if (!currentUser) return null;`
  },
  {
    file: 'app/faculty/page.tsx',
    find: `import { facultyUser, performanceData, facultyStudents } from "@/lib/mock-data";`,
    replace: `import { performanceData, facultyStudents } from "@/lib/mock-data";\nimport { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function FacultyDashboard() {`,
    replaceFunc: `export default function FacultyDashboard() {\n  const facultyUser = useAuth();\n  if (!facultyUser) return null;`
  },
  {
    file: 'app/parent/page.tsx',
    find: `import { currentUser } from "@/lib/mock-data";`,
    replace: `import { useAuth } from "@/lib/auth-context";`,
    findFunc: `export default function ParentDashboard() {`,
    replaceFunc: `export default function ParentDashboard() {\n  const currentUser = useAuth();\n  if (!currentUser) return null;`
  }
];

for (const { file, find, replace, findFunc, replaceFunc } of replacements) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(find, replace);
  content = content.replace(findFunc, replaceFunc);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Patched ' + file);
}
