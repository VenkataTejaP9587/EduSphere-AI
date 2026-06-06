import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserById } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;
  if (!sessionId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = getUserById(sessionId);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  if (user.role === 'parent' && user.studentId) {
    const student = getUserById(user.studentId);
    if (student) {
      return NextResponse.json({ user: { ...user, studentData: student } });
    }
  }

  return NextResponse.json({ user });
}
