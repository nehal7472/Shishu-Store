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
      "https://images.unsplash.com/photo-1622218286192-95f6a20083c7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "w-lounge-1",
        name: "Snowblossom Loungewear",
        price: 34.99,
        originalPrice: 39.99,
        image:
          "https://images.unsplash.com/photo-1758782213532-bbb5fd89885e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          "https://images.unsplash.com/photo-1762077656341-255342c49279?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "w-jacket-1",
        name: "Winter Parka Jacket",
        price: 49.99,
        originalPrice: 59.99,
        image:
          "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          "https://images.unsplash.com/photo-1557418669-db3f781a58c0?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "w-hoodie-1",
        name: "Kids Winter Hoodie",
        price: 29.99,
        originalPrice: 34.99,
        image:
          "https://images.unsplash.com/photo-1635796244808-d93b6e26de62?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "t-gift-1",
        name: "Premium Baby Gift Box",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "tb-toy-1",
        name: "Play Craft Crossword Premiere Game (Ages 5+)",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1596068587619-e4b11c7a3488?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1724856604403-60304b28906c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "e-lehenga-1",
        name: "Traditional Silk Lehenga",
        price: 89.99,
        image:
          "https://plus.unsplash.com/premium_photo-1682091998866-49086baf65b3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "e-salwar-1",
        name: "Embroidered Salwar Kameez",
        price: 65.99,
        image:
          "https://images.unsplash.com/photo-1583391733981-8b530b760347?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1762777777740-6fc60e59a4bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "c-coord-1",
        name: "Casual Co-ord Set",
        price: 35.99,
        image:
          "https://images.unsplash.com/photo-1762777777740-6fc60e59a4bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1640336437301-8368b53861ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "c-pants-1",
        name: "Kids Casual Pants",
        price: 22.99,
        image:
          "https://images.unsplash.com/photo-1640336437301-8368b53861ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "b-polo-1",
        name: "Boys Cotton Polo",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1721190167637-fb49b48c2417?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "g-frock-1",
        name: "Girls Summer Frock",
        price: 32.99,
        image:
          "https://images.unsplash.com/photo-1721190167637-fb49b48c2417?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1541694458248-5aa2101c77df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "g-leggings-1",
        name: "Girls Cotton Leggings",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1541694458248-5aa2101c77df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "default-1",
        name: "Sample Product",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
