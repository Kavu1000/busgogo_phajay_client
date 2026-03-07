import Link from 'next/link';
import { DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
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
              <DocumentTextIcon className="h-8 w-8 mr-3 text-blue-600" />
              Terms and Conditions
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
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed">
              Welcome to the bus ticket booking system. Please read the following terms and conditions carefully.
              By using our services, you agree to comply with these terms.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#section1" className="text-blue-600 hover:underline">1. Acceptance of Terms</a></li>
              <li><a href="#section2" className="text-blue-600 hover:underline">2. User Registration and Account</a></li>
              <li><a href="#section3" className="text-blue-600 hover:underline">3. Booking and Payment</a></li>
              <li><a href="#section4" className="text-blue-600 hover:underline">4. Cancellation and Refunds</a></li>
              <li><a href="#section5" className="text-blue-600 hover:underline">5. User Responsibilities</a></li>
              <li><a href="#section6" className="text-blue-600 hover:underline">6. Limitation of Liability</a></li>
              <li><a href="#section7" className="text-blue-600 hover:underline">7. Changes to Terms</a></li>
              <li><a href="#section8" className="text-blue-600 hover:underline">8. Governing Law</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <section id="section1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  By accessing the website and using the bus ticket booking service, you acknowledge that you have read, understood, and agreed to all of these terms and conditions.
                </p>
                <p>
                  If you do not agree to any of these terms, please stop using our services immediately.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Registration and Account</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>2.1</strong> You must be at least 18 years old or have parental consent to sign up.
                </p>
                <p>
                  <strong>2.2</strong> The information you provide must be accurate, complete, and current.
                </p>
                <p>
                  <strong>2.3</strong> You are responsible for keeping your password confidential and for all activities under your account.
                </p>
                <p>
                  <strong>2.4</strong> If unauthorized use of your account is discovered, please notify us immediately.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Payment</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>3.1</strong> Ticket booking is complete only upon payment confirmation.
                </p>
                <p>
                  <strong>3.2</strong> Ticket prices include all taxes and fees.
                </p>
                <p>
                  <strong>3.3</strong> We reserve the right to change ticket prices without prior notice.
                </p>
                <p>
                  <strong>3.4</strong> Payment can be made via designated channels such as Bank Transfer, QR Code, and Credit Card.
                </p>
                <p>
                  <strong>3.5</strong> Confirmed tickets will be sent to the registered email.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cancellation and Refunds</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>4.1</strong> Bookings can be cancelled at least 2 hours before the departure time.
                </p>
                <p>
                  <strong>4.2</strong> The cancellation fee is 20% of the ticket price.
                </p>
                <p>
                  <strong>4.3</strong> Refunds will be processed within 3-7 business days.
                </p>
                <p>
                  <strong>4.4</strong> In case of no show (failure to use the service), refunds will not be issued.
                </p>
                <p>
                  <strong>4.5</strong> In case of bus breakdown or trip cancellation by the company, a 100% refund will be provided.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Responsibilities</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>5.1</strong> Passengers must arrive at the pick-up point at least 15 minutes before the departure time.
                </p>
                <p>
                  <strong>5.2</strong> Proof of booking and a valid ID must be presented before boarding.
                </p>
                <p>
                  <strong>5.3</strong> Illegal, dangerous, or strong-smelling items are prohibited on the bus.
                </p>
                <p>
                  <strong>5.4</strong> You must comply with bus regulations and staff instructions.
                </p>
                <p>
                  <strong>5.5</strong> Users are responsible for damages caused by their own actions.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>6.1</strong> We are not liable for delays caused by weather, traffic, or force majeure events.
                </p>
                <p>
                  <strong>6.2</strong> We are not responsible for lost or damaged personal belongings.
                </p>
                <p>
                  <strong>6.3</strong> Bus schedules and times may change without prior notice.
                </p>
                <p>
                  <strong>6.4</strong> Maximum liability is limited to the ticket price paid.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="section7">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>7.1</strong> We reserve the right to modify these terms at any time.
                </p>
                <p>
                  <strong>7.2</strong> Changes will take effect immediately upon posting on the website.
                </p>
                <p>
                  <strong>7.3</strong> Continued use of the service constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="section8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Governing Law</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>8.1</strong> These terms are governed by the laws of the Lao PDR.
                </p>
                <p>
                  <strong>8.2</strong> Any disputes shall be subject to the jurisdiction of Lao courts.
                </p>
                <p>
                  <strong>8.3</strong> If any provision is found to be unlawful, the remaining provisions shall remain in full force and effect.
                </p>
              </div>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">Email: legal@busticket.com</p>
              <p className="text-gray-600">Phone: 02-123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
