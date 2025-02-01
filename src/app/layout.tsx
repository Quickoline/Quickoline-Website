import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/navbar';
import ContactSection from '@/components/ui/contact-section';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quickoline - Your Online Cyber Cafe',
  description: 'Get your online works done quickly without visiting offline centres.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 mt-16">
          {children}
        </main>
        <footer className="mt-16 px-4">
          <ContactSection />
          <div className="container mx-auto py-6 mt-8 text-center text-sm text-black/60">
            © {new Date().getFullYear()} Quickoline. All rights reserved.
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
