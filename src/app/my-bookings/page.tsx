'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { bookingApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import {
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  EyeIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Booking {
  _id: string;
  paymentOrderNo?: string;
  busId?: {
    name?: string;
    company?: string;
    licensePlate?: string;
  };
  seatNumber?: string | string[];
  departureStation?: string;
  arrivalStation?: string;
  departureTime?: string;
  arrivalTime?: string;
  totalAmount?: number;
  totalPrice?: number;
  status: string;
  paymentStatus?: string;
  bookingDate?: string;
  createdAt?: string;
}

export default function MyBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await bookingApi.getMyBookings();
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      console.error('Error fetching bookings:', err);
      setError(e.response?.data?.message || 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);



  const handleCancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await bookingApi.cancel(id);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b)
      );
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      alert(e.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (selectedTab === 'all') return true;
    return b.status === selectedTab;
  });

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <TicketIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to view your bookings</h2>
          <p className="text-gray-500 mb-6">Please log in to see your booking history.</p>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchBookings}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 border border-gray-300 hover:border-blue-300 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <Link
                href="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center space-x-2">
            <XMarkIcon className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {(['all', 'confirmed', 'pending', 'completed'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${selectedTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {key === 'all' ? 'All' : key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                    {counts[key]}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <TicketIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
              <p className="text-gray-500 mb-6">
                {selectedTab === 'all' ? "You haven't made any bookings yet." : `No ${selectedTab} bookings.`}
              </p>
              <Link
                href="/search"
                className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Start Booking
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const seatDisplay = Array.isArray(booking.seatNumber)
                ? booking.seatNumber.join(', ')
                : booking.seatNumber || 'N/A';
              const price = booking.totalAmount ?? booking.totalPrice ?? 0;
              const dateStr = booking.bookingDate ?? booking.createdAt;

              return (
                <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-base font-semibold text-gray-900">
                          Order: <span className="text-blue-600">{booking.paymentOrderNo || booking._id.slice(-8).toUpperCase()}</span>
                        </h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      {dateStr && (
                        <div className="text-sm text-gray-400">
                          Booked: {new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      )}
                    </div>

                    {/* Route & Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Bus</p>
                        <p className="font-semibold text-gray-900">{booking.busId?.company || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{booking.busId?.name || ''}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Route</p>
                        <div className="flex items-center text-gray-700">
                          <MapPinIcon className="h-4 w-4 mr-1 text-blue-500 flex-shrink-0" />
                          <span className="font-medium truncate">{booking.departureStation || 'Departure'}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPinIcon className="h-4 w-4 mr-1 text-red-400 flex-shrink-0" />
                          <span className="truncate">{booking.arrivalStation || 'Arrival'}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        {booking.departureTime && (
                          <div className="flex items-center text-gray-900 text-sm">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>{booking.departureTime}</span>
                            {booking.arrivalTime && <span className="text-gray-400 ml-1">→ {booking.arrivalTime}</span>}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Seat(s): {seatDisplay}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Price</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {price.toLocaleString()} <span className="text-sm font-normal">LAK</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      <Link
                        href={`/booking/${booking._id}`}
                        className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <EyeIcon className="h-4 w-4 mr-1.5" />
                        View Details
                      </Link>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="flex items-center px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1.5" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Summary Card */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-5">Your Booking Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-xl py-4 px-2">
              <div className="text-3xl font-bold">{bookings.length}</div>
              <div className="text-blue-100 text-sm mt-1">Total Bookings</div>
            </div>
            <div className="bg-white/10 rounded-xl py-4 px-2">
              <div className="text-3xl font-bold">{counts.confirmed}</div>
              <div className="text-blue-100 text-sm mt-1">Confirmed</div>
            </div>
            <div className="bg-white/10 rounded-xl py-4 px-2">
              <div className="text-3xl font-bold">
                {bookings.reduce((t, b) => t + (b.totalAmount ?? b.totalPrice ?? 0), 0).toLocaleString()}
              </div>
              <div className="text-blue-100 text-sm mt-1">Total Spent (LAK)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
