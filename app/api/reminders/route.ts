import { NextRequest, NextResponse } from 'next/server';
import { getPaymentsByUser, getUserById, getFeeStructuresByCourse, addNotification } from '@/lib/db';

// GET payment reminders for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const payments = getPaymentsByUser(userId);
    const pendingPayments = payments.filter(p => p.status === 'pending');
    
    // Calculate days until due
    const reminders = pendingPayments.map(payment => {
      const feeStructure = getFeeStructuresByCourse(payment.feeStructureId)[0];
      const dueDate = feeStructure ? new Date(feeStructure.dueDate) : new Date();
      const today = new Date();
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        paymentId: payment.id,
        feeStructureId: payment.feeStructureId,
        amount: payment.amount,
        dueDate: feeStructure?.dueDate,
        daysUntilDue,
        urgency: daysUntilDue <= 0 ? 'overdue' : daysUntilDue <= 3 ? 'urgent' : daysUntilDue <= 7 ? 'upcoming' : 'normal',
      };
    });

    return NextResponse.json({ success: true, reminders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reminders' }, { status: 500 });
  }
}

// POST trigger payment reminders (scheduled job)
export async function POST(request: NextRequest) {
  try {
    // This would typically be called by a cron job
    // For now, we'll simulate checking all users for overdue payments
    
    // In production, this would:
    // 1. Get all users with pending payments
    // 2. Check if payment is overdue or nearing due date
    // 3. Send email/SMS notifications
    // 4. Create in-app notifications
    
    return NextResponse.json({ 
      success: true, 
      message: 'Payment reminders processed successfully',
      remindersSent: 0 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process reminders' }, { status: 500 });
  }
}
