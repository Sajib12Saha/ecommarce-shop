import { HeadingTitle } from "@/components/heading-title";
import { CategoryContent } from "./_components/category-content";
import { getCategories } from "@/actions/category";

export default async function CategoryPage({ searchParams }: { searchParams?: { page?: string } }) {
  
  const currentPage = Number(searchParams?.page || "1");



  return (
    <div className="min-h-screen py-10">
      <div className="px-4 w-full space-y-8">
        <HeadingTitle title="Browse Categories" />
        <CategoryContent initialPage={currentPage} />
      </div>
    </div>
  );
}
