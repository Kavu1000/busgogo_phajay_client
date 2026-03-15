'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircleIcon, MapPinIcon, ClockIcon,
  PrinterIcon, HomeIcon, DocumentTextIcon,
} from '@heroicons/react/24/outline';

import { API_URL } from '@/lib/api';
const API = API_URL;

interface BookingData {
  _id: string;
  seatNumber?: string;
  departureStation?: string;
  arrivalStation?: string;
  departureTime?: string;
  price?: number;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  busId?: { name?: string; company?: string; licensePlate?: string; capacity?: number };
  userId?: { username?: string; email?: string };
  scheduleId?: string;
  // From URL params (fallback when booking populated data differs)
  routeStr?: string;
  seatsStr?: string;
  totalStr?: string;
}

function QRCodeRenderer({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrLoaded, setQrLoaded] = useState(false);

  useEffect(() => {
    if (!value) return;
    import('qrcode').then(QRCode => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, value, {
          width: 180,
          margin: 2,
          color: { dark: '#1e3a5f', light: '#ffffff' },
        }, (err) => {
          if (!err) setQrLoaded(true);
        });
      }
    }).catch(() => setQrLoaded(false));
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className={`rounded-lg ${qrLoaded ? '' : 'hidden'}`} />
      {!qrLoaded && (
        <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      )}
      <p className="text-xs text-gray-400 mt-2">Scan to verify ticket</p>
    </div>
  );
}

function BookingSuccessInner() {
  const router = useRouter();
  const params = useSearchParams();
  const bookingId = params.get('bookingId') || '';
  // Phajay sends the orderNo back inside the `linkCode` parameter or `orderNo` parameter
  const orderNo = params.get('orderNo') || params.get('linkCode') || '';
  const status = params.get('status') || '';

  // Query-param fallbacks (passed from BookingSummary)
  const routeStr = params.get('route') || '';
  const seatsStr = params.get('seats') || '';
  const totalStr = params.get('total') || '0';
  const busStr = params.get('bus') || '';
  const compStr = params.get('company') || '';
  const dateStr = params.get('date') || '';
  const depStr = params.get('depTime') || '';

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    if ((!bookingId && !orderNo) || !token) {
      setLoading(false);
      return;
    }

    const fetchUrl = bookingId
      ? `${API}/bookings/${bookingId}`
      : `${API}/bookings/order/${orderNo}`;

    fetch(fetchUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => {
        // Handle both single object and array responses
        const data = Array.isArray(j.data) && j.data.length > 0 ? j.data[0] : (j.data || null);
        if (data) setBooking(data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [bookingId, orderNo]);

  // Use the actual backend loaded ID for the QR & Ref if available
  const actualBookingId = booking?._id || bookingId;
  const bookingRef = actualBookingId ? `BUS-${actualBookingId.slice(-8).toUpperCase()}` : (orderNo ? `ORD-${orderNo.replace('BOOKING_', '').slice(-8)}` : '—');

  // Derive display values — prefer real backend data, fall back to URL params
  const route = booking ? `${booking.departureStation || ''} → ${booking.arrivalStation || ''}` : routeStr;
  const seats = booking?.seatNumber ? [booking.seatNumber] : seatsStr.split(',').filter(Boolean);
  const total = booking?.price ?? parseInt(totalStr);
  const busName = booking?.busId?.name || busStr;
  const company = booking?.busId?.company || compStr;
  const dateDisp = dateStr
    ? new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : (booking?.departureTime
      ? new Date(booking.departureTime).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '—');
  const depTime = depStr || (booking?.departureTime
    ? new Date(booking.departureTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : '—');

  // If we fetched the booking, use its status
  const isPaid = booking?.paymentStatus === 'completed' || status === 'paid';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-500">Loading your ticket...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isPaid ? 'bg-green-100' : 'bg-yellow-100'}`}>
          <CheckCircleIcon className={`h-12 w-12 ${isPaid ? 'text-green-500' : 'text-yellow-500'}`} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {isPaid ? 'Booking Confirmed! 🎉' : 'Booking Received!'}
        </h1>
        <p className="text-gray-500">
          {isPaid
            ? 'Payment successful. Your e-ticket is ready.'
            : 'Your booking is pending payment confirmation.'}
        </p>
      </div>

      {/* === E-Ticket Card === */}
      <div id="ticket-card" className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 print:shadow-none">

        {/* Ticket header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-5 flex justify-between items-start">
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">E-Ticket</p>
            <p className="text-2xl font-bold font-mono tracking-wider">{bookingRef}</p>
            <span className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${isPaid ? 'bg-green-400 text-green-900' : 'bg-yellow-400 text-yellow-900'
              }`}>
              {isPaid ? '✓ PAID' : '⏳ PENDING'}
            </span>
          </div>
          <div className="text-right text-sm text-blue-100">
            <p className="font-semibold text-white">{company}</p>
            <p>{busName}</p>
          </div>
        </div>

        {/* Ticket route band */}
        <div className="bg-blue-50 border-y border-blue-100 px-6 py-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">FROM</p>
            <p className="text-lg font-bold text-gray-900">{route.split('→')[0]?.trim() || '—'}</p>
          </div>
          <div className="flex flex-col items-center text-blue-400 text-2xl">→</div>
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-500 mb-0.5">TO</p>
            <p className="text-lg font-bold text-gray-900">{route.split('→')[1]?.trim() || '—'}</p>
          </div>
        </div>

        {/* Ticket body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <ClockIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-semibold text-gray-900">{dateDisp}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ClockIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Departure</p>
                <p className="text-sm font-semibold text-gray-900">{depTime}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Seat(s)</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {seats.length > 0
                  ? seats.map(s => (
                    <span key={s} className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-xs font-bold">{s}</span>
                  ))
                  : <span className="text-gray-400 text-xs">—</span>
                }
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="text-xl font-bold text-blue-600">LAK {total.toLocaleString()}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-end">
            {actualBookingId ? (
              <QRCodeRenderer value={JSON.stringify({
                ref: bookingRef,
                id: actualBookingId,
                name: booking?.userId?.username || 'Guest',
                email: booking?.userId?.email || '',
                route: route,
                date: dateDisp,
                time: depTime,
                seats: seats.join(',')
              })} />
            ) : (
              <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">No QR</div>
            )}
          </div>
        </div>

        {/* Dashed separator (ticket tear line) */}
        <div className="mx-6 border-t-2 border-dashed border-gray-200 relative">
          <div className="absolute -left-9 -top-3 w-6 h-6 bg-gray-50 border border-gray-100 rounded-full" />
          <div className="absolute -right-9 -top-3 w-6 h-6 bg-gray-50 border border-gray-100 rounded-full" />
        </div>

        {/* Important info footer */}
        <div className="px-6 py-4 bg-amber-50 text-xs text-amber-800">
          <p className="font-semibold mb-1">📋 Important</p>
          <ul className="space-y-0.5 text-amber-700">
            <li>• Arrive at the station at least 30 minutes before departure.</li>
            <li>• Bring a valid ID card or passport for verification.</li>
            <li>• Show this QR code to the staff upon boarding.</li>
            <li>• Cancel up to 2 hours before departure. Call: <strong>021-XXX-XXX</strong></li>
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          <PrinterIcon className="h-5 w-5" /> Print Ticket
        </button>
        <button
          onClick={() => router.push('/my-bookings')}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          <DocumentTextIcon className="h-5 w-5" /> My Bookings
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          <HomeIcon className="h-5 w-5" /> Home
        </button>
      </div>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-500">Loading your ticket...</p>
      </div>
    }>
      <BookingSuccessInner />
    </Suspense>
  );
}
