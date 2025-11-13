"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types"; // ✅ adjust if your Product interface lives elsewhere

// -------------------- MOCK DATA --------------------
const MOCK_PRODUCTS: Product[] = Array.from({ length: 36 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: 550 + (i % 6) * 100,
  originalPrice: 800 + (i % 6) * 150,
  image: `https://picsum.photos/seed/p${i + 1}/600/600`,
  category: i % 2 === 0 ? "girls" : "boys", // Use actual category names
  slug: `product-${i + 1}`,
  inStock: true,
  description:
    "A cute and comfortable outfit made from soft cotton fabric. Perfect for your little one.",
  sizes: ["S", "M", "L"],
  colors: ["Pink", "Blue", "Green"],
}));

const EXPLORE_CATEGORIES = [
  { name: "Shirt", image: "/placeholder-1.jpg" },
  { name: "Pant", image: "/placeholder-2.jpg" },
  { name: "Frock", image: "/placeholder-3.jpg" },
  { name: "T-shirt", image: "/placeholder-4.jpg" },
  { name: "Dhuti", image: "/placeholder-5.jpg" },
  { name: "Panjabi", image: "/placeholder-6.jpg" },
  { name: "Lehenga", image: "/placeholder-7.jpg" },
  { name: "Salwar Kameez", image: "/placeholder-8.jpg" },
  { name: "Toys", image: "/placeholder-9.jpg" },
  { name: "Books", image: "/placeholder-10.jpg" },
];

// -------------------- HERO BANNER --------------------
const HeroBanner = () => {
  const slides = [
    {
      src: "https://picsum.photos/seed/banner1/1600/900",
      href: "/category/panjabi",
    },
    {
      src: "https://picsum.photos/seed/banner2/1600/900",
      href: "/category/pants",
    },
    {
      src: "https://picsum.photos/seed/banner3/1600/900",
      href: "/category/toys",
    },
    {
      src: "https://picsum.photos/seed/banner4/1600/900",
      href: "/category/books",
    },
    {
      src: "https://picsum.photos/seed/banner5/1600/900",
      href: "/category/frocks",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, idx) => (
        <Link href={slide.href} key={idx}>
          <img
            src={slide.src}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            draggable={false}
          />
        </Link>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-700"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-700"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// -------------------- CATEGORY NAV ROW --------------------
const CategoryNav = ({ items }: { items: string[] }) => (
  <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">
    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center font-semibold text-sm">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          <span className="text-[#EC8923] hover:underline cursor-pointer">
            {item}
          </span>
          {idx < items.length - 1 && (
            <span className="text-gray-300 select-none">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// -------------------- PRODUCT SLIDER --------------------
const ProductSlider = ({ products }: { products: Product[] }) => (
  <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
    <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
    <div className="overflow-x-auto">
      <div className="flex gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] bg-white overflow-hidden"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// -------------------- EXPLORE BY CATEGORIES --------------------
const ExploreByCategories = () => (
  <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
    <h2 className="text-2xl font-bold mb-6">Explore by Categories</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {EXPLORE_CATEGORIES.map((cat) => (
        <div key={cat.name} className="text-center group cursor-pointer">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <p className="font-semibold text-sm group-hover:text-[#EC8923]">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  </section>
);

// -------------------- MAIN PAGE --------------------
export default function HomePage() {
  const first8 = MOCK_PRODUCTS.slice(0, 8);
  const next8 = MOCK_PRODUCTS.slice(8, 16);
  const next12 = MOCK_PRODUCTS.slice(16, 28);
  const sliderItems = MOCK_PRODUCTS.slice(28, 36);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ✅ New Hero Banner */}
      <HeroBanner />

      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <ProductGrid products={first8} />
      </section>

      <CategoryNav items={["Lehenga", "Salwar Kameez", "Frock"]} />

      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <ProductGrid products={next8} />
      </section>

      <CategoryNav
        items={["Panjabi Set", "Panjabi", "Dhuti", "T-shirt", "Shirt", "Pants"]}
      />

      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <ProductGrid products={next12} />
      </section>

      <ProductSlider products={sliderItems} />

      <CategoryNav
        items={["Toys", "Handmade Dolls", "ABC Toys", "Books", "Mayurpankhi"]}
      />

      <ExploreByCategories />

      <Footer />
    </div>
  );
}
