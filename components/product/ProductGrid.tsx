import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
      {products.map((product) => (
        <div key={product.id} className="w-full max-w-xs">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
