'use server';

import { addUser, deleteUser, User } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addStudent(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const parentName = formData.get('parentName') as string;
  const parentEmail = formData.get('parentEmail') as string;
  const batch = formData.get('batch') as string;

  const studentId = 'stu-' + Date.now();
  const parentId = 'par-' + Date.now();

  const newStudent: User = {
    id: studentId,
    name,
    email,
    password,
    role: 'student',
    level: 1,
    xp: 0,
    streak: 0,
    batch,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const newParent: User = {
    id: parentId,
    name: parentName,
    email: parentEmail,
    password: password, // Default to same password for simplicity
    role: 'parent',
    studentId: studentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  addUser(newStudent);
  addUser(newParent);

  revalidatePath('/admin/students');
  revalidatePath('/admin/users');

  return { student: newStudent };
}

export async function removeStudent(studentId: string) {
  deleteUser(studentId);
  revalidatePath('/admin/students');
  revalidatePath('/admin/users');
}
