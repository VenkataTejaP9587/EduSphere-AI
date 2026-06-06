import { getCourses } from "@/lib/db";
import CoursesClient from "./courses-client";

export default function AdminCoursesPage() {
  const courses = getCourses();

  return (
    <CoursesClient initialCourses={courses} />
  );
}
