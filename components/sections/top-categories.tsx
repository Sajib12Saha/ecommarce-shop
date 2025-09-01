"use client";

import { CategoryCard } from "../ui/category-card";
import { useCategories } from "@/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { HeadingTitle } from "../heading-title";

export const TopCategories = () => {
  const { data: categories, loading } = useCategories();

  return (
    <div className="py-16">
     <div className="space-y-8">
 
         <HeadingTitle title="Top Categories"/>
  
        {loading ? (
          // ✅ Shadcn Skeleton Loader
          <div className="flex flex-wrap justify-center gap-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="w-40 h-48 rounded-xl flex flex-col items-center justify-center gap-3"
              >
                <Skeleton className="w-24 h-24 rounded-lg" />
                <Skeleton className="w-20 h-4 rounded" />
              </div>
            ))}
          </div>
        ) : categories?.data && categories.data.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {categories.data.slice(0, 2).map((category, index) => (
              <CategoryCard category={category} key={index} />
            ))}
          </div>
        ) : (
             <p className="text-center text-gray-600 py-10">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
};
