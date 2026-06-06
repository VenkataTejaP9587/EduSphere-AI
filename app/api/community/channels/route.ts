import { NextRequest, NextResponse } from 'next/server';
import { getCommunityChannels, addCommunityChannel } from '@/lib/db';

// GET community channels
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const batchId = searchParams.get('batchId');
    
    const channels = getCommunityChannels(courseId || undefined, batchId || undefined);
    return NextResponse.json({ success: true, channels });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch channels' }, { status: 500 });
  }
}

// POST create channel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const channel = {
      id: `ch-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    addCommunityChannel(channel);
    return NextResponse.json({ success: true, channel });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create channel' }, { status: 500 });
  }
}
