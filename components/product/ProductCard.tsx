import Link from "next/link";
import { Product } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/lib/cartSlice";
import { MessageSquareShare } from "lucide-react";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const productUrl = `/shop/${product.category}/${product.slug}`;

  const handleAddToCart = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
      })
    );
  };

  return (
    <div className="relative group bg-white overflow-hidden border-4 border-transparent transition-all duration-300 p-0  hover:border-gray-400 cursor-pointer">
      {/* FULL BORDER DRAW */}

      <Link href={productUrl} className="block m-0 p-0">
        {/* PERFECT IMAGE FIT */}
        <div className="aspect-square overflow-hidden m-0 p-0">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={500}
            height={500}
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 text-center select-none">
        <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        <Link href={productUrl}>
          <h3 className="text-base font-semibold mb-2 hover:text-[#EC8923] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex justify-center mb-2">
          <div className="flex space-x-1 text-gray-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mb-4">
          {product.originalPrice}৳ – {product.price}৳
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="ml-4 border border-gray-300 bg-white text-black px-3 py-2 text-sm transition-all duration-300 group-hover:bg-[#D97A1F] hover:border-[#D97A1F] group-hover:text-white"
          >
            SELECT OPTIONS
          </button>

          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 ">
            <MessageSquareShare size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
