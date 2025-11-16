"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleCart } from "@/lib/cartSlice";
import { logout } from "@/lib/authSlice";
import Image from "next/image";
import { AuthModal } from "@/components/auth/AuthModal";
import { CartDrawer } from "../cart/CartDrawer";

// ----- types -----
type NavLink = {
  label: string;
  href: string;
  sublinks?: { label: string; href: string }[];
  highlight?: boolean;
};

// ============= Navigation Data =============
const topLinks: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "BUY 2 GET 1 FREE", href: "/offer", highlight: true },
  {
    label: "WINTER",
    href: "/product/winter",
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
    href: "/product/tiny",
    sublinks: [
      { label: "GIFT BOX", href: "/product/gift-box" },
      { label: "NIMA SET", href: "/product/nima-set" },
      { label: "QUILT", href: "/product/quilt" },
    ],
  },
  {
    label: "TOYS & BOOKS",
    href: "/product/toys-books",
    sublinks: [
      { label: "TOYS", href: "/product/toys" },
      { label: "ACCESSORIES", href: "/product/accessories" },
      { label: "HANDMADE DOLLS", href: "/product/handmade-dolls" },
      { label: "BOOKS", href: "/product/books" },
      { label: "GAMES", href: "/product/games" },
    ],
  },
];

const bottomLinks: NavLink[] = [
  {
    label: "BOYS",
    href: "/product/boys",
    sublinks: [
      { label: "SHIRT", href: "/product/shirt" },
      { label: "PANTS", href: "/product/pants" },
      { label: "POLO", href: "/product/polo" },
    ],
  },
  {
    label: "GIRLS",
    href: "/product/girls",
    sublinks: [
      { label: "FROCK", href: "/product/frock" },
      { label: "LEGGINGS", href: "/product/leggings" },
      { label: "PANTS", href: "/product/pants" },
      { label: "SHIRTS", href: "/product/shirts" },
    ],
  },
  { label: "SHOP", href: "/shop" },
];

// ============= Component =============
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => dispatch(logout());
  const allLinks = [...topLinks, ...bottomLinks];

  return (
    <>
      <section
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          shadow ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 lg:px-8 h-[85px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/icons/store.png"
              alt="Shishu Poribohon"
              width={90}
              height={40}
              className="w-14"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-col text-sm font-semibold">
            {[topLinks, bottomLinks].map((group, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-6 ${
                  idx === 0 ? "mb-1" : ""
                }`}
              >
                {group.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`px-1 py-1 flex items-center transition ${
                        item.highlight
                          ? "text-[#EC8923]"
                          : "text-black hover:text-[#EC8923]"
                      }`}
                    >
                      {item.label}
                      {item.sublinks && (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {item.sublinks && (
                      <div
                        className={`absolute left-0 mt-2 w-56 bg-white  shadow-lg opacity-0 invisible translate-y-2
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                        transition-all duration-200 z-50`}
                      >
                        {item.sublinks.map((sub) => (
                          <Link
                            href={sub.href}
                            key={sub.label}
                            className="block px-4 py-2 text-sm text-gray-500 hover:text-[#EC8923] hover:bg-gray-50"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-500 hover:text-[#EC8923]">
              <Search className="h-5 w-5" />
            </button>

            {isAuthenticated ? (
              <>
                <div className=" border px-4 py-2 rounded-full text-sm">
                  <Link href={"/dashboard"} className="flex">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-[13px] font-semibold">
                      {user?.firstName}
                    </span>
                  </Link>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:text-[#EC8923]"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hover:text-[#EC8923]"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="mr-2 h-4 w-4" /> My Account
              </Button>
            )}

            {/* Cart */}
            {/* Cart */}
            <div>
              <button
                className="relative text-gray-600 hover:text-[#EC8923]"
                onClick={() => dispatch(toggleCart())}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full px-[5px] py-[1px]">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Render the CartDrawer when open */}
              {useAppSelector((state) => state.cart.isOpen) && <CartDrawer />}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-5">
            {allLinks.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between py-2">
                  <Link
                    href={item.href}
                    className="text-sm font-medium hover:text-[#EC8923]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.sublinks && (
                    <ChevronDown
                      className={`h-4 w-4 transition ${
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
                  <div className="ml-4 border-l pl-3 space-y-1">
                    {item.sublinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-gray-600 py-1"
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
      </section>

      {/* Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
