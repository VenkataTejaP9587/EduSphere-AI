import { NextRequest, NextResponse } from 'next/server';
import { getPaymentsByUser, addPayment, getFeeStructuresByCourse, getUserById } from '@/lib/db';

// GET payments for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const payments = getPaymentsByUser(userId);
    return NextResponse.json({ success: true, payments });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST create payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, feeStructureId, amount, paymentMethod } = body;

    // Validate user exists
    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Create payment record
    const payment = {
      id: `pay-${Date.now()}`,
      userId,
      feeStructureId,
      amount,
      status: 'pending' as const,
      paymentMethod,
      transactionId: undefined,
      paidAt: undefined,
      createdAt: new Date().toISOString(),
    };

    addPayment(payment);

    // In production, this would integrate with Stripe/Razorpay
    // For now, we'll simulate a successful payment
    const simulatedPayment = {
      ...payment,
      status: 'completed' as const,
      transactionId: `TXN-${Date.now()}`,
      paidAt: new Date().toISOString(),
    };

    return NextResponse.json({ 
      success: true, 
      payment: simulatedPayment,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create payment' }, { status: 500 });
  }
}
