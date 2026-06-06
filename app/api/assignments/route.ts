import { NextRequest, NextResponse } from 'next/server';
import { getAssignmentsByCourse, addAssignment, getSubmissionsByAssignment, addSubmission } from '@/lib/db';

// GET assignments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    if (courseId) {
      const assignments = getAssignmentsByCourse(courseId);
      return NextResponse.json({ success: true, assignments });
    }
    
    return NextResponse.json({ success: false, error: 'Course ID required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

// POST create assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const assignment = {
      id: `asgn-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    addAssignment(assignment);
    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create assignment' }, { status: 500 });
  }
}
