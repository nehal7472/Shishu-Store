/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

// === Dummy product data (20 items) ===
const DUMMY_PRODUCTS: any[] = [
  {
    id: "product-1",
    name: "Classic Leather Bag",
    price: "79.99",
    originalPrice: "99.99",
    image:
      "https://images.unsplash.com/photo-1758782213532-bbb5fd89885e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // girl photo :contentReference[oaicite:0]{index=0}
    slug: "classic-leather-bag",
  },
  {
    id: "product-2",
    name: "Stylish Sneakers",
    price: "59.99",
    originalPrice: "69.99",
    image:
      "https://images.unsplash.com/photo-1587434934110-f2d382887b2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // kids fashion photo :contentReference[oaicite:1]{index=1}
    slug: "stylish-sneakers",
  },
  {
    id: "product-3",
    name: "Modern Wrist Watch",
    price: "129.99",
    originalPrice: "149.99",
    image:
      "https://images.unsplash.com/photo-1622290319146-7b63df48a635?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // boy uniform photo :contentReference[oaicite:2]{index=2}
    slug: "modern-wrist-watch",
  },
  {
    id: "product-4",
    name: "Wireless Headphones",
    price: "89.99",
    originalPrice: "109.99",
    image:
      "https://images.unsplash.com/photo-1622290291165-d341f1938b8a?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // kids in traditional clothing :contentReference[oaicite:3]{index=3}
    slug: "wireless-headphones",
  },
  {
    id: "product-5",
    name: "Elegant Dress",
    price: "99.99",
    originalPrice: "129.99",
    image:
      "https://images.unsplash.com/photo-1706025090731-061925241498?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // little girl in dress :contentReference[oaicite:4]{index=4}
    slug: "elegant-dress",
  },
  {
    id: "product-6",
    name: "Casual Shirt",
    price: "49.99",
    originalPrice: "59.99",
    image:
      "https://images.unsplash.com/photo-1725147874926-dfebe6d996ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // clothes hanging photo :contentReference[oaicite:5]{index=5}
    slug: "casual-shirt",
  },
  {
    id: "product-7",
    name: "Running Shoes",
    price: "69.99",
    originalPrice: "79.99",
    image:
      "https://images.unsplash.com/photo-1762077656341-255342c49279?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // little girl in grass :contentReference[oaicite:6]{index=6}
    slug: "running-shoes",
  },
  {
    id: "product-8",
    name: "Designer Sunglasses",
    price: "49.99",
    originalPrice: "69.99",
    image:
      "https://images.unsplash.com/photo-1641708594063-46b5bbe83e40?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse same kids photo :contentReference[oaicite:7]{index=7}
    slug: "designer-sunglasses",
  },
  {
    id: "product-9",
    name: "Leather Wallet",
    price: "39.99",
    originalPrice: "49.99",
    image:
      "https://images.unsplash.com/photo-1642240729648-01e53be40567?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse :contentReference[oaicite:8]{index=8}
    slug: "leather-wallet",
  },
  {
    id: "product-10",
    name: "Sports Backpack",
    price: "69.99",
    originalPrice: "89.99",
    image:
      "https://images.unsplash.com/photo-1758851552799-51fcf1c64e8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // boy with backpack :contentReference[oaicite:9]{index=9}
    slug: "sports-backpack",
  },
  {
    id: "product-11",
    name: "Denim Jacket",
    price: "89.99",
    originalPrice: "109.99",
    image:
      "https://images.unsplash.com/photo-1632906512112-9670bead6082?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse traditional kids :contentReference[oaicite:10]{index=10}
    slug: "denim-jacket",
  },
  {
    id: "product-12",
    name: "Classic Hat",
    price: "29.99",
    originalPrice: "39.99",
    image:
      "https://plus.unsplash.com/premium_photo-1676031810059-dfca65715291?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse girl photo :contentReference[oaicite:11]{index=11}
    slug: "classic-hat",
  },
  {
    id: "product-13",
    name: "Formal Shoes",
    price: "99.99",
    originalPrice: "119.99",
    image:
      "https://images.unsplash.com/photo-1586014434742-26eb13938dd3?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse :contentReference[oaicite:12]{index=12}
    slug: "formal-shoes",
  },
  {
    id: "product-14",
    name: "Elegant Necklace",
    price: "149.99",
    originalPrice: "179.99",
    image:
      "https://images.unsplash.com/photo-1622290291720-ac961c43ee30?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse :contentReference[oaicite:13]{index=13}
    slug: "elegant-necklace",
  },
  {
    id: "product-15",
    name: "Smartphone Case",
    price: "19.99",
    originalPrice: "29.99",
    image:
      "https://images.unsplash.com/photo-1615135795309-77789c8bb87c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse clothes on line :contentReference[oaicite:14]{index=14}
    slug: "smartphone-case",
  },
  {
    id: "product-16",
    name: "Bluetooth Speaker",
    price: "49.99",
    originalPrice: "59.99",
    image:
      "https://images.unsplash.com/photo-1592653902547-285aac36d851?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNoaWxkcmVuJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D", // reuse girl in grass :contentReference[oaicite:15]{index=15}
    slug: "bluetooth-speaker",
  },
  {
    id: "product-17",
    name: "Sports Cap",
    price: "24.99",
    originalPrice: "34.99",
    image:
      "https://images.unsplash.com/photo-1759473434572-64c4bfd8cb31?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse backpack boy :contentReference[oaicite:16]{index=16}
    slug: "sports-cap",
  },
  {
    id: "product-18",
    name: "Casual Pants",
    price: "59.99",
    originalPrice: "79.99",
    image:
      "https://plus.unsplash.com/premium_photo-1726826583175-b75f97b01ff6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse traditional kids :contentReference[oaicite:17]{index=17}
    slug: "casual-pants",
  },
  {
    id: "product-19",
    name: "Fashion Belt",
    price: "34.99",
    originalPrice: "44.99",
    image:
      "https://images.unsplash.com/photo-1607350999519-a2f09cead560?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse girl photo :contentReference[oaicite:18]{index=18}
    slug: "fashion-belt",
  },
  {
    id: "product-20",
    name: "Leather Boots",
    price: "119.99",
    originalPrice: "139.99",
    image:
      "https://images.unsplash.com/photo-1641708620788-76fafb66787a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // reuse kids photo :contentReference[oaicite:19]{index=19}
    slug: "leather-boots",
  },
];

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Pagination calculation
  const totalPages = Math.ceil(DUMMY_PRODUCTS.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentProducts = DUMMY_PRODUCTS.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-12 px-4 md:px-8">
        {/* Product Grid */}
        <ProductGrid
          products={currentProducts.map((product) => ({
            ...product,
            href: `/shop/${product.slug}/page`, // link to single product
          }))}
        />

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            variant="outline"
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            variant="outline"
          >
            Next
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
