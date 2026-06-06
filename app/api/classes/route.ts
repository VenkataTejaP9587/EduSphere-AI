import { NextRequest, NextResponse } from 'next/server';
import { getClassesByCourse, addClass } from '@/lib/db';

// GET classes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    if (courseId) {
      const classes = getClassesByCourse(courseId);
      return NextResponse.json({ success: true, classes });
    }
    
    return NextResponse.json({ success: false, error: 'Course ID required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch classes' }, { status: 500 });
  }
}

// POST create class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const classItem = {
      id: `cls-${Date.now()}`,
      ...body,
      status: 'scheduled' as const,
      createdAt: new Date().toISOString(),
    };
    addClass(classItem);
    return NextResponse.json({ success: true, classItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create class' }, { status: 500 });
  }
}
