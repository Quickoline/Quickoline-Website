'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/our-services' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '/about' },
  ];

  const handleGetStarted = () => {
    window.location.href = '/our-services';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black">
            Quickoline
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-black/60 hover:text-black transition-colors rounded-md hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="ml-2 bg-black text-white hover:bg-black/90"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-black/5 rounded-md"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black/10">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-black/60 hover:text-black transition-colors rounded-md hover:bg-black/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-black/10">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleGetStarted();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
