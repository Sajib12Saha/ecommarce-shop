import { ProductState } from "./_components/product-state";

interface Props {
  searchParams: Promise<{productName:string}>
}

const ProductsPage = async({searchParams}:Props) => {
  const resolvedSearchParams = await searchParams
  return (
    <div className="flex gap-x-2 w-full px-2">
      <ProductState productName={resolvedSearchParams.productName || ""}/>
    </div>
  );
};

export default ProductsPage;
