// src/app/api/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_live_vh97GOv9gE694e',
      key_secret: 'In8YtgTZF4Oaxgbug2I4kJd3',
    });

    const { amount } = await request.json();

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'order_receipt_11',
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}