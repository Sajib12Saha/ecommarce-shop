import { HeadingTitle } from "@/components/heading-title";
import { CategoryContent } from "./_components/category-content";


export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams?.page || "1");

  return (
    <div className="min-h-screen py-10">
      <div className="px-4 w-full space-y-8">
        <HeadingTitle title="Browse Categories" />
        <CategoryContent initialPage={currentPage} />
      </div>
    </div>
  );
}
