import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if we are in demo mode (no keys, or placeholder keys)
    const isPlaceholder = 
      !keyId || 
      !keySecret || 
      keyId.includes('your_key_id') || 
      keySecret.includes('your_key_secret');

    if (isPlaceholder) {
      // Simulate a successful Razorpay order creation for the demo
      const mockOrder = {
        id: `order_demo_${Math.random().toString(36).substring(2, 15)}`,
        entity: 'order',
        amount: amount, // amount in paise
        amount_paid: 0,
        amount_due: amount,
        currency: currency,
        receipt: `rcpt_${Date.now()}`,
        status: 'created',
        attempts: 0,
        notes: { demo: 'true' },
        created_at: Math.floor(Date.now() / 1000),
        isDemo: true,
      };

      return NextResponse.json(mockOrder);
    }

    // Real Razorpay order creation
    const razorpay = new Razorpay({
      key_id: keyId as string,
      key_secret: keySecret as string,
    });

    const order = await razorpay.orders.create({
      amount: amount, // in paise
      currency: currency,
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({ ...order, isDemo: false });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
