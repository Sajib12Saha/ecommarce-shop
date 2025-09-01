"use client";

import { HeadingTitle } from "@/components/heading-title";
import { CategoryContent } from "./_components/category-content";
import { useSearchParams } from "next/navigation";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const pageStr = searchParams.get("page");
  const currentPage = Number(pageStr) || 1;

  return (
    <div className="min-h-screen py-10">
      <div className="px-4 w-full space-y-8">
        <HeadingTitle title="Browse Categories" />
        <CategoryContent currentPage={currentPage} />
      </div>
    </div>
  );
};

export default CategoryPage;
