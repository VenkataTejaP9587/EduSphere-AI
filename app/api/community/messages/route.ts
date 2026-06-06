import { NextRequest, NextResponse } from 'next/server';
import { getMessagesByChannel, addCommunityMessage } from '@/lib/db';

// GET messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    
    if (!channelId) {
      return NextResponse.json({ success: false, error: 'Channel ID required' }, { status: 400 });
    }
    
    const messages = getMessagesByChannel(channelId);
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST create message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = {
      id: `msg-${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
      reactions: [],
      replies: 0,
    };
    addCommunityMessage(message);
    return NextResponse.json({ success: true, message });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create message' }, { status: 500 });
  }
}
