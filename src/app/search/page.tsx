import { Suspense } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">
            Search Bus Routes
          </h1>
          <div className="max-w-4xl mx-auto">
            <Suspense>
              <SearchForm />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading results...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
