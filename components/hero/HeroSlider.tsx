"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../layout/Container";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    title: "Winter Collection",
    subtitle: "Stay Warm & Stylish",
    description: "Get ready for winter with our exclusive collection",
    buttonText: "Shop Now",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558769132-cb25c5d1d1c1?w=1200&h=600&fit=crop",
    title: "Tiny by Shishu",
    subtitle: "For Your Little Ones",
    description: "Premium quality clothing for newborns and toddlers",
    buttonText: "Explore",
    bgColor: "bg-pink-50"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581094794329-c6fe63c7a4a5?w=1200&h=600&fit=crop",
    title: "Buy Any Full Pants",
    subtitle: "Get 200 Tk off",
    description: "Special offer on all full pants collection",
    buttonText: "Get Discount",
    bgColor: "bg-orange-50"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1554342880-aa2d43a4dd2e?w=1200&h=600&fit=crop",
    title: "Toys & Books",
    subtitle: "Educational & Fun",
    description: "Discover our range of educational toys and books",
    buttonText: "Discover",
    bgColor: "bg-green-50"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            slide.bgColor
          }`}
          style={{
            transform: `translateX(${100 * (index - currentSlide)}%)`,
          }}
        >
          <div className="h-full w-full flex items-center">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2">
                      {slide.title}
                    </h1>
                    <p className="text-2xl lg:text-3xl text-[#EC8923] font-semibold mb-4">
                      {slide.subtitle}
                    </p>
                    <p className="text-gray-600 text-lg">
                      {slide.description}
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-[#EC8923] hover:bg-[#d97a1f] text-white px-8 py-3 text-lg font-semibold"
                  >
                    {slide.buttonText}
                  </Button>
                </div>

                {/* Image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-md">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-[#EC8923]' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}