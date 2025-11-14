"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types"; // ✅ adjust if your Product interface lives elsewhere
import Image from "next/image";

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
          <Image
            src={slide.src}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            draggable={false}
            width={100}
            height={100}
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
  <div className=" px-4 lg:px-12 py-8">
    <div className="flex justify-between items-center text-lg font-medium">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          {/* Category Item */}
          <span
            className="
              text-[#EC8923]
              px-3 py-1
              cursor-pointer
              transition
              hover:bg-gray-700
              hover:text-white
            "
          >
            {item}
          </span>

          {/* Divider */}
          {idx < items.length - 1 && (
            <span className="text-black text-xl select-none leading-none">
              |
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// -------------------- PRODUCT SLIDER --------------------
const ProductSlider = ({ products }: { products: Product[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of visible cards based on screen width
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4; // Desktop
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const slideTo = (index: number) => {
    if (!containerRef.current) return;

    const cardWidth = containerRef.current.children[0]?.clientWidth || 300;

    containerRef.current.style.transform = `translateX(-${
      index * (cardWidth + 24)
    }px)`; // 24 = gap-6

    setCurrentIndex(index);
  };

  const prev = () => currentIndex > 0 && slideTo(currentIndex - 1);
  const next = () => currentIndex < maxIndex && slideTo(currentIndex + 1);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
            bg-white shadow-md p-3 rounded-full transition 
            ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Slider Track Wrapper (hidden overflow) */}
          <div className="overflow-hidden px-10">
            <div
              ref={containerRef}
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{ willChange: "transform" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[260px] max-w-[260px] bg-white rounded-xl shadow-md hover:shadow-lg transition p-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 
            bg-white shadow-md p-3 rounded-full transition 
            ${
              currentIndex === maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

// -------------------- EXPLORE BY CATEGORIES --------------------
const ExploreByCategories = () => (
  <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
    {/* Title */}
    <h2 className="text-center text-3xl font-bold tracking-wide mb-12">
      EXPLORE BY CATEGORIES
    </h2>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-14 gap-x-6 justify-items-center">
      {EXPLORE_CATEGORIES.map((cat) => (
        <div key={cat.name} className="text-center cursor-pointer group">
          {/* Circle Background */}
          <div className="relative w-40 h-40 rounded-full bg-[#F9D84A] mx-auto flex items-center justify-center overflow-visible">
            <Image
              src={cat.image}
              alt={cat.name}
              width={180}
              height={180}
              className="object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />
          </div>

          {/* Label */}
          <p
            className="mt-3 text-lg font-medium tracking-wide 
            group-hover:text-[#EC8923]
            font-[500] uppercase"
            style={{
              fontFamily: "Poppins, sans-serif",
            }}
          >
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
    <div className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
      <Navbar />

      <HeroBanner />

      {/* No padding, full width */}
      <section className="w-full py-8">
        <ProductGrid products={first8} />
      </section>

      <CategoryNav items={["Lehenga", "Salwar Kameez", "Frock"]} />

      <section className="w-full py-8">
        <ProductGrid products={next8} />
      </section>

      <CategoryNav
        items={["Panjabi Set", "Panjabi", "Dhuti", "T-shirt", "Shirt", "Pants"]}
      />

      <section className="w-full py-8">
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
