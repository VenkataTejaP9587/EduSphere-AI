import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb, saveDb } from '@/lib/db';
import type { User } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!['student', 'faculty'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const db = getDb();
    const existing = db.users.find(u => u.email === email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const prefix = role === 'student' ? 'stu' : 'fac';
    const newUser: User = {
      id: `${prefix}-${Date.now()}`,
      name,
      email,
      password, // plain text for demo; fine for hackathon
      role: role as 'student' | 'faculty',
      level: role === 'student' ? 1 : undefined,
      xp: role === 'student' ? 0 : undefined,
      streak: role === 'student' ? 0 : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveDb(db);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    const redirectUrl = role === 'student' ? '/student' : '/faculty';
    return NextResponse.json({ success: true, url: redirectUrl });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
