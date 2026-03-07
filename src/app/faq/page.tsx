import Link from 'next/link';
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  TicketIcon,
  CreditCardIcon,
  UserIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

export default function FAQPage() {
  const categories = [
    {
      id: 'booking',
      title: 'Booking a Ticket',
      icon: TicketIcon,
      color: 'blue',
      questions: [
        {
          question: 'How to book a ticket?',
          answer: 'You can book by: 1. Select Origin and Destination 2. Select Departure Date 3. Select Bus and Seats 4. Enter Passenger Details 5. Pay and receive the ticket via Email.'
        },
        {
          question: 'How many days in advance can I book a ticket?',
          answer: 'Tickets can be booked up to 30 days in advance and at least 30 minutes before departure.'
        },
        {
          question: 'Can I select seats?',
          answer: 'Yes, you can select your desired seats from the available options at booking. A seat map will be shown.'
        },
        {
          question: "What should I do if I don't receive a confirmation email?",
          answer: 'Check your Spam/Junk Mail folder. If not found, contact staff at 02-123-4567 with your booking number.'
        },
        {
          question: 'Can I book for someone else?',
          answer: 'Yes, you can book for others by entering the passenger details matching their ID correctly.'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: CreditCardIcon,
      color: 'green',
      questions: [
        {
          question: 'What are the payment methods?',
          answer: 'We accept payment via: Bank Transfer, QR Code, Credit/Debit Card, Mobile Wallet, and cash at the counter.'
        },
        {
          question: 'How long do I have to complete payment?',
          answer: 'After booking, you have 15 minutes to complete payment. If the time is exceeded, the booking will be automatically cancelled.'
        },
        {
          question: 'Will I get a receipt?',
          answer: 'Yes. After payment is completed, the system will send the receipt and ticket to your email immediately.'
        },
        {
          question: 'What if I transferred money but the system has not updated?',
          answer: 'Please wait 5-10 minutes. If still not updated, contact staff and provide proof of transfer.'
        },
        {
          question: 'Can I request a tax invoice?',
          answer: 'Yes, you can request a tax invoice by contacting staff within 7 days after the trip.'
        }
      ]
    },
    {
      id: 'travel',
      title: 'Travel',
      icon: TruckIcon,
      color: 'purple',
      questions: [
        {
          question: 'How early should I arrive at the pick-up point before departure?',
          answer: 'We recommend arriving at the pick-up point at least 15 minutes before departure time for check-in and finding your seat.'
        },
        {
          question: 'What documents do I need to bring?',
          answer: 'You need to bring your ID card (or passport for foreign nationals) and either a printed ticket or show it on your phone.'
        },
        {
          question: 'How much luggage can I bring?',
          answer: 'Luggage stored under the bus must not exceed 20 kilograms, and you may bring 1 small carry-on bag under your seat.'
        },
        {
          question: 'What facilities are available on the bus?',
          answer: 'Buses are equipped with WiFi, USB charging ports, air conditioning, restrooms, and reclining seats (depending on bus type).'
        },
        {
          question: 'What should I do if the bus is delayed?',
          answer: 'If the bus is delayed by more than 30 minutes, we will notify you via SMS and email with updated schedule information.'
        }
      ]
    },
    {
      id: 'account',
      title: 'User Account',
      icon: UserIcon,
      color: 'orange',
      questions: [
        {
          question: 'Do I need to sign up?',
          answer: 'It is not required, but signing up allows you to track your booking history and receive special offers.'
        },
        {
          question: 'What if I forgot my password?',
          answer: 'Click on "Forgot Password" on the login page and enter your email. We will send you a password reset link.'
        },
        {
          question: 'Can I change my personal information?',
          answer: 'Yes. Log in and go to "Personal Information" where you can edit your name, email, and phone number.'
        },
        {
          question: 'How can I delete my account?',
          answer: 'Contact staff at 02-123-4567 or send an email to support@busticket.com to request account deletion.'
        }
      ]
    }
  ];

  const generalQuestions = [
    {
      question: 'Is this website safe?',
      answer: 'Yes. We use SSL Certificate data encryption and comply with international security standards.'
    },
    {
      question: 'How can I contact staff?',
      answer: 'Phone: 02-123-4567 (24 hours), Email: support@busticket.com, or live chat on the website.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Not currently available, but the website works well on all mobile devices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <QuestionMarkCircleIcon className="h-8 w-8 mr-3 text-blue-600" />
              FAQ
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            Find answers to frequently asked questions about our services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Search questions..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      className={`flex items-center p-3 rounded-lg transition-colors hover:bg-${category.color}-50 text-gray-700 hover:text-${category.color}-700`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      <span className="text-sm font-medium">{category.title}</span>
                      <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.questions.length}
                      </span>
                    </a>
                  );
                })}
                <a
                  href="#general"
                  className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">General</span>
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {generalQuestions.length}
                  </span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Category Sections */}
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <section key={category.id} id={category.id} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <IconComponent className={`h-6 w-6 mr-3 text-${category.color}-600`} />
                    {category.title}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((qa, index) => (
                      <details key={index} className="border border-gray-200 rounded-lg">
                        <summary className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                          <span className="font-medium text-gray-900">{qa.question}</span>
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        </summary>
                        <div className="p-4 pt-0 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">{qa.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* General Questions */}
            <section id="general" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <QuestionMarkCircleIcon className="h-6 w-6 mr-3 text-gray-600" />
                General Questions
              </h2>

              <div className="space-y-4">
                {generalQuestions.map((qa, index) => (
                  <details key={index} className="border border-gray-200 rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                      <span className="font-medium text-gray-900">{qa.question}</span>
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </summary>
                    <div className="p-4 pt-0 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{qa.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can&apos;t find what you&apos;re looking for?</h3>
              <p className="text-gray-600 mb-4">
                Our team is available to help you 24 hours a day, every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:021234567"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Phone: 02-123-4567
                </a>
                <a
                  href="mailto:support@busticket.com"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Send Email
                </a>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
