import { Suspense } from 'react';
import PaymentForm from '@/components/PaymentForm';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
}
