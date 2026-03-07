import { ShieldCheckIcon, ClockIcon, CreditCardIcon, MapPinIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline';

export default function Features() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Safe & Trustworthy',
      description: 'Secure booking system with data encryption at every step.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: ClockIcon,
      title: 'Book Anytime 24 Hours',
      description: 'Online booking service available non-stop, at your convenience.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CreditCardIcon,
      title: 'Multiple Payment Options',
      description: 'Supports payment via credit card and  mobile banking.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: MapPinIcon,
      title: 'Nationwide Coverage',
      description: 'Bus services to destinations across Thailand .',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: PhoneIcon,
      title: 'Customer Support 24/7',
      description: 'Our team is always ready to assist you.',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: StarIcon,
      title: 'Real Customer Reviews',
      description: 'Read reviews and  ratings from real users.',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best service for your comfortable and  safe journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Routes Available</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Trusted Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">99.5%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Service Hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
