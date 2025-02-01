'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Instagram, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { HomePage } from '@/lib/schema/homepage';

// Default data to show while loading or on error
const defaultPageData: HomePage = {
  hero: {
    title: "Your Online Cyber Cafe.",
    subtitle: "Get your online works done quickly without visiting offline centres.",
    tagline: "Online Bolein to Quickoline!",
    cta: {
      text: "Download App",
      link: "/download-app",
    },
    socialLinks: [
      { platform: "facebook", link: "#" },
      { platform: "linkedin", link: "#" },
      { platform: "instagram", link: "#" },
    ],
  },
  services: {
    title: "What We Really Do?",
    subtitle: "Any service 24/7",
    services: [
      "All Academic Forms (Schools,Colleges,universities)",
      "All Entrance examination forms (JEE,NEET,CUET etc.)",
      "All Latest Jobs Forms",
      "Any identity proof (PAN,Aadhar etc.)",
      "Any Kind of legal work via Tehsil or Advocates(Affidavits,certificates,Documents)",
    ],
  },
  process: {
    title: "How It Works",
    subtitle: "Bound to maintain your Privacy",
    steps: [
      "Select your service on our App or Website",
      "Share or Upload your required documents",
      "Pay Refundable Rs.50 to start it",
      "Customer is the reviewer",
      "You will get the final pdf of your availed service",
    ],
  },
  uniqueSellingPoints: {
    title: "What Unique About Us?",
    subtitle: "Why Choose Quickoline?",
    points: [
      "Service Charge 50 percent less than market",
      "Last minute Forms",
      "No need to visit offline centres",
      "Large team capacity",
      "Complete package of services",
      "Refer & Earn",
    ],
    cta: {
      text: "Reviews",
      link: "/reviews",
    },
  },
};

// Add type for service
interface Service {
  title: string;
  description: string;
  icon: string;
}

// Add type for step
interface Step {
  title: string;
  description: string;
}

export default function HomePage() {
  const [pageData, setPageData] = useState<HomePage>(defaultPageData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/homepage');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        // Keep using default data on error
        setPageData(defaultPageData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-xl bg-white border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black [text-wrap:balance] leading-[1.1]">
              {pageData.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
              {pageData.hero.subtitle}
            </p>
            <p className="text-xl md:text-2xl font-medium text-black">
              {pageData.hero.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={pageData.hero.cta.link}>
                <Button size="lg" className="bg-black hover:bg-black/90 text-white transition-colors">
                  <Download className="mr-2 h-4 w-4" />
                  {pageData.hero.cta.text}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black [text-wrap:balance] leading-tight">
          {pageData.services.title}
        </h2>
        <Card className="relative overflow-hidden border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white">
          <CardContent className="p-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-black text-center">
              {pageData.services.subtitle}
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {pageData.services.services.map((service: string, index: number) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 p-4 rounded-lg bg-black/[0.02] hover:bg-black/[0.04] transition-colors border border-black/5 hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Process Section */}
      <section className="mb-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black [text-wrap:balance] leading-tight">
          {pageData.process.title}
        </h2>
        <Card className="relative overflow-hidden border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white">
          <CardContent className="p-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-black text-center">
              {pageData.process.subtitle}
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageData.process.steps.map((step: string, index: number) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 p-4 rounded-lg bg-black/[0.02] hover:bg-black/[0.04] transition-colors border border-black/5 hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="rounded-full bg-black/5 w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Unique Selling Points Section */}
      <section className="mb-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black [text-wrap:balance] leading-tight">
          {pageData.uniqueSellingPoints.title}
        </h2>
        <Card className="relative overflow-hidden border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white">
          <CardContent className="p-8">
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-black text-center">
              {pageData.uniqueSellingPoints.subtitle}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {pageData.uniqueSellingPoints.points.map((point: string, index: number) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 p-4 rounded-lg bg-black/[0.02] hover:bg-black/[0.04] transition-colors border border-black/5 hover:border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="rounded-lg bg-white border border-black/10 p-2 group-hover:border-black/20 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                    <CheckCircle2 className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <p className="text-base text-black/80 leading-relaxed">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
