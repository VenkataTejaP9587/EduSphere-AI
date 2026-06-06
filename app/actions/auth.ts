'use server';

import { cookies } from 'next/headers';
import { getUserByEmail } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = getUserByEmail(email);

  if (!user || user.password !== password) {
    return { error: 'Invalid credentials' };
  }

  // Create a simple session cookie
  const cookieStore = await cookies();
  cookieStore.set('session', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  // Return redirect URLs
  if (user.role === 'admin') return { success: true, url: '/admin' };
  if (user.role === 'faculty') return { success: true, url: '/faculty' };
  if (user.role === 'student') return { success: true, url: '/student' };
  if (user.role === 'parent') return { success: true, url: '/parent' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;
  if (!sessionId) return null;
  const { getUserById } = await import('@/lib/db');
  return getUserById(sessionId);
}
