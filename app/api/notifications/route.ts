import { NextRequest, NextResponse } from 'next/server';
import { getNotificationsByUser, addNotification, markNotificationAsRead } from '@/lib/db';

// GET notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }
    
    const notifications = getNotificationsByUser(userId);
    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

// POST create notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const notification = {
      id: `notif-${Date.now()}`,
      ...body,
      read: false,
      createdAt: new Date().toISOString(),
    };
    addNotification(notification);
    return NextResponse.json({ success: true, notification });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create notification' }, { status: 500 });
  }
}

// PUT mark notification as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId } = body;
    
    if (!notificationId) {
      return NextResponse.json({ success: false, error: 'Notification ID required' }, { status: 400 });
    }
    
    markNotificationAsRead(notificationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to mark notification as read' }, { status: 500 });
  }
}
