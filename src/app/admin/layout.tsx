'use client';

import { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hamburger Button - Positioned within the content area */}
      <div className="relative top-10">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-10 left-4 z-50 p-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Content Area*/}
        <div className="container mx-auto px-10 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}