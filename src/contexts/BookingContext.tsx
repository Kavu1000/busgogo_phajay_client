'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface ScheduleData {
  scheduleId: string;
  busId: string;
  busName: string;
  busCapacity: number;
  company: string;
  licensePlate: string;
  route: { from: string; to: string };
  date: string;
  departureTime: string;
  arrivalTime: string;
  pricePerSeat: number;
}

export interface BookingContextType {
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  scheduleData: ScheduleData | null;
  setScheduleData: (data: ScheduleData | null) => void;
  bookingId: string;
  setBookingId: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [bookingId, setBookingId] = useState<string>('');

  return (
    <BookingContext.Provider value={{
      selectedSeats, setSelectedSeats,
      passengerCount, setPassengerCount,
      scheduleData, setScheduleData,
      bookingId, setBookingId,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
