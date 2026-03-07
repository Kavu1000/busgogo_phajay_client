import { NextRequest, NextResponse } from 'next/server';

const LAPNET_API_URL = 'https://payment-gateway.phajay.co/v1/api/link/payment-link';
const PHAJAY_TOKEN = process.env.PHAJAY_API_TOKEN || process.env.NEXT_PUBLIC_PHAJAY_TOKEN || '';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, orderId, description, redirectUrl } = body;

        if (!amount || !orderId) {
            return NextResponse.json({ error: 'amount and orderId are required' }, { status: 400 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const finalRedirectUrl = redirectUrl || `${appUrl}/booking-success?bookingId=${orderId}&status=paid`;

        const payload = {
            amount: Number(amount),
            currency: 'LAK',
            orderId,
            description: description || `Bus ticket - Booking #${orderId}`,
            redirectUrl: finalRedirectUrl,
            webhookUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/payments/webhook`,
        };

        const phajayRes = await fetch(LAPNET_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(PHAJAY_TOKEN ? { Authorization: `Bearer ${PHAJAY_TOKEN}` } : {}),
            },
            body: JSON.stringify(payload),
        });

        const data = await phajayRes.json();

        if (!phajayRes.ok) {
            console.error('Phajay error:', data);
            return NextResponse.json({ error: data.message || 'Payment gateway error', raw: data }, { status: phajayRes.status });
        }

        // Phajay returns a paymentUrl or payment_url or link
        const paymentUrl = data.paymentUrl || data.payment_url || data.link || data.url || data.data?.paymentUrl;

        return NextResponse.json({ paymentUrl, raw: data });
    } catch (err: any) {
        console.error('Payment link creation failed:', err);
        return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
    }
}
