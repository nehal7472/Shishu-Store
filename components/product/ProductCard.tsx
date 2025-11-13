import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Generate the URL structure: /shop/category/product-slug
  const productUrl = `/shop/${product.category}/${product.slug}`;

  return (
    <Card className="overflow-hidden group border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <Link href={productUrl}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={productUrl}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 hover:text-[#EC8923] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="bg-[#EC8923] hover:bg-[#d97a1f] text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
