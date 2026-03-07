'use client';

import { useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';

interface BookingSummaryProps {
  scheduleId?: string;
}

export default function BookingSummary({ scheduleId }: BookingSummaryProps) {
  const { selectedSeats, scheduleData } = useBooking();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const pricePerSeat = scheduleData?.pricePerSeat || 0;
  const numSeats = selectedSeats.length;
  const subtotal = pricePerSeat * numSeats;
  const serviceFee = numSeats > 0 ? 5000 : 0;
  const discount = isPromoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + serviceFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') setIsPromoApplied(true);
    else alert('Invalid promo code. Try SAVE10');
  };

  const from = scheduleData?.route.from || '—';
  const to = scheduleData?.route.to || '—';
  const date = scheduleData?.date
    ? new Date(scheduleData.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>

      {/* Trip Details */}
      <div className="space-y-2.5 mb-5 text-sm">
        {[
          { label: 'Route', value: `${from} → ${to}` },
          { label: 'Date', value: date },
          { label: 'Departure', value: scheduleData?.departureTime || '—' },
          { label: 'Company', value: scheduleData?.company || '—' },
          { label: 'Bus', value: scheduleData?.busName || '—' },
        ].map(r => (
          <div key={r.label} className="flex justify-between">
            <span className="text-gray-500">{r.label}</span>
            <span className="font-medium text-gray-900 text-right max-w-[60%]">{r.value}</span>
          </div>
        ))}
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="border-t border-gray-100 pt-4 mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Selected Seats</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedSeats.map(s => (
              <span key={s} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Promo */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Promo Code</p>
        <div className="flex gap-2">
          <input
            value={promoCode} onChange={e => setPromoCode(e.target.value)}
            placeholder="SAVE10" disabled={isPromoApplied}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
          />
          <button onClick={handleApplyPromo} disabled={isPromoApplied || !promoCode}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg disabled:bg-gray-300">
            Apply
          </button>
        </div>
        {isPromoApplied && <p className="text-xs text-green-600 mt-1">✓ 10% discount applied</p>}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-100 pt-4">
        {numSeats > 0 ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{numSeats} seat(s) × LAK {pricePerSeat.toLocaleString()}</span>
              <span className="font-medium">LAK {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service Fee</span>
              <span className="font-medium">LAK {serviceFee.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promo Discount</span>
                <span>-LAK {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
              <span className="text-gray-900">Total</span>
              <span className="text-blue-600">LAK {total.toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-3">Select a seat to see price details</p>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secured by Phajay Payment
      </div>
    </div>
  );
}
