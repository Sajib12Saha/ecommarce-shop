import { HeadingTitle } from "@/components/heading-title";
import { CategoryContent } from "./_components/category-content";


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({ searchParams }: Props) {
  const page = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;

  const currentPage = Number(page || "1");

  return (
    <div className="min-h-screen py-10">
      <div className="px-4 w-full space-y-8">
        <HeadingTitle title="Browse Categories" />
        <CategoryContent initialPage={currentPage} />
      </div>
    </div>
  );
}
