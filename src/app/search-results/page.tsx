import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
