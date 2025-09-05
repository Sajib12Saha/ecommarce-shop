import { ProductState } from "./_components/product-state";

interface Props {
  searchParams: Promise<{productName:string, categoryId:string}>
}

const ProductsPage = async({searchParams}:Props) => {
  const { productName = "", categoryId = "" } = await searchParams;
  return (
    <div className="flex gap-x-2 w-full px-1">
      <ProductState productName={productName || ""} categoryId={categoryId || ""}/>
    </div>
  );
};

export default ProductsPage;
