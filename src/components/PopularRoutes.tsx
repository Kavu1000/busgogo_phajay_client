import Link from 'next/link';

export default function PopularRoutes() {
  const popularRoutes = [
    {
      from: 'Vientiane',
      to: 'Luang Prabang',
      duration: '8 hrs 30 min',
      price: 250000,
      image: '/images/luang-prabang.jpg',
      trips: '10 trips/day'
    },
    {
      from: 'Vientiane',
      to: 'Vang Vieng',
      duration: '2 hrs 30 min',
      price: 150000,
      image: '/images/vang-vieng.jpg',
      trips: '15 trips/day'
    },
    {
      from: 'Vientiane',
      to: 'Pakse',
      duration: '10 hrs',
      price: 350000,
      image: '/images/pakse.jpg',
      trips: '8 trips/day'
    },
    {
      from: 'Luang Prabang',
      to: 'Vang Vieng',
      duration: '5 hrs',
      price: 180000,
      image: '/images/luang-prabang-vang-vieng.jpg',
      trips: '12 trips/day'
    },
    {
      from: 'Vientiane',
      to: 'Savannakhet',
      duration: '7 hrs 30 min',
      price: 280000,
      image: '/images/savannakhet.jpg',
      trips: '6 trips/day'
    },
    {
      from: 'Vientiane',
      to: 'Thakhek',
      duration: '6 hrs',
      price: 220000,
      image: '/images/thakhek.jpg',
      trips: '8 trips/day'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Routes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from the most popular routes with the most travelers, at special prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Route Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold">{route.to}</h3>
                    <p className="text-blue-100">From {route.from}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{route.trips}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {route.from} → {route.to}
                    </h3>
                    <p className="text-gray-600 text-sm">{route.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ₭{route.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Starting from</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Daily
                  </div>
                  <Link
                    href={`/search?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Routes
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
