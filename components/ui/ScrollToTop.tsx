"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Calculate scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const trackLength = docHeight - winHeight;
    const progress = Math.floor((scrollTop / trackLength) * 100);

    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Progress Circle (Optional) */}
      {isVisible && (
        <div className="absolute -inset-2">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#EC8923"
              strokeWidth="8"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * scrollProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
        </div>
      )}

      <Button
        onClick={scrollToTop}
        className={`
          bg-gray-600 hover:bg-gray-800 text-white 
          cursor-pointer
          rounded-full w-12 h-12 p-0 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 ease-in-out
          relative
          ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }
        `}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />

        {/* Progress text (optional) */}
        {isVisible && scrollProgress > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#EC8923] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            {scrollProgress}
          </span>
        )}
      </Button>
    </div>
  );
}
