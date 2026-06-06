import { getUsers } from "@/lib/db";
import UsersClient from "./users-client";

export default function AdminUsersPage() {
  const users = getUsers();

  return (
    <UsersClient initialUsers={users} />
  );
}
