/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Grid, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Move PRODUCT_DATA here or keep it in lib and import
const PRODUCT_DATA: { [key: string]: any } = {
  loungewear: {
    title: "Winter Loungewear",
    description: "Comfortable and warm loungewear for cozy winter days",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-lounge-1",
        name: "Snowblossom Loungewear",
        price: 34.99,
        originalPrice: 39.99,
        image:
          "https://images.unsplash.com/photo-1551488831-6745a0aa60c6?w=400&h=400&fit=crop",
        category: "loungewear",
        slug: "snowblossom-loungewear",
        inStock: true,
        description: "Soft fleece pajama set for winter comfort",
      },
      {
        id: "w-lounge-2",
        name: "Winter Comfort Set",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
        category: "loungewear",
        slug: "winter-comfort-set",
        inStock: true,
        description: "Comfortable cotton loungewear",
      },
    ],
  },
  "jackets-coats": {
    title: "Jackets & Coats",
    description: "Warm jackets and coats for cold winter days",
    heroImage:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-jacket-1",
        name: "Winter Parka Jacket",
        price: 49.99,
        originalPrice: 59.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        category: "jackets-coats",
        slug: "winter-parka-jacket",
        inStock: true,
        description: "Warm winter parka jacket with hood",
      },
      {
        id: "w-jacket-2",
        name: "Kids Winter Coat",
        price: 42.99,
        image:
          "https://images.unsplash.com/photo-1551488831-00ddcb9294c6?w=400&h=400&fit=crop",
        category: "jackets-coats",
        slug: "kids-winter-coat",
        inStock: true,
        description: "Warm winter coat for kids",
      },
    ],
  },
  hoodie: {
    title: "Hoodies",
    description: "Cozy hoodies for winter comfort",
    heroImage:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-hoodie-1",
        name: "Kids Winter Hoodie",
        price: 29.99,
        originalPrice: 34.99,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        category: "hoodie",
        slug: "kids-winter-hoodie",
        inStock: true,
        description: "Warm and comfortable winter hoodie",
      },
    ],
  },
  "gift-box": {
    title: "Gift Box Collection",
    description: "Beautifully curated gift boxes for special occasions",
    heroImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f4e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "t-gift-1",
        name: "Premium Baby Gift Box",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f4e4?w=400&h=400&fit=crop",
        category: "gift-box",
        slug: "premium-baby-gift-box",
        inStock: true,
        description: "Premium gift box for newborns",
      },
    ],
  },
  toys: {
    title: "Toys Collection",
    description: "Educational and fun toys for children",
    heroImage:
      "https://images.unsplash.com/photo-1594787319143-60a132a8e0f0?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-toy-1",
        name: "Play Craft Crossword Premiere Game (Ages 5+)",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1594787319143-60a132a8e0f0?w=400&h=400&fit=crop",
        category: "toys",
        slug: "play-craft-crossword-premiere-game-ages-5",
        inStock: true,
        description: "Colorful educational building blocks",
      },
    ],
  },
  lehenga: {
    title: "Lehenga Collection",
    description: "Traditional lehenga for special occasions",
    heroImage:
      "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-lehenga-1",
        name: "Traditional Silk Lehenga",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=400&h=400&fit=crop",
        category: "lehenga",
        slug: "traditional-silk-lehenga",
        inStock: true,
        description: "Beautiful traditional silk lehenga",
      },
    ],
  },
  "salwar-kameez": {
    title: "Salwar Kameez",
    description: "Traditional salwar kameez sets",
    heroImage:
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-salwar-1",
        name: "Embroidered Salwar Kameez",
        price: 65.99,
        image:
          "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
        category: "salwar-kameez",
        slug: "embroidered-salwar-kameez",
        inStock: true,
        description: "Beautiful embroidered salwar kameez",
      },
    ],
  },
  "co-ord-set": {
    title: "Co-ord Sets",
    description: "Matching co-ord sets for casual wear",
    heroImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&h=400&fit=crop",
    products: [
      {
        id: "c-coord-1",
        name: "Casual Co-ord Set",
        price: 35.99,
        image:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
        category: "co-ord-set",
        slug: "casual-co-ord-set",
        inStock: true,
        description: "Comfortable casual co-ord set",
      },
    ],
  },
  pants: {
    title: "Casual Pants",
    description: "Comfortable casual pants for kids",
    heroImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=400&fit=crop",
    products: [
      {
        id: "c-pants-1",
        name: "Kids Casual Pants",
        price: 22.99,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        category: "pants",
        slug: "kids-casual-pants",
        inStock: true,
        description: "Comfortable casual pants for kids",
      },
    ],
  },
  polo: {
    title: "Polo Shirts",
    description: "Casual polo shirts for boys",
    heroImage:
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "b-polo-1",
        name: "Boys Cotton Polo",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
        category: "polo",
        slug: "boys-cotton-polo",
        inStock: true,
        description: "Comfortable cotton polo shirt for boys",
      },
    ],
  },
  frock: {
    title: "Frocks Collection",
    description: "Beautiful frocks for little girls",
    heroImage:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1200&h=400&fit=crop",
    products: [
      {
        id: "g-frock-1",
        name: "Girls Summer Frock",
        price: 32.99,
        image:
          "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=400&fit=crop",
        category: "frock",
        slug: "girls-summer-frock",
        inStock: true,
        description: "Beautiful summer frock for girls",
      },
    ],
  },
  leggings: {
    title: "Leggings",
    description: "Comfortable leggings for girls",
    heroImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=400&fit=crop",
    products: [
      {
        id: "g-leggings-1",
        name: "Girls Cotton Leggings",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        category: "leggings",
        slug: "girls-cotton-leggings",
        inStock: true,
        description: "Comfortable cotton leggings for girls",
      },
    ],
  },
  default: {
    title: "Products",
    description: "Browse our collection of products",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    products: [
      {
        id: "default-1",
        name: "Sample Product",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
        category: "general",
        slug: "sample-product",
        inStock: true,
        description: "Sample product description",
      },
    ],
  },
};

export default function ProductCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [categoryData, setCategoryData] = useState(PRODUCT_DATA.default);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setTimeout(() => {
      const data = PRODUCT_DATA[slug] || PRODUCT_DATA.default;
      setCategoryData(data);
      setLoading(false);
    }, 400);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC8923] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryData.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(categoryData.products.length / productsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-6 px-6 md:px-40">
        <section className="relative w-full h-[80vh] overflow-hidden">
          <Image
            src={categoryData.heroImage}
            alt={categoryData.title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </section>
      </section>

      {/* Filter + Breadcrumb Bar */}
      {/* Filter + Wireframe Bar - Pixel Perfect Match */}
      <section className="px-6 md:px-40 ">
        <div className="bg-gray-100 px-4 py-5 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
          {/* Left: Price & Sort - Wireframe Style */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <select
              defaultValue=""
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700 font-medium text-sm focus:outline-none focus:border-gray-400"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "12px",
              }}
            >
              <option value="" disabled>
                SELECT PRICE
              </option>
              <option>৳0 – ৳500</option>
              <option>৳500 – ৳1000</option>
              <option>৳1000 – ৳2000</option>
            </select>

            <select
              defaultValue="latest"
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700 font-medium text-sm focus:outline-none focus:border-gray-400"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "12px",
              }}
            >
              <option value="latest">SORT BY LATEST</option>
              <option value="low">Price Low to High</option>
              <option value="high">Price High to Low</option>
            </select>
          </div>

          {/* Right: Show & View Mode - Wireframe Style */}
          <div className="flex items-center gap-3">
            {/* Show Count */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-1.5">
              <span className="text-sm font-medium text-gray-700 mr-1">
                Show:
              </span>
              <select
                defaultValue="12"
                className="appearance-none bg-transparent text-sm font-medium text-gray-700 pr-6 focus:outline-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "10px",
                }}
              >
                <option>12</option>
                <option>24</option>
                <option>36</option>
              </select>
            </div>

            {/* View Mode Icons */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button className="p-2 hover:bg-gray-50 transition-colors">
                <Grid className="h-4 w-4 text-gray-600" />
              </button>
              <div className="w-px bg-gray-300 h-full" />
              <button className="p-2 hover:bg-gray-50 transition-colors">
                <List className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pt-8 px-6 md:px-40">
        {currentProducts.length > 0 ? (
          <ProductGrid products={currentProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
            <Button className="mt-4 bg-[#EC8923] hover:bg-[#d97a1f] text-white">
              Continue Shopping
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-12 text-sm text-gray-600">
            {/* Show per page */}
            <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
              <span className="text-sm mr-1">Show:</span>
              <select className="bg-transparent focus:outline-none">
                <option>12</option>
                <option>24</option>
                <option>36</option>
              </select>
            </div>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === i + 1
                      ? "bg-[#EC8923] text-white border-[#EC8923]"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
