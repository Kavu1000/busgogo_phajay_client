'use client';

import { useState, useEffect, useCallback } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generate seat IDs for a given capacity
// Layout: 2-2 for capacity > 24, 2-1 for capacity <= 24
function generateSeatIds(capacity: number): { id: string; col: 'A' | 'B' | 'C' | 'D' }[] {
  const seats: { id: string; col: 'A' | 'B' | 'C' | 'D' }[] = [];
  const isVIP = capacity <= 24; // 2-1 layout
  const seatsPerRow = isVIP ? 3 : 4;
  const rows = Math.ceil(capacity / seatsPerRow);

  for (let row = 1; row <= rows; row++) {
    seats.push({ id: `A${row}`, col: 'A' });
    seats.push({ id: `B${row}`, col: 'B' });
    if (!isVIP) seats.push({ id: `C${row}`, col: 'C' });
    if (seats.length < capacity || !isVIP) {
      if (isVIP) seats.push({ id: `C${row}`, col: 'C' });
      else seats.push({ id: `D${row}`, col: 'D' });
    }
  }
  // Trim to exact capacity
  return seats.slice(0, capacity);
}

type SeatType = 'available' | 'occupied' | 'selected';

interface SeatInfo {
  id: string;
  col: 'A' | 'B' | 'C' | 'D';
  row: number;
  type: SeatType;
}

function getSeatColor(type: SeatType) {
  switch (type) {
    case 'available': return 'bg-green-50 hover:bg-green-200 border-green-400 text-green-800 cursor-pointer';
    case 'occupied': return 'bg-red-100 border-red-300 text-red-500 cursor-not-allowed opacity-70';
    case 'selected': return 'bg-blue-600 border-blue-700 text-white shadow-md';
  }
}

interface SeatSelectionProps {
  scheduleId: string;
}

export default function SeatSelection({ scheduleId }: SeatSelectionProps) {
  const { selectedSeats, setSelectedSeats, scheduleData, setScheduleData } = useBooking();
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!scheduleId) return;
    setLoading(true); setError('');
    try {
      // 1) Schedule details (includes populated bus)
      const schedRes = await fetch(`${API}/schedules/${scheduleId}`);
      const schedJson = await schedRes.json();
      if (!schedRes.ok) throw new Error(schedJson.message || 'Could not load schedule');
      const s = schedJson.data;

      setScheduleData({
        scheduleId,
        busId: s.busId?._id || s.busId,
        busName: s.busId?.name || 'Bus',
        busCapacity: s.busId?.capacity || 40,
        company: s.busId?.company || '',
        licensePlate: s.busId?.licensePlate || '',
        route: { from: s.route?.from || '', to: s.route?.to || '' },
        date: s.date,
        departureTime: s.departureTime,
        arrivalTime: s.arrivalTime,
        pricePerSeat: s.pricePerSeat || s.price || 0,
      });

      // 2) Occupied seats
      const occRes = await fetch(`${API}/bookings/seats/${scheduleId}`);
      const occJson = await occRes.json();
      if (occRes.ok) setOccupiedSeats(occJson.data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load seat data');
    } finally {
      setLoading(false);
    }
  }, [scheduleId, setScheduleData]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const capacity = scheduleData?.busCapacity ?? 40;
  const isVIP = capacity <= 24;
  const allSeats = generateSeatIds(capacity);

  const seatMap: SeatInfo[] = allSeats.map(s => {
    const row = parseInt(s.id.slice(1));
    let type: SeatType = 'available';
    if (occupiedSeats.includes(s.id)) type = 'occupied';
    else if (selectedSeats.includes(s.id)) type = 'selected';
    return { ...s, row, type };
  });

  const rows = seatMap.reduce<Record<number, SeatInfo[]>>((acc, seat) => {
    (acc[seat.row] ||= []).push(seat);
    return acc;
  }, {});

  const handleSeat = (id: string, type: SeatType) => {
    if (type === 'occupied') return;
    setSelectedSeats(
      selectedSeats.includes(id)
        ? selectedSeats.filter(s => s !== id)
        : [...selectedSeats, id]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3" />
        <span className="text-gray-500">Loading seat map...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div>
      {/* Bus info strip */}
      {scheduleData && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 mb-4 flex flex-wrap gap-4 text-sm text-blue-800">
          <span>🚌 <strong>{scheduleData.busName}</strong></span>
          <span>📋 {scheduleData.licensePlate}</span>
          <span>💺 {capacity} seats ({isVIP ? 'VIP 2-1' : 'Standard 2-2'})</span>
          <span>💰 LAK {scheduleData.pricePerSeat.toLocaleString()} / seat</span>
        </div>
      )}

      {/* Bus layout diagram */}
      <div className="bg-gray-50 rounded-xl p-6 mb-4">
        <div className="max-w-xs mx-auto">
          {/* Driver */}
          <div className="flex justify-end mb-5">
            <div className="bg-gray-300 rounded-t-2xl h-10 w-20 flex items-center justify-center text-xs text-gray-600 font-medium">
              🧑‍✈️ Driver
            </div>
          </div>

          {/* Aisle header */}
          <div className={`flex items-center gap-2 mb-2 text-xs text-gray-400 font-medium ${isVIP ? 'justify-between' : 'justify-between'}`}>
            <span className="flex gap-1">
              <span className="w-8 text-center">A</span>
              <span className="w-8 text-center">B</span>
            </span>
            <span className="w-5" />
            {isVIP
              ? <span className="w-8 text-center">C</span>
              : <span className="flex gap-1"><span className="w-8 text-center">C</span><span className="w-8 text-center">D</span></span>
            }
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {Object.entries(rows).map(([rowNum, rowSeats]) => {
              const left = rowSeats.filter(s => s.col === 'A' || s.col === 'B').sort((a, b) => a.col < b.col ? -1 : 1);
              const right = rowSeats.filter(s => s.col === 'C' || s.col === 'D').sort((a, b) => a.col < b.col ? -1 : 1);
              return (
                <div key={rowNum} className="flex items-center gap-2">
                  {/* Left seats */}
                  <div className="flex gap-1">
                    {left.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeat(seat.id, seat.type)}
                        disabled={seat.type === 'occupied'}
                        title={seat.id}
                        className={`w-8 h-8 rounded-md border-2 text-[10px] font-bold transition-all ${getSeatColor(seat.type)}`}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                  {/* Row number */}
                  <div className="w-5 text-center text-[10px] text-gray-400">{rowNum}</div>
                  {/* Right seats */}
                  <div className="flex gap-1">
                    {right.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeat(seat.id, seat.type)}
                        disabled={seat.type === 'occupied'}
                        title={seat.id}
                        className={`w-8 h-8 rounded-md border-2 text-[10px] font-bold transition-all ${getSeatColor(seat.type)}`}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 justify-center text-sm mb-4">
        {[
          { label: 'Available', cls: 'bg-green-50 border-green-400' },
          { label: 'Selected', cls: 'bg-blue-600 border-blue-700' },
          { label: 'Occupied', cls: 'bg-red-100 border-red-300 opacity-70' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded border-2 ${l.cls}`} />
            <span className="text-gray-600">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Selection summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedSeats.map(id => (
              <span key={id} className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-sm font-medium">
                {id}
              </span>
            ))}
          </div>
          <p className="text-sm text-blue-700">
            <strong>{selectedSeats.length}</strong> seat(s) selected &nbsp;·&nbsp;
            Total: <strong>LAK {((scheduleData?.pricePerSeat || 0) * selectedSeats.length).toLocaleString()}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
