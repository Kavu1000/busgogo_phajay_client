import BookingClient from './BookingClient';

// Required for Next.js static export with dynamic routes
// We provide a dummy param to satisfy the build requirement for static export
export function generateStaticParams() {
  return [{ id: '1' }];
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  return <BookingClient />;
}
