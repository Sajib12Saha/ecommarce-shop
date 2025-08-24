import Image from "next/image";

export function TopCategories() {
  const categories = [
    {
      name: "Hilly Spices",
      image: "/banners/all-masala.jpg",
    },
    {
      name: "Hilly Fruits",
      image: "/banners/fruits.jpg",
    },
    // Add more categories here
  ];

  return (
    <div className="py-16 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Top Categories
        </h3>

        {/* Responsive & Centered Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer w-28 sm:w-32"
            >
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full overflow-hidden relative transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
