import { HeadingTitle } from "@/components/heading-title";
import FilterSideBar from "./_components/filter-sidebar";
import { ProductsContent } from "./_components/products-content";

interface Props {
  searchParams: Promise<{ page?: string }>
}

const ProductsPage = async ({searchParams}:Props) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page || "1");



  return (
      <div className="flex gap-x-2 w-full   px-4">
 <FilterSideBar/>
   <div className="min-h-screen flex-1  py-10">
      <div className="w-full space-y-8 px-4 lgpx-8">
       <HeadingTitle title="Browse Products" />
        <ProductsContent currentPage={currentPage}/>
      </div>
    </div>
      </div>
           
  
  );
};

export default ProductsPage;
