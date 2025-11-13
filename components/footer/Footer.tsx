import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{SITE_CONFIG.name}</h3>
            <p className="text-gray-300 text-sm">
              Premium kids clothing and accessories for your little ones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{SITE_CONFIG.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/shishuporibohon"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
          <p>{SITE_CONFIG.name} © 2025 All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
