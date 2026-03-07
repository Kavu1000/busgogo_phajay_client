'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import api from '@/lib/api';

function PaymentFormInner() {
  const params = useSearchParams();
  const bookingId = params.get('bookingId') || '';
  const seats = params.get('seats') || '';
  const total = parseInt(params.get('total') || '0');
  const route = params.get('route') || '';
  const date = params.get('date') || '';
  const depTime = params.get('depTime') || '';
  const company = params.get('company') || '';
  const bus = params.get('bus') || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Friendly date string
  const dateStr = date
    ? new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  const handlePayWithPhajay = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/payment/create-link', {
        amount: total,
        bookingIds: [bookingId],
        description: `Bus ticket ${route} — Seats ${seats}`,
      });

      const json = res.data;
      if (!json.success && !json.data) throw new Error(json.error || 'Payment gateway error');

      if (json.data && json.data.redirectURL) {
        window.location.href = json.data.redirectURL;
      } else {
        throw new Error('No payment URL returned from gateway');
      }
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || 'Payment failed. Please try again.';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
        <p className="text-gray-500 mt-1">Review your order and pay securely via Phajay</p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-blue-100 text-sm">Booking Reference</p>
              <p className="font-bold text-lg tracking-wider">{bookingId ? `#${bookingId.slice(-8).toUpperCase()}` : '—'}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Total Amount</p>
              <p className="font-bold text-2xl">LAK {total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-3 text-sm">
          {[
            { label: 'Route', value: route || '—' },
            { label: 'Date', value: dateStr },
            { label: 'Departure', value: depTime || '—' },
            { label: 'Company', value: company || '—' },
            { label: 'Bus', value: bus || '—' },
            { label: 'Seat(s)', value: seats || '—' },
          ].map(r => (
            <div key={r.label} className="flex justify-between">
              <span className="text-gray-500">{r.label}</span>
              <span className="font-medium text-gray-900">{r.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-base">
            <span className="text-gray-900">Total</span>
            <span className="text-blue-600">LAK {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePayWithPhajay}
        disabled={loading || !bookingId}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${loading || !bookingId
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
          }`}
      >
        {loading ? (
          <>
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Connecting to Phajay...
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Pay LAK {total.toLocaleString()} with Phajay
          </>
        )}
      </button>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheckIcon className="h-4 w-4" />
        256-bit SSL — Your payment is secured by Phajay Payment Gateway
      </div>

      {/* Phajay accepted methods */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-2">Accepted payment methods via Phajay</p>
        <div className="flex justify-center gap-3 flex-wrap text-sm text-gray-600 font-medium">
          {['BCEL One', 'JDB Yes', 'LDB Trust', 'U-Money', 'M-Money', 'Visa/MC'].map(m => (
            <span key={m} className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-xs">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaymentForm() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
      <PaymentFormInner />
    </Suspense>
  );
}
