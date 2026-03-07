import Link from 'next/link';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 mr-3 text-blue-600" />
              Refund Policy
            </h1>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Last Updated: July 23, 2025
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Quick Summary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Refund Policy Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Free Cancellation</p>
                  <p className="text-gray-600">More than 24 hours before departure</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">80% Refund</p>
                  <p className="text-gray-600">2-24 hours before departure</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <XCircleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">No Refund</p>
                  <p className="text-gray-600">Less than 2 hours / No Show</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#section1" className="text-blue-600 hover:underline">1. Cancellation and Refund Conditions</a></li>
              <li><a href="#section2" className="text-blue-600 hover:underline">2. Refund Rate Schedule</a></li>
              <li><a href="#section3" className="text-blue-600 hover:underline">3. How to Request a Refund</a></li>
              <li><a href="#section4" className="text-blue-600 hover:underline">4. Refund Processing Time</a></li>
              <li><a href="#section5" className="text-blue-600 hover:underline">5. Special Cases</a></li>
              <li><a href="#section6" className="text-blue-600 hover:underline">6. Exceptions</a></li>
              <li><a href="#section7" className="text-blue-600 hover:underline">7. Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <section id="section1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Cancellation and Refund Conditions</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Booking cancellations and refund requests must comply with the conditions outlined in this policy,
                  ensuring clarity and fairness for both service users and providers.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                    Important Information
                  </h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Cancellations must be made through the online system or by contacting staff.</li>
                    <li>• Time calculations are based on the scheduled departure time.</li>
                    <li>• Processing fees may be deducted.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Refund Rate Schedule</h2>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cancellation Time Before Departure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Refund Percentage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          More than 24 hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            100%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Free
                        </td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          12-24 hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            90%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          10% of ticket price
                        </td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          2-12 hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            80%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          20% of ticket price
                        </td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Less than 2 hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            0%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          No refund
                        </td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          No Show
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            0%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          No refund
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Note: Time calculations are based on the scheduled departure time.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Request a Refund</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        Online
                      </span>
                      Via Website
                    </h4>
                    <ol className="text-sm text-gray-600 space-y-2">
                      <li>1. Log in to your account</li>
                      <li>2. Go to &quot;Booking History&quot;</li>
                      <li>3. Select the ticket you want to cancel</li>
                      <li>4. Click &quot;Cancel Booking&quot;</li>
                      <li>5. Confirm the cancellation</li>
                    </ol>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        Phone
                      </span>
                      Contact Staff
                    </h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>Number:</strong> 02-123-4567</p>
                      <p><strong>Business Hours:</strong> 24 hours</p>
                      <p><strong>Information needed:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Booking number</li>
                        <li>Name of the person who booked</li>
                        <li>Phone number</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Required Information for Refund</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Bank account number for refund transfer</li>
                    <li>• Copy of ID card (for bank transfer refunds)</li>
                    <li>• Booking number and payment confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Processing Time</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Confirmation</h4>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Processing</h4>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <CheckCircleIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">Funds Received</h4>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p><strong>Note:</strong> Processing time may vary depending on the bank and original payment method.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Special Cases</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Cancellation by the Company</h4>
                    <p className="text-green-800 text-sm">
                      If we must cancel a trip due to force majeure (e.g., natural disasters, vehicle breakdown),
                      a 100% refund will be provided or a free rebooking will be offered.
                    </p>
                  </div>

                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Trip Rescheduling</h4>
                    <p className="text-blue-800 text-sm">
                      Trip changes can be made up to 4 hours before departure. Additional charges may apply
                      if the new trip has a higher ticket price.
                    </p>
                  </div>

                  <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Medical Emergency</h4>
                    <p className="text-purple-800 text-sm">
                      With a medical certificate confirming an emergency, a 90% refund can be requested
                      without processing fees (must be reported within 48 hours).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Exceptions</h2>
              <div className="space-y-4 text-gray-600">
                <p>The following cases are not eligible for refunds:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Special promotional tickets marked as &quot;non-refundable&quot;</li>
                  <li>Cancellations due to providing false information</li>
                  <li>Unauthorized transfer or resale of tickets</li>
                  <li>Refund requests after the trip has been completed</li>
                  <li>Cases where the passenger does not have valid travel documents</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section id="section7">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  If you have questions about the refund policy or need assistance:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">General Inquiries</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Phone: 02-123-4567</p>
                      <p>Email: support@busticket.com</p>
                      <p>Business Hours: 24 hours, every day</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Finance Department</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Phone: 02-123-4567 ext. 201</p>
                      <p>Email: finance@busticket.com</p>
                      <p>Business Hours: Mon-Fri 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Important Notice */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
            <p className="text-yellow-800 text-sm">
              This refund policy may be updated from time to time. We will provide 30 days advance notice.
              For current bookings, the policy in effect at the time of booking will apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
