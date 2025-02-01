'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Clock, Shield, Award } from 'lucide-react';
import type { AboutPage } from '@/lib/schema/about';

// Icon mapping
const IconMap = {
  Users: Users,
  Clock: Clock,
  Shield: Shield,
  Award: Award,
};

// Default data
const defaultData: AboutPage = {
  hero: {
    title: "About Quickoline",
    description: "Loading...",
  },
  stats: [],
  mission: {
    title: "Our Mission",
    description: "Loading...",
    keyPoints: [],
  },
  vision: {
    title: "Our Vision",
    description: "Loading...",
    imageUrl: "/images/vision.jpg",
  },
  values: [],
  timeline: [],
  cta: {
    title: "Ready to Get Started?",
    description: "Loading...",
  },
};

export default function AboutPage() {
  const [pageData, setPageData] = useState<AboutPage>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/about');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error('Error fetching about page data:', error);
        setPageData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.hero.title}</h1>
        <p className="text-xl text-black/60 max-w-3xl mx-auto">
          {pageData.hero.description}
        </p>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pageData.stats.map((stat, index) => {
            const IconComponent = IconMap[stat.icon as keyof typeof IconMap];
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {IconComponent && <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />}
                  <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-lg font-medium mb-2">{stat.label}</p>
                  <p className="text-black/60">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">{pageData.mission.title}</h2>
            <p className="text-lg text-black/80">{pageData.mission.description}</p>
            {pageData.mission.keyPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-4">
                <CheckCircle2 className="text-green-500 w-6 h-6" />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">{pageData.vision.title}</h2>
            <p className="text-lg text-black/80">{pageData.vision.description}</p>
            <Image
              src={pageData.vision.imageUrl}
              alt="Our Vision"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pageData.values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-black/60">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
        <div className="space-y-8">
          {pageData.timeline.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 items-start">
              <div className="md:w-1/4">
                <div className="text-2xl font-bold text-primary">{item.year}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-black/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">{pageData.cta.title}</h2>
        <p className="text-lg text-black/60 mb-8">{pageData.cta.description}</p>
        <div className="flex justify-center gap-4">
          <Link href="/download-app">
            <Button size="lg">Download App</Button>
          </Link>
          <Link href="/contact-us">
            <Button variant="outline" size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 