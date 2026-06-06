import { getUsers } from "@/lib/db";
import AdminStudentsClient from "./students-client";

export default function AdminStudentsPage() {
  const users = getUsers();
  return <AdminStudentsClient initialStudents={users} />;
}
