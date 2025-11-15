import { FacebookIcon, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white text-[#333]">
      {/* TOP SECTION */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16  grid grid-cols-1 md:grid-cols-3 gap-12 ">
          {/* Opening Hours */}
          <div className="text-gray-500">
            <h3 className="text-xl font-semibold text-orange-500 mb-6">
              Opening Hours
            </h3>

            <div className="space-y-6 text-sm leading-relaxed ">
              <div>
                <p>Office – UTTARA</p>
                <p>Weekly 7 Days</p>
                <p>9 AM – 6 PM</p>
              </div>

              <div>
                <p>Showroom – Panthapath</p>
                <p>Weekly 6 Days (Except – Tuesday)</p>
                <p>11 AM – 8 PM</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-gray-500">
            <h3 className="text-xl font-semibold text-orange-500 mb-6">
              Navigation
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <Link href="/" className="hover:text-orange-500 block">
                  Home
                </Link>
                <Link href="/about" className="hover:text-orange-500 block">
                  About Us
                </Link>
                <Link href="/terms" className="hover:text-orange-500 block">
                  Terms & Condition
                </Link>
                <Link href="/privacy" className="hover:text-orange-500 block">
                  Privacy Policy
                </Link>
              </div>

              <div className="space-y-3">
                <Link href="/refund" className="hover:text-orange-500 block">
                  Refund Policy
                </Link>
                <Link href="/return" className="hover:text-orange-500 block">
                  Return & Exchange Policy
                </Link>
                <Link href="/blog" className="hover:text-orange-500 block">
                  Blog
                </Link>
                <Link href="/contact" className="hover:text-orange-500 block">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-gray-500">
            <h3 className="text-xl font-semibold text-orange-500 mb-6">
              Social Media
            </h3>

            <div className="flex items-center space-x-6 text-2xl">
              <Link
                href="https://facebook.com"
                className="hover:text-orange-500"
              >
                <FacebookIcon className="lab la-facebook-f"></FacebookIcon>
              </Link>

              <Link
                href="https://instagram.com"
                className="hover:text-orange-500"
              >
                <Instagram className="lab la-instagram"></Instagram>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="bg-[#fafafa] py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 text-center gap-8">
          {/* Find Us */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Find Us
            </h3>
            <p className="text-sm leading-relaxed">
              15 Sonargaon Janapath <br />
              Sector 12, Uttara, Dhaka.
            </p>
          </div>

          {/* Showroom */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Visit Our Showroom
            </h3>
            <p className="text-sm leading-relaxed">
              Shop No. 31-33, Level 3, Block - D <br />
              Bashundhara City Shopping Mall <br />
              Panthapath, Dhaka
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Contact Us
            </h3>
            <p className="text-sm leading-relaxed">
              +880 1782-711180 <br />
              +880 1329-731895 <br />
              admin@shishu.store
            </p>
          </div>
        </div>
      </div>

      {/* PAYMENT ICONS */}
      <div className="py-6 flex justify-center flex-wrap gap-2">
        {[
          "/icons/visa.png",
          "/icons/mastercard.png",
          "/icons/paypal.png",
          "/icons/amex.png",
          "/icons/bkash.png",
          "/icons/maestro.png",
          "/icons/diners.png",
          "/icons/jcb.png",
          "/icons/discover.png",
          "/icons/rocket.png",
          "/icons/paypal.png",
          "/icons/visa.png",
          "/icons/mastercard.png",
          "/icons/paypal.png",
          "/icons/amex.png",
          "/icons/bkash.png",
          "/icons/maestro.png",
          "/icons/diners.png",
          "/icons/jcb.png",
          "/icons/discover.png",
          "/icons/rocket.png",
          "/icons/paypal.png",
        ].map((src, i) => (
          <div key={i} className="h-6 w-10 relative">
            <Image
              src={src}
              alt={`Payment ${i}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* COPYRIGHT */}
      <div className="text-center py-6 text-sm text-gray-500">
        Shishu Poribohon © 2025. All Rights Reserved.
      </div>
    </footer>
  );
}
