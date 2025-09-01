"use client";

import { HeadingTitle } from "@/components/heading-title";
import { CategoryContent } from "./_components/category-content";

const CategoryPage = () => {

  return (
    <div className="min-h-screen py-10">
      <div className="px-4 w-full space-y-8">
        <HeadingTitle title="Browse Categories" />
        <CategoryContent/>
      </div>
    </div>
  );
};

export default CategoryPage;
