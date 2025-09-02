import { ProductState } from "./_components/product-state";


const ProductsPage = async() => {
  return (
    <div className="flex gap-x-2 w-full px-2">
      <ProductState />
    </div>
  );
};

export default ProductsPage;
