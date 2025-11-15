/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  RotateCw,
  Truck,
} from "lucide-react";
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
  { name: "Shirt", image: "/images/boy01.png" },
  { name: "Pant", image: "/images/boy02.png" },
  { name: "Frock", image: "/images/girl02.png" },
  { name: "T-shirt", image: "/images/girl01.png" },
  { name: "Dhuti", image: "/images/boy01.png" },
  { name: "Panjabi", image: "/images/boy02.png" },
  { name: "Lehenga", image: "/images/girl02.png" },
  { name: "Salwar Kameez", image: "/images/girl02.png" },
  { name: "Toys", image: "/images/boy01.png" },
  { name: "Books", image: "/images/boy02.png" },
];
const FEATURED_IMAGES = [
  {
    id: 1,
    image: "/images/gift01.webp",
    title: "Newborn Gift Box",
  },
  {
    id: 2,
    image: "/images/gift02.webp",
    title: "Kids Dress",
  },
  {
    id: 3,
    image: "/images/gift03.webp",
    title: "Kids Half Shirt",
  },
  {
    id: 4,
    image: "/images/gift04.webp",
    title: "Premium Baby Items",
  },
  {
    id: 5,
    image: "/images/gift05.webp",
    title: "Combo Box",
  },
  {
    id: 6,
    image: "/images/gift06.webp",
    title: "Seasonal Outfits",
  },
];

// -------------------- HERO BANNER --------------------
const HeroBanner = () => {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1622290291720-ac961c43ee30?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/category/panjabi",
    },
    {
      src: "https://images.unsplash.com/photo-1670014543406-a26719b352ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/category/pants",
    },
    {
      src: "https://images.unsplash.com/photo-1622218286192-95f6a20083c7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/category/toys",
    },
    {
      src: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/category/books",
    },
    {
      src: "https://images.unsplash.com/photo-1574681357916-9d4464642696?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/category/frocks",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // smoother timing
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
            className={`absolute inset-0 w-full h-screen object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            draggable={false}
            width={700}
            height={700}
          />
        </Link>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-md text-gray-700"
      >
        <ChevronLeft size={20} className="sm:text-lg" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-md text-gray-700"
      >
        <ChevronRight size={20} className="sm:text-lg" />
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// -------------------- CATEGORY NAV ROW --------------------
const CategoryNav = ({ items }: { items: string[] }) => {
  // Map category names to href slugs
  const slugMap: Record<string, string> = {
    "Salwar Kameez": "salwar-kameez",
    Lehenga: "lehenga",
    Frock: "frock",
    "Panjabi Set": "panjabi-set",
    Panjabi: "panjabi",
    Dhuti: "dhuti",
    "T-shirt": "t-shirt",
    Shirt: "shirt",
    Pants: "pants",
    Toys: "toys",
    "Handmade Dolls": "handmade-dolls",
    "ABC Toys": "abc-toys",
    Books: "books",
    Mayurpankhi: "mayurpankhi",
  };

  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center text-lg font-medium">
        {items.map((item, idx) => (
          <React.Fragment key={item}>
            {/* Category Item */}
            <Link
              href={`/product/${
                slugMap[item] || item.toLowerCase().replace(/\s+/g, "-")
              }`}
              className="
                text-sm md:text-lg
                w-full 
                text-center
                text-[#EC8923]
                px-3 py-1
                cursor-pointer
                transition
                hover:bg-gray-700
                hover:text-white
              "
            >
              {item}
            </Link>

            {/* Divider */}
            {idx < items.length - 1 && (
              <span className="text-black text-sm md:text-xl select-none leading-none">
                |
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// -------------------- PRODUCT SLIDER --------------------
const ProductSlider = ({ products }: { products: Product[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of visible images based on screen width
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
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

    const itemWidth = containerRef.current.children[0]?.clientWidth || 300;

    containerRef.current.style.transform = `translateX(-${
      index * (itemWidth + 24)
    }px)`; // 24 = gap-6

    setCurrentIndex(index);
  };

  const prev = () => currentIndex > 0 && slideTo(currentIndex - 1);
  const next = () => currentIndex < maxIndex && slideTo(currentIndex + 1);

  return (
    <section className="w-full bg-white pt-12">
      {/* Top Info Section */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row justify-around items-center gap-10 text-center">
          {/* Item 1 */}
          <div className="flex  items-center gap-2">
            <Truck size={35} className="text-black" />
            <div className="flex flex-col justify-center items-start">
              <h3 className="text-sm font-bold uppercase tracking-wide">
                FREE SHIPPING & RETURN
              </h3>
              <p className="text-gray-600 text-sm">
                Free shipping on all orders over 3000BDT
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex  items-center gap-2">
            <RotateCw size={35} className="text-black" />
            <div className="flex flex-col justify-center items-start">
              <h3 className="text-sm font-bold uppercase tracking-wide">
                MONEY BACK GUARANTEE
              </h3>
              <p className="text-gray-600 text-sm">100% money back guarantee</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2">
            <Headphones size={35} className="text-black" />
            <div className="flex flex-col justify-center items-start">
              <h3 className="text-sm font-bold uppercase tracking-wide">
                ONLINE SUPPORT 24/7
              </h3>
              <p className="text-gray-600 text-sm">We are always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 pb-10">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
            bg-white/80 shadow p-2 rounded-full 
            ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white"
            }`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-6 transition-transform duration-300 ease-out"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[300px] max-w-[300px] overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={currentIndex === maxIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 
            bg-white/80 shadow p-2 rounded-full 
            ${
              currentIndex === maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white"
            }`}
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => slideTo(idx)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all 
                ${idx === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// -------------------- EXPLORE BY CATEGORIES --------------------
const ExploreByCategories = () => (
  <section className="w-full max-w-[1200px] mx-auto px-4 py-20">
    {/* Title */}
    <h2 className="text-center text-3xl text-gray-700  font-bold mb-16 tracking-wide">
      EXPLORE BY CATEGORIES
    </h2>

    {/* Grid */}
    <div
      className="
      grid grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-5  
      gap-y-14 gap-x-4 
      justify-items-center
    "
    >
      {EXPLORE_CATEGORIES.map((cat) => {
        const slug = cat.name.toLowerCase().replace(/\s+/g, "-");

        return (
          <Link
            key={cat.name}
            href={`/product/${slug}`}
            className="flex flex-col items-center group"
          >
            {/* Yellow Background Blob (same as screenshot) */}
            <div
              className="
              overflow-hidden
              relative 
              w-36 h-40 
              sm:w-40 sm:h-44 
              bg-[#FBCE57] 
              rounded-[40%] 
              shadow-md
              flex items-center justify-center
              transition-transform duration-300 
              group-hover:scale-105
            "
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={200}
                height={200}
                className="
                  object-contain
                  max-h-[90%]
                  drop-shadow-lg
                  transition-transform duration-300 
                  group-hover:scale-110
                "
              />
            </div>

            {/* Label */}
            <p
              className="
                mt-4 
                text-lg font-semibold 
                tracking-wide
                group-hover:text-[#EC8923]
                transition-colors duration-300
              "
              style={{
                fontFamily: `"KG Happy", "Comic Sans MS", "Poppins", sans-serif`,
              }}
            >
              {cat.name}
            </p>
          </Link>
        );
      })}
    </div>
  </section>
);

// -------------------- shuffleImages  PRODUCTS --------------------
const shuffleImages = (arr: any[]) =>
  [...arr].sort(() => Math.random() - 0.5).slice(0, 6);

const WelcomeToShishuWorld = () => {
  const randomImages = shuffleImages(FEATURED_IMAGES);

  return (
    <section className="w-full max-w-full mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-center text-3xl text-gray-700 font-extrabold mb-4 tracking-wide">
        WELCOME TO SHISHU,S WORLD
      </h2>
      <p className="text-center text-gray-500 text-3xl mb-14">
        Enjoy the exceptional quality in all our products
      </p>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {randomImages.map((item) => (
          <div
            key={item.id}
            className="relative w-full overflow-hidden shadow-lg break-inside-avoid group"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

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
      <WelcomeToShishuWorld />

      <ExploreByCategories />

      <section className="w-full py-8">
        <ProductGrid products={next12} />
      </section>
      <Footer />
    </div>
  );
}
