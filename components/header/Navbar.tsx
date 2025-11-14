"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleCart } from "@/lib/cartSlice";
import Image from "next/image";
import { CartDrawer } from "../cart/CartDrawer";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // === Two Separate Rows ===
  const topLinks = [
    { label: "HOME", href: "/" },
    { label: "BUY 2 GET 1 FREE", href: "/offer" },
    {
      label: "WINTER",
      href: "/winter",
      sublinks: [
        { label: "LOUNGEWEAR", href: "/product/loungewear" },
        { label: "JACKETS & COATS", href: "/product/jackets-coats" },
        { label: "HOODIE", href: "/product/hoodie" },
        { label: "SWEAT SUITS", href: "/product/sweat-suits" },
        { label: "SHIRT", href: "/product/shirt" },
      ],
    },
    {
      label: "TINY BY SHISHU",
      href: "/tiny",
      sublinks: [
        { label: "GIFT BOX", href: "/product/gift-box" },
        { label: "NIMA SET", href: "/product/nima-set" },
        { label: "QUILT", href: "/product/quilt" },
      ],
    },
    {
      label: "TOYS & BOOKS",
      href: "/toys-books",
      sublinks: [
        { label: "TOYS", href: "/product/toys" },
        { label: "ACCESSORIES", href: "/product/accessories" },
        { label: "HANDMADE DOLLS", href: "/product/handmade-dolls" },
        { label: "BOOKS", href: "/product/books" },
        { label: "GAMES", href: "/product/games" },
      ],
    },
    {
      label: "ETHNIC WEAR",
      href: "/ethnic",
      sublinks: [
        { label: "LEHENGA", href: "/product/lehenga" },
        { label: "SALWAR KAMEEZ", href: "/product/salwar-kameez" },
        { label: "PANJABI SET", href: "/product/panjabi-set" },
        { label: "JUBBA SET", href: "/product/jubba-set" },
      ],
    },
    {
      label: "CASUAL",
      href: "/casual",
      sublinks: [
        { label: "LOUNGEWEAR", href: "/product/loungewear" },
        { label: "CO-ORD SET", href: "/product/co-ord-set" },
        { label: "SHIRT", href: "/product/shirt" },
        { label: "PANTS", href: "/product/pants" },
      ],
    },
  ];

  const bottomLinks = [
    {
      label: "BOYS",
      href: "/boys",
      sublinks: [
        { label: "SHIRT", href: "/product/shirt" },
        { label: "PANTS", href: "/product/pants" },
        { label: "POLO", href: "/product/polo" },
      ],
    },
    {
      label: "GIRLS",
      href: "/girls",
      sublinks: [
        { label: "FROCK", href: "/product/frock" },
        { label: "LEGGINGS", href: "/product/leggings" },
        { label: "PANTS", href: "/product/pants" },
        { label: "SHIRTS", href: "/product/shirts" },
      ],
    },
    { label: "SHOP", href: "/shop" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 lg:px-8 h-[85px]">
        {/* === Logo === */}
        <Link href="/" className="flex items-center space-x-2 ">
          <Image
            src="/icons/store.png"
            alt="Shishu Ponobohon"
            width={90}
            height={40}
            priority
            className="w-14"
          />
        </Link>

        {/* === Desktop Navigation (Two Rows) === */}
        <div className="hidden lg:flex flex-col items-start justify-center text-sm font-semibold tracking-wide">
          {/* --- Row 1 --- */}
          <div className="flex items-center space-x-4 mb-1">
            {topLinks.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-1 py-1 text-[13px] font-semibold ${
                    item.label === "BUY 2 GET 1 FREE"
                      ? "text-[#EC8923]"
                      : "text-black hover:text-[#EC8923]"
                  }`}
                >
                  {item.label}
                  {item.sublinks && <ChevronDown className="ml-1 h-3 w-3" />}
                </Link>

                {/* Dropdown */}
                {item.sublinks && (
                  <div
                    className={`absolute left-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                      activeDropdown === item.label ? "opacity-100 visible" : ""
                    }`}
                  >
                    <div className="py-2">
                      {item.sublinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#EC8923]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* --- Row 2 --- */}
          <div className="flex items-center space-x-6 text-[13px] font-semibold">
            {bottomLinks.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-black hover:text-[#EC8923]"
                >
                  {item.label}
                  {item.sublinks && <ChevronDown className="ml-1 h-3 w-3" />}
                </Link>

                {/* Dropdown */}
                {item.sublinks && (
                  <div
                    className={`absolute left-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                      activeDropdown === item.label ? "opacity-100 visible" : ""
                    }`}
                  >
                    <div className="py-2">
                      {item.sublinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#EC8923]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* === Right Side === */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <button className="text-gray-500 hover:text-[#EC8923]">
            <Search className="h-5 w-5" />
          </button>

          {/* Account */}
          <Link
            href="/"
            className="flex items-center px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:border-[#EC8923] hover:text-[#EC8923] transition"
          >
            <User className="h-4 w-4 mr-2" />
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] text-gray-600">Hello!</span>
              <span className="text-[13px] font-semibold">My Account</span>
            </span>
          </Link>

          {/* Cart */}
          <div>
            <button
              className="relative text-gray-600 hover:text-[#EC8923] transition-colors duration-200"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold shadow-md">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Dropdown appears when isOpen = true */}
            {useAppSelector((state) => state.cart.isOpen) && <CartDrawer />}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-600"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-3 space-y-2">
          {[...topLinks, ...bottomLinks].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center">
                <Link
                  href={item.href}
                  className={`text-sm font-medium ${
                    item.label === "BUY 2 GET 1 FREE"
                      ? "text-[#EC8923]"
                      : "text-gray-700 hover:text-[#EC8923]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sublinks && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )
                    }
                  />
                )}
              </div>

              {item.sublinks && activeDropdown === item.label && (
                <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 pl-3">
                  {item.sublinks.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block text-sm text-gray-600 hover:text-[#EC8923]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
