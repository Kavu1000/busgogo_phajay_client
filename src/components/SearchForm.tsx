'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ArrowsRightLeftIcon, CalendarDaysIcon, UserGroupIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { scheduleApi } from '@/lib/api';

interface City {
  _id: string;
  name: string;
  stations?: string[];
}

// Fallback static cities (shown if API is unreachable)
const FALLBACK_CITIES: City[] = [
  { _id: 'vte', name: 'Vientiane', stations: ['Central Bus Station', 'Northern Bus Terminal'] },
  { _id: 'lpb', name: 'Luang Prabang', stations: ['Luang Prabang Bus Station'] },
  { _id: 'svn', name: 'Savannakhet', stations: ['Savannakhet Bus Station'] },
  { _id: 'pkl', name: 'Pakse', stations: ['Pakse Bus Station'] },
  { _id: 'xkh', name: 'Xieng Khouang', stations: ['Phonsavan Bus Station'] },
  { _id: 'hpv', name: 'Houaphan', stations: ['Xam Neua Bus Station'] },
];

export default function SearchForm() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>(FALLBACK_CITIES);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'oneWay'
  });

  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch cities from backend
  useEffect(() => {
    scheduleApi.getCities()
      .then((res) => {
        const data = res.data?.data ?? res.data;
        if (Array.isArray(data) && data.length > 0) {
          // Hand le flat string array ["Vientiane", ...] or object array
          const normalized: City[] = data.map((c: string | City, i: number) =>
            typeof c === 'string'
              ? { _id: String(i), name: c }
              : c
          );
          setCities(normalized);
        }
      })
      .catch(() => {
        // Keep fallback cities silently
      });
  }, []);

  const getFilteredCities = (searchTerm: string) => {
    if (!searchTerm) return cities;
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.stations?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setFromDropdownOpen(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setToDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (location: string, type: 'from' | 'to') => {
    setFormData(prev => ({ ...prev, [type]: location }));
    if (type === 'from') {
      setFromSearch(location);
      setFromDropdownOpen(false);
    } else {
      setToSearch(location);
      setToDropdownOpen(false);
    }
  };

  const handleSwapLocations = () => {
    setFromSearch(toSearch);
    setToSearch(fromSearch);
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.departDate) {
      alert('Please fill in all required fields.');
      return;
    }
    const searchParams = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      departDate: formData.departDate,
      passengers: formData.passengers.toString(),
      tripType: formData.tripType,
      ...(formData.returnDate && { returnDate: formData.returnDate })
    });
    router.push(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="radio" name="tripType" value="oneWay"
              checked={formData.tripType === 'oneWay'} onChange={handleInputChange} className="mr-2" />
            <span className="text-gray-700 font-medium">One Way</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="tripType" value="roundTrip"
              checked={formData.tripType === 'roundTrip'} onChange={handleInputChange} className="mr-2" />
            <span className="text-gray-700 font-medium">Round Trip</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* From */}
          <div className="relative" ref={fromDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <div className="relative">
              <input
                type="text" value={fromSearch}
                onChange={(e) => { setFromSearch(e.target.value); setFromDropdownOpen(true); }}
                onFocus={() => setFromDropdownOpen(true)}
                placeholder="Search departure city..."
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              {fromDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {getFilteredCities(fromSearch).map((city) => (
                    <div key={city._id}>
                      <div className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50">{city.name}</div>
                      {city.stations?.map((station) => (
                        <button key={station} type="button"
                          onClick={() => handleLocationSelect(station, 'from')}
                          className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                          {station}
                        </button>
                      ))}
                      {!city.stations && (
                        <button type="button"
                          onClick={() => handleLocationSelect(city.name, 'from')}
                          className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                          {city.name}
                        </button>
                      )}
                    </div>
                  ))}
                  {getFilteredCities(fromSearch).length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">No city found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* To */}
          <div className="relative" ref={toDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <div className="relative">
              <input
                type="text" value={toSearch}
                onChange={(e) => { setToSearch(e.target.value); setToDropdownOpen(true); }}
                onFocus={() => setToDropdownOpen(true)}
                placeholder="Search destination city..."
                className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button type="button" onClick={handleSwapLocations}
                  className="text-gray-400 hover:text-blue-600 transition-colors">
                  <ArrowsRightLeftIcon className="h-5 w-5" />
                </button>
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
              {toDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {getFilteredCities(toSearch).map((city) => (
                    <div key={city._id}>
                      <div className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50">{city.name}</div>
                      {city.stations?.map((station) => (
                        <button key={station} type="button"
                          onClick={() => handleLocationSelect(station, 'to')}
                          className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                          {station}
                        </button>
                      ))}
                      {!city.stations && (
                        <button type="button"
                          onClick={() => handleLocationSelect(city.name, 'to')}
                          className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                          {city.name}
                        </button>
                      )}
                    </div>
                  ))}
                  {getFilteredCities(toSearch).length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">No city found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
            <div className="relative">
              <input type="date" name="departDate" value={formData.departDate} onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required />
              <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {formData.tripType === 'roundTrip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
              <div className="relative">
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
                <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Passengers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
            <div className="relative">
              <select name="passengers" value={formData.passengers} onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
              <UserGroupIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            Search Routes
          </button>
        </div>
      </form>
    </div>
  );
}
