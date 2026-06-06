import { NextRequest, NextResponse } from 'next/server';
import { getProgressByUserAndCourse, addProgress } from '@/lib/db';

// GET progress
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    
    if (!userId || !courseId) {
      return NextResponse.json({ success: false, error: 'User ID and Course ID required' }, { status: 400 });
    }
    
    const progress = getProgressByUserAndCourse(userId, courseId);
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch progress' }, { status: 500 });
  }
}

// POST create/update progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const progress = {
      id: `prog-${Date.now()}`,
      ...body,
      completedAt: new Date().toISOString(),
    };
    addProgress(progress);
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update progress' }, { status: 500 });
  }
}
