import Link from 'next/link';
import { ShieldCheckIcon, CalendarIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function PrivacyPage() {
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
              <ShieldCheckIcon className="h-8 w-8 mr-3 text-blue-600" />
              Privacy Policy
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
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <LockClosedIcon className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Commitment to Data Protection</h3>
                <p className="text-blue-800 text-sm">
                  We value your privacy and are committed to protecting your personal information.
                  This policy explains how we collect, use, and protect your data.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#section1" className="text-blue-600 hover:underline">1. Information We Collect</a></li>
              <li><a href="#section2" className="text-blue-600 hover:underline">2. How We Use Information</a></li>
              <li><a href="#section3" className="text-blue-600 hover:underline">3. Data Sharing</a></li>
              <li><a href="#section4" className="text-blue-600 hover:underline">4. Data Security</a></li>
              <li><a href="#section5" className="text-blue-600 hover:underline">5. Cookies and Tracking Technologies</a></li>
              <li><a href="#section6" className="text-blue-600 hover:underline">6. Your Rights</a></li>
              <li><a href="#section7" className="text-blue-600 hover:underline">7. Data Retention</a></li>
              <li><a href="#section8" className="text-blue-600 hover:underline">8. Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <section id="section1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Information you provide directly:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Full Name</li>
                    <li>Email</li>
                    <li>Phone Number</li>
                    <li>Payment Information (excluding full credit card details)</li>
                    <li>Booking History</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Information collected automatically:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP Address</li>
                    <li>Browser and device information</li>
                    <li>Website usage behavior</li>
                    <li>Approximate location</li>
                    <li>Time and frequency of access</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Provide Services:</strong> Process bookings, confirm payments, send tickets</li>
                  <li><strong>Communication:</strong> Send confirmations, status updates, important alerts</li>
                  <li><strong>Improve Services:</strong> Analyze usage, develop new features</li>
                  <li><strong>Security:</strong> Prevent fraud, monitor abnormal activities</li>
                  <li><strong>Marketing:</strong> Send special offers (if consented)</li>
                  <li><strong>Legal Compliance:</strong> Respond to requests from government agencies</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Sharing</h2>
              <div className="space-y-4 text-gray-600">
                <p>We may share your information with:</p>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Essential Partners:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Transport companies providing bus services</li>
                    <li>Payment Providers</li>
                    <li>Email and SMS service providers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">When Required by Law:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>When ordered by court or regulatory agency</li>
                    <li>To protect rights and security</li>
                    <li>In fraud investigation cases</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> We will never sell or rent your personal information to third parties for marketing purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>We implement the following security measures:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Encryption</h4>
                    <p className="text-sm">Data is encrypted with SSL/TLS during both transmission and storage.</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Access Control</h4>
                    <p className="text-sm">Only authorized personnel can access the data.</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Data Backup</h4>
                    <p className="text-sm">Backup and recovery systems are in place for emergencies.</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Monitoring</h4>
                    <p className="text-sm">Monitor and update security systems regularly.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-gray-600">
                <p>We use cookies to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Remember settings and login status</li>
                  <li>Analyze website usage</li>
                  <li>Improve user experience</li>
                  <li>Display relevant content</li>
                </ul>

                <p>You can control cookies through your browser settings.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <div className="space-y-4 text-gray-600">
                <p>You have the following rights:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Right to Access</h4>
                    <p className="text-green-800 text-sm">Request to view personal data we hold.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Right to Rectification</h4>
                    <p className="text-blue-800 text-sm">Request correction of inaccurate or incomplete data.</p>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Right to Erasure</h4>
                    <p className="text-red-800 text-sm">Request deletion of personal data (under certain conditions).</p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Right to Object</h4>
                    <p className="text-purple-800 text-sm">Object to data usage for direct marketing.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="section7">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <div className="space-y-4 text-gray-600">
                <p>We will retain your data for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Information:</strong> As long as the account is active.</li>
                  <li><strong>Booking History:</strong> 5 years for accounting and legal purposes.</li>
                  <li><strong>Payment Information:</strong> 3 years for monitoring and preventing fraud.</li>
                  <li><strong>Marketing Information:</strong> Until consent is withdrawn.</li>
                </ul>

                <p>Upon expiration, we will securely delete or render the data unidentifiable.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="section8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <div className="space-y-4 text-gray-600">
                <p>If you have questions about the Privacy Policy or wish to exercise your rights, please contact:</p>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Data Protection Officer</h4>
                  <div className="space-y-1 text-sm">
                    <p>Email: privacy@busticket.com</p>
                    <p>Phone: 02-123-4567 ext. 101</p>
                    <p>Address: 123 Kaysone Phomvihane Road, Vientiane, Laos 01000</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="mt-12 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              This Privacy Policy may be updated from time to time. We will notify you via website or email.
              Continued use of the service implies acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
