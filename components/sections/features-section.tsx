export function FeaturesSection() {
  return (
    <div className="py-16 bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Money Back Guarantee */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">MONEY BACK GUARANTEE</h4>
              <p className="text-sm text-gray-600">
                Try Us Risk-Free with Our Money Back Guarantee!
              </p>
            </div>
          </div>

          {/* 24/7 Customer Support */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944a11.955 11.955 0 018.618 3.04A12.02 12.02 0 0121 9c0 5.591-3.824 10.29-9 11.622C6.824 19.29 3 14.591 3 9a12.02 12.02 0 01.382-6.016A11.955 11.955 0 0112 2.944z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">24/7 CUSTOMER SUPPORT</h4>
              <p className="text-sm text-gray-600">
                Always here to help you, anytime & anywhere!
              </p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">FAST AND LOW COST DELIVERY</h4>
              <p className="text-sm text-gray-600">
                Fast, reliable, and budget-friendly delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
