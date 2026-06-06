import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionsByAssignment, getSubmissionsByUser, addSubmission } from '@/lib/db';

// GET submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');
    const userId = searchParams.get('userId');
    
    if (assignmentId) {
      const submissions = getSubmissionsByAssignment(assignmentId);
      return NextResponse.json({ success: true, submissions });
    }
    
    if (userId) {
      const submissions = getSubmissionsByUser(userId);
      return NextResponse.json({ success: true, submissions });
    }
    
    return NextResponse.json({ success: false, error: 'Assignment ID or User ID required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

// POST create submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const submission = {
      id: `sub-${Date.now()}`,
      ...body,
      submittedAt: new Date().toISOString(),
      status: body.status || 'submitted' as const,
    };
    addSubmission(submission);
    return NextResponse.json({ success: true, submission });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create submission' }, { status: 500 });
  }
}

// PUT grade submission
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, grade, feedback } = body;
    
    // In a real implementation, we would update the submission in the database
    // For now, we'll return success
    return NextResponse.json({ success: true, message: 'Submission graded successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to grade submission' }, { status: 500 });
  }
}
