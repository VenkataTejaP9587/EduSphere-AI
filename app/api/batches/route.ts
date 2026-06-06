import { NextRequest, NextResponse } from 'next/server';
import { getBatches, getBatchesByCourse, addBatch } from '@/lib/db';

// GET batches
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    if (courseId) {
      const batches = getBatchesByCourse(courseId);
      return NextResponse.json({ success: true, batches });
    }
    
    const batches = getBatches();
    return NextResponse.json({ success: true, batches });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch batches' }, { status: 500 });
  }
}

// POST create batch
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const batch = {
      id: `bat-${Date.now()}`,
      ...body,
      enrolled: 0,
      createdAt: new Date().toISOString(),
    };
    addBatch(batch);
    return NextResponse.json({ success: true, batch });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create batch' }, { status: 500 });
  }
}
