'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';

interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  idCard: string;
}

interface BookingFormProps {
  scheduleId: string;
}

export default function BookingForm({ scheduleId }: BookingFormProps) {
  const router = useRouter();
  const { user, token } = useAuth();
  const { selectedSeats, scheduleData } = useBooking();

  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    { title: '', firstName: '', lastName: '', phone: '', email: '', idCard: '' }
  ]);
  const [contactInfo, setContactInfo] = useState({
    phone: '', email: user?.email || '', emergencyContact: '', emergencyPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sync seat count to passenger count
  useEffect(() => {
    const count = Math.max(selectedSeats.length, 1);
    setPassengers(prev => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill({ title: '', firstName: '', lastName: '', phone: '', email: '', idCard: '' })];
      }
      return prev.slice(0, count);
    });
  }, [selectedSeats.length]);

  useEffect(() => {
    if (user?.email) setContactInfo(prev => ({ ...prev, email: user.email }));
  }, [user]);

  const handlePassengerChange = (index: number, field: keyof PassengerInfo, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      router.push(`/login?redirect=/booking/${scheduleId}`);
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat before confirming.');
      return;
    }

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.title || !p.firstName || !p.lastName || !p.phone) {
        setError(`Please fill in all required fields for Passenger ${i + 1}.`);
        return;
      }
    }

    if (!contactInfo.phone || !contactInfo.email) {
      setError('Please fill in contact phone and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookingApi.create({
        scheduleId,
        seats: selectedSeats,
        passengers,
        contactPhone: contactInfo.phone,
        contactEmail: contactInfo.email,
        emergencyContact: contactInfo.emergencyContact,
        emergencyPhone: contactInfo.emergencyPhone,
      });

      const bookingId = res.data?.data?._id || res.data?._id || '';

      // Build URL params with all booking context for payment and success pages
      const total = (scheduleData?.pricePerSeat || 0) * selectedSeats.length + 5000;
      const params = new URLSearchParams({
        bookingId,
        seats: selectedSeats.join(','),
        total: String(total),
        route: scheduleData ? `${scheduleData.route.from} → ${scheduleData.route.to}` : '',
        date: scheduleData?.date || '',
        depTime: scheduleData?.departureTime || '',
        company: scheduleData?.company || '',
        bus: scheduleData?.busName || '',
      });

      router.push(`/payment?${params.toString()}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!token && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800">
            You need to <a href="/login" className="font-medium underline text-yellow-900">log in</a> to complete your booking.
          </p>
        </div>
      )}

      {selectedSeats.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">👆 Please select your seat(s) above first.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {passengers.map((passenger, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-900">
                Passenger {index + 1}
                {selectedSeats[index] && (
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                    Seat {selectedSeats[index]}
                  </span>
                )}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <select
                  value={passenger.title}
                  onChange={e => handlePassengerChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select</option>
                  {['Mr', 'Mrs', 'Ms', 'Master', 'Miss'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input type="text" value={passenger.firstName}
                  onChange={e => handlePassengerChange(index, 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="First name" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input type="text" value={passenger.lastName}
                  onChange={e => handlePassengerChange(index, 'lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Last name" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID / Passport No.</label>
                <input type="text" value={passenger.idCard}
                  onChange={e => handlePassengerChange(index, 'idCard', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="ID or Passport number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" value={passenger.phone}
                  onChange={e => handlePassengerChange(index, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="020xxxxxxxx" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={passenger.email}
                  onChange={e => handlePassengerChange(index, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="example@email.com"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Contact Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
              <input type="tel" value={contactInfo.phone}
                onChange={e => handleContactChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="020xxxxxxxx" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input type="email" value={contactInfo.email}
                onChange={e => handleContactChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="example@email.com" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
              <input type="text" value={contactInfo.emergencyContact}
                onChange={e => handleContactChange('emergencyContact', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
              <input type="tel" value={contactInfo.emergencyPhone}
                onChange={e => handleContactChange('emergencyPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="020xxxxxxxx"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <input type="checkbox" id="terms"
              className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">Terms & Conditions</a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={isSubmitting || selectedSeats.length === 0}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white transition-colors ${isSubmitting || selectedSeats.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Processing Booking...
            </div>
          ) : selectedSeats.length === 0
            ? 'Please select a seat above'
            : `Confirm & Proceed to Payment →`
          }
        </button>
      </form>
    </div>
  );
}
