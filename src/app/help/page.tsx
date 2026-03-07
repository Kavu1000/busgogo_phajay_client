import Link from 'next/link';
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Help */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <QuestionMarkCircleIcon className="h-6 w-6 mr-2 text-blue-600" />
                How to use
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Booking a Ticket</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Select or igin and  Destination</li>
                    <li>Select Departure Date</li>
                    <li>Select Bus and  Seat(s)</li>
                    <li>Enter Passengers Details </li>
                    <li>Pay and  Receive Ticket</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Bank Transfer</li>
                    <li>Pay via QR Code</li>
                    <li>Credit/Debit Card</li>
                    <li>Mobile Wallet</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Cancellation and  Refund</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Can be cancelled 2 hours before departure</li>
                    <li>80% refund of ticket price</li>
                    <li>Refund processing time 3-7 business days</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">FAQ</h2>

              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    Can I change my Departure Date?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Can be changed 4 hours before departure, with possible additional fees if ticket prices differ
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    What if I forget my Password?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Click &ldquo;Forgot Password&rdquo; on the Login page and enter your Email. We will send you a password reset link
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    How will the ticket be delivered?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    The ticket will be sent to your Email in PDF format after Payment is successful
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    How many days in advance can I book a ticket?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Tickets can be booked up to 30 days in advance
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    If I miss my scheduled trip, can I get a refund?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    No refunds will be issued for missed trips (No Show)
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-600" />
                Contact Us
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">02-123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">support@busticket.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="font-medium text-gray-900">24 hours, every day</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      123 Sukhumvit Road, Khlong Toei<br />
                      Khlong Toei District, Vientiane 10110
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Send us a message
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Useful Links</h3>

              <div className="space-y-2">
                <Link href="/faq" className="block text-blue-600 hover:text-blue-500 hover:underline">
                  FAQ
                </Link>
                <Link href="/terms" className="block text-blue-600 hover:text-blue-500 hover:underline">
                  Terms of Use
                </Link>
                <Link href="/privacy" className="block text-blue-600 hover:text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/refund" className="block text-blue-600 hover:text-blue-500 hover:underline">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
