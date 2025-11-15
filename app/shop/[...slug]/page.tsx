/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/lib/cartSlice";
import Image from "next/image";

// Mock product data
const PRODUCTS_DATA: { [key: string]: any } = {
  // Winter -> Loungewear -> Snowblossom Loungewear
  "loungewear/snowblossom-loungewear": {
    id: "w-lounge-1",
    name: "Snowblossom Loungewear",
    price: 34.99,
    originalPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1551488831-6745a0aa60c6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
    ],
    category: "loungewear",
    slug: "snowblossom-loungewear",
    inStock: true,
    description:
      "Premium quality snowblossom loungewear set for ultimate comfort during winter days. Made from soft, breathable fabric that keeps you warm and cozy.",
    features: [
      "100% Premium Cotton",
      "Soft and Breathable",
      "Machine Washable",
      "Available in Multiple Sizes",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Pink", value: "bg-pink-400" },
      { name: "Blue", value: "bg-blue-400" },
      { name: "White", value: "bg-gray-200" },
    ],
    rating: 4.5,
    reviews: 128,
    sku: "SHW-LG-001",
  },

  // Toys & Books -> Toys -> Play Craft Crossword Game
  "toys/play-craft-crossword-premiere-game-ages-5": {
    id: "tb-toy-1",
    name: "Play Craft Crossword Premiere Game (Ages 5+)",
    price: 24.99,
    originalPrice: 29.99,
    images: [
      "https://images.unsplash.com/photo-1594787319143-60a132a8e0f0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop",
    ],
    category: "toys",
    slug: "play-craft-crossword-premiere-game-ages-5",
    inStock: true,
    description:
      "Engaging crossword puzzle game designed for children ages 5 and above. Helps develop vocabulary, spelling skills, and cognitive abilities while having fun.",
    features: [
      "Educational & Fun",
      "Develops Vocabulary",
      "Age 5+ Appropriate",
      "Multiple Difficulty Levels",
    ],
    sizes: ["Standard"],
    colors: [
      {
        name: "Multi-color",
        value: "bg-gradient-to-r from-yellow-400 to-red-500",
      },
    ],
    rating: 4.8,
    reviews: 89,
    sku: "SHW-TY-001",
  },

  // Ethnic Wear -> Lehenga -> Traditional Silk Lehenga
  "lehenga/traditional-silk-lehenga": {
    id: "e-lehenga-1",
    name: "Traditional Silk Lehenga",
    price: 89.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=600&h=600&fit=crop",
    ],
    category: "lehenga",
    slug: "traditional-silk-lehenga",
    inStock: true,
    description:
      "Exquisite traditional silk lehenga with intricate embroidery and premium craftsmanship. Perfect for special occasions and celebrations.",
    features: [
      "Pure Silk Fabric",
      "Hand Embroidery",
      "Premium Quality",
      "Custom Sizing Available",
    ],
    sizes: ["S", "M", "L", "XL", "Custom"],
    colors: [
      { name: "Red", value: "bg-red-600" },
      { name: "Blue", value: "bg-blue-600" },
      { name: "Green", value: "bg-green-600" },
    ],
    rating: 4.9,
    reviews: 56,
    sku: "SHW-EL-001",
  },

  // Boys -> Polo -> Cotton Polo Shirt
  "polo/boys-cotton-polo": {
    id: "b-polo-1",
    name: "Boys Cotton Polo Shirt",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=600&h=600&fit=crop",
    ],
    category: "polo",
    slug: "boys-cotton-polo",
    inStock: true,
    description:
      "Comfortable and stylish cotton polo shirt for boys. Perfect for casual wear, school, and outdoor activities.",
    features: [
      "100% Cotton",
      "Machine Washable",
      "Comfortable Fit",
      "Multiple Colors Available",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy", value: "bg-blue-800" },
      { name: "White", value: "bg-gray-100" },
      { name: "Red", value: "bg-red-500" },
    ],
    rating: 4.3,
    reviews: 203,
    sku: "SHW-BP-001",
  },
};

// Related products data based on categories
const RELATED_PRODUCTS: { [key: string]: any[] } = {
  loungewear: [
    {
      id: "w-lounge-2",
      name: "Winter Comfort Loungewear Set",
      price: 29.99,
      originalPrice: 34.99,
      image:
        "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
      category: "loungewear",
      slug: "winter-comfort-loungewear-set",
      inStock: true,
      description: "Cozy winter loungewear set for ultimate comfort",
    },
    {
      id: "w-lounge-3",
      name: "Premium Fleece Pajama Set",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb9294c6?w=400&h=400&fit=crop",
      category: "loungewear",
      slug: "premium-fleece-pajama-set",
      inStock: true,
      description: "Soft fleece pajama set for cold nights",
    },
  ],
  toys: [
    {
      id: "tb-toy-2",
      name: "Educational Building Blocks Set",
      price: 32.99,
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
      category: "toys",
      slug: "educational-building-blocks-set",
      inStock: true,
      description: "Colorful building blocks for creative play",
    },
    {
      id: "tb-toy-3",
      name: "Kids Puzzle Game Collection",
      price: 27.99,
      originalPrice: 32.99,
      image:
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=400&fit=crop",
      category: "toys",
      slug: "kids-puzzle-game-collection",
      inStock: true,
      description: "Fun puzzle games for brain development",
    },
  ],
  lehenga: [
    {
      id: "e-lehenga-2",
      name: "Designer Party Lehenga",
      price: 79.99,
      originalPrice: 89.99,
      image:
        "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
      category: "lehenga",
      slug: "designer-party-lehenga",
      inStock: true,
      description: "Beautiful designer lehenga for special occasions",
    },
    {
      id: "e-lehenga-3",
      name: "Embroidered Silk Lehenga",
      price: 95.99,
      image:
        "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=400&h=400&fit=crop",
      category: "lehenga",
      slug: "embroidered-silk-lehenga",
      inStock: true,
      description: "Exquisite embroidered silk lehenga",
    },
  ],
  polo: [
    {
      id: "b-polo-2",
      name: "Boys Striped Polo Shirt",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
      category: "polo",
      slug: "boys-striped-polo-shirt",
      inStock: true,
      description: "Comfortable striped polo for boys",
    },
    {
      id: "b-polo-3",
      name: "Kids Sports Polo",
      price: 24.99,
      originalPrice: 29.99,
      image:
        "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
      category: "polo",
      slug: "kids-sports-polo",
      inStock: true,
      description: "Durable sports polo for active kids",
    },
  ],
};

export default function SingleProductPage() {
  const params = useParams();
  const slug = params.slug as string[];
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductData = () => {
      setLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        const productSlug = slug.join("/");
        const productData = PRODUCTS_DATA[productSlug];
        setProduct(productData);

        // Set default selections
        if (productData) {
          setSelectedSize(productData.sizes[0]);
          setSelectedColor(productData.colors[0]?.name || "");
        }

        setLoading(false);
      }, 300);
    };

    fetchProductData();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      category: product.category,
      size: selectedSize,
      color: selectedColor,
    };

    // Add to cart with quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(cartItem));
    }

    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Here you would typically redirect to checkout
    // For now, we'll just show a message
    alert("Proceeding to checkout with your selected items!");
  };

  // Get related products based on current product category
  const relatedProducts = product
    ? RELATED_PRODUCTS[product.category] || []
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC8923] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Product not found.</p>
            <Button className="mt-4 bg-[#EC8923] hover:bg-[#d97a1f] text-white">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-8 px-6 md:px-40">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto no-scrollbar">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border transition-all
          ${
            selectedImage === index
              ? "border-[#EC8923] scale-105"
              : "border-gray-300 hover:border-[#EC8923]"
          }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-3">
                {product.name}
              </h2>
              <h2 className="text-3xl font-bold text-gray-600">
                {product.originalPrice} - {product.price}
              </h2>
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Key Features:
              </h3>
              <ul className="space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-[#EC8923] rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-gray-900 mb-3">Size:</h3>

                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full md:w-60 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#EC8923] focus:border-[#EC8923] outline-none transition"
                >
                  <option value="" disabled>
                    Select a size
                  </option>

                  {product.sizes.map((size: string) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 border-y py-4 border-gray-200">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                <Button
                  className="flex-1 hover:bg-[#d97a1f] text-white py-3 text-lg"
                  onClick={handleAddToCart}
                >
                  {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
                </Button>
              </div>
              {/* Success Message */}
              {addedToCart && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-green-800 text-sm">
                    ✓ {quantity} item{quantity > 1 ? "s" : ""} added to cart!
                    <Link href="/cart" className="font-semibold underline ml-1">
                      View Cart
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="pt-8 mb-16">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("information")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "information"
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description} This premium product is carefully
                  crafted with attention to detail and quality. Perfect for
                  everyday use or special occasions, it combines style with
                  functionality to meet your needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Care Instructions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Machine wash cold with like colors</li>
                      <li>• Tumble dry low</li>
                      <li>• Do not bleach</li>
                      <li>• Iron on low heat if needed</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Shipping Information</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Free shipping on orders over $50</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery available</li>
                      <li>• International shipping options</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "information" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <dl className="space-y-2">
                      <div className="flex">
                        <dt className="text-gray-600 w-32">Category:</dt>
                        <dd className="font-medium">{product.category}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 w-32">SKU:</dt>
                        <dd className="font-medium">{product.sku}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 w-32">Availability:</dt>
                        <dd className="font-medium text-green-600">In Stock</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Specifications</h4>
                    <ul className="space-y-2 text-gray-600">
                      {product.features.map(
                        (feature: string, index: number) => (
                          <li key={index}>• {feature}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold">
                      {product.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Based on {product.reviews} customer reviews
                  </p>
                  <Button className="bg-[#EC8923] hover:bg-[#d97a1f] text-white">
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
