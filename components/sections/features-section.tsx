
export function FeaturesSection() {

  const features = [
  {
    title: "MONEY BACK GUARANTEE",
    description: "Try Us Risk-Free with Our Money Back Guarantee!",
    icon: "shield-check", // You can label or map icons however you prefer
  },
  {
    title: "24/7 CUSTOMER SUPPORT",
    description: "Always here to help you, anytime & anywhere!",
    icon: "support", // Label representing icon type
  },
  {
    title: "FAST AND LOW COST DELIVERY",
    description: "Fast, reliable, and budget-friendly delivery",
    icon: "fast-delivery",
  },
];


  return (
    <div className="py-16 bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  {/* Replace with actual SVGs or icons mapped from icon name */}
                  <span className="text-white">{/* icon placeholder */}</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
