import SearchForm from '@/components/SearchForm';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularRoutes from '@/components/PopularRoutes';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <Hero />
      
      {/* Search Form */}
      <div className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SearchForm />
        </div>
      </div>

      {/* Features Section */}
      <Features />

      {/* Popular Routes */}
      <PopularRoutes />
    </div>
  );
}
