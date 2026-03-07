'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClockIcon, MapPinIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { scheduleApi } from '@/lib/api';

interface Schedule {
  _id: string;
  busId: {
    busNumber: string;
    type: string;
    amenities?: string[];
    capacity?: number;
  };
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  status: string;
  duration?: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [searchInfo, setSearchInfo] = useState({
    from: '',
    to: '',
    departDate: '',
    passengers: 1,
    tripType: 'oneWay'
  });

  useEffect(() => {
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const departDate = searchParams.get('departDate') || '';
    const passengers = parseInt(searchParams.get('passengers') || '1');
    const tripType = searchParams.get('tripType') || 'oneWay';

    setSearchInfo({ from, to, departDate, passengers, tripType });

    setIsLoading(true);
    scheduleApi.search({ from, to, date: departDate, passengers })
      .then((res) => {
        const data = res.data?.data ?? res.data;
        setSchedules(Array.isArray(data) ? data : []);
      })
      .catch(() => setSchedules([]))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const filteredSchedules = schedules.filter(s => {
    if (filterBy === 'all') return true;
    return s.busId?.type?.toLowerCase().includes(filterBy.toLowerCase());
  });

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.price - b.price;
      case 'time': return (a.departureTime || '').localeCompare(b.departureTime || '');
      default: return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600 text-lg">Searching for routes...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Search Info Header */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Route:</span>
            <p className="font-semibold text-gray-900">{searchInfo.from} → {searchInfo.to}</p>
          </div>
          <div>
            <span className="text-gray-600">Date:</span>
            <p className="font-semibold text-gray-900">{searchInfo.departDate}</p>
          </div>
          <div>
            <span className="text-gray-600">Passengers:</span>
            <p className="font-semibold text-gray-900">{searchInfo.passengers} person(s)</p>
          </div>
          <div>
            <span className="text-gray-600">Type:</span>
            <p className="font-semibold text-gray-900">{searchInfo.tripType === 'oneWay' ? 'One Way' : 'Round Trip'}</p>
          </div>
        </div>
      </div>

      {/* Filter and  Sort */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <span className="text-gray-900 font-medium">Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900">
            <option value="price">Price (Low–High)</option>
            <option value="time">Departure Time</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-900 font-medium">Bus Type:</span>
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900">
            <option value="all">All</option>
            <option value="vip">VIP</option>
            <option value="ac">AC</option>
            <option value="sleeper">Sleeper</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-900">
          Found <span className="font-semibold text-gray-900">{sortedSchedules.length}</span> route(s)
          from <span className="font-semibold">{searchInfo.from || '—'}</span> to <span className="font-semibold">{searchInfo.to || '—'}</span>
        </p>
      </div>

      {/* No Results */}
      {sortedSchedules.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-5xl mb-4">🚌</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No routes found</h3>
          <p className="text-gray-500 mb-6">
            No schedules found for <strong>{searchInfo.from}</strong> → <strong>{searchInfo.to}</strong> on <strong>{searchInfo.departDate}</strong>.
          </p>
          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
            Search Again
          </Link>
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        {sortedSchedules.map((schedule) => (
          <div key={schedule._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Bus Info */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">
                      Bus #{schedule.busId?.busNumber || '—'}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {schedule.busId?.type || 'Stand ard'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-700 mb-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="font-medium">
                        {schedule.departureTime} - {schedule.arrivalTime}
                      </span>
                    </div>
                    {schedule.duration && (
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span className="font-medium">{schedule.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      <span className="font-medium">{schedule.availableSeats ?? '—'} seats available</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {schedule.busId?.amenities && schedule.busId.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {schedule.busId.amenities.map((amenity, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">4.5</span>
                    <span className="ml-2 text-sm text-gray-500">(verified route)</span>
                  </div>
                </div>

                {/* Price and  Book */}
                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                  <div className="text-right mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      ₭{schedule.price?.toLocaleString() || '—'}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/booking/${schedule._id}?from=${encodeURIComponent(searchInfo.from)}&to=${encodeURIComponent(searchInfo.to)}&date=${searchInfo.departDate}&passengers=${searchInfo.passengers}`}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
