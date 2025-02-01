'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, Users, FileText, Home } from 'lucide-react';
import ContactSection from '@/components/ui/contact-section';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin/blogs', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md shadow-md border border-black/10"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-0 z-40 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-200 ease-in-out
          w-64 bg-white border-r border-black/10 p-4
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-bold flex items-center gap-2">
              <Home className="h-5 w-5" />
              Quickoline
            </Link>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm
                    ${isActive 
                      ? 'bg-black text-white' 
                      : 'text-black/60 hover:bg-black/5 hover:text-black'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Button 
              asChild
              variant="outline" 
              className="w-full border-black/10 hover:bg-black/5"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
        <footer className="mt-8 px-4">
          <ContactSection />
          <div className="container mx-auto py-6 mt-8 text-center text-sm text-black/60">
            © {new Date().getFullYear()} Quickoline Admin. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}