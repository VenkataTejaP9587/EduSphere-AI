import { NextRequest, NextResponse } from 'next/server';
import { getAttendanceByUser, addAttendance } from '@/lib/db';

// GET attendance
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }
    
    const attendance = getAttendanceByUser(userId);
    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

// POST mark attendance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const attendance = {
      id: `att-${Date.now()}`,
      ...body,
      markedAt: new Date().toISOString(),
    };
    addAttendance(attendance);
    return NextResponse.json({ success: true, attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to mark attendance' }, { status: 500 });
  }
}
