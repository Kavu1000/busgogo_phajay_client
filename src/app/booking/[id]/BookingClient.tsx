'use client';

import { useParams } from 'next/navigation';
import SeatSelection from '@/components/SeatSelection';
import BookingForm from '@/components/BookingForm';
import BookingSummary from '@/components/BookingSummary';
import { BookingProvider } from '@/contexts/BookingContext';

export default function BookingClient() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : (params.id?.[0] ?? '');

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Step header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Book Bus Ticket</h1>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                {[
                  { n: 1, label: 'Select Seat(s)' },
                  { n: 2, label: 'Passenger Info' },
                  { n: 3, label: 'Pay' },
                ].map((step, i, arr) => (
                  <div key={step.n} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-1.5 ${step.n === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {step.n}
                    </div>
                    {step.label}
                    {i < arr.length - 1 && <div className="w-8 border-t border-gray-300 mx-3" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Seat(s)</h2>
                <SeatSelection scheduleId={id} />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h2>
                <BookingForm scheduleId={id} />
              </div>
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <BookingSummary scheduleId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BookingProvider>
  );
}
