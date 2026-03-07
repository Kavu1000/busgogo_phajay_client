import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign Up Successful!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome, Log In to book bus tickets
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Your account is now ready to use
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>You can start booking bus tickets immediately</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Things you can do:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Search and  book bus tickets</li>
                <li>Select Seats as desired</li>
                <li>Pay Online</li>
                <li>Track Booking History</li>
                <li>Receive news and  promotions</li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Start booking tickets
              </Link>
              
              <Link
                href="/login"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
