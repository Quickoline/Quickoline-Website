'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Clock, IndianRupee, CheckCircle, X } from 'lucide-react';
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  timeEstimate: string;
  price: string;
  features: string[];
  image: string;
  slug: string;
}

export default function OurServices() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = ['all', ...new Set(services.map(service => service.category))];
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/services/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      toast.success('Request submitted successfully!');
      setShowCustomForm(false);
      setFormData({ name: '', email: '', phone: '', serviceType: '', description: '' });
      router.push('/thank-you');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-black/60 max-w-3xl mx-auto">
          Discover our comprehensive range of digital services designed to make your life easier.
        </p>
      </section>

      {/* Categories Filter */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <Card 
            key={service.id}
            className="h-full hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              if (service.category === 'Custom Services') {
                setShowCustomForm(true);
                setFormData(prev => ({ ...prev, serviceType: service.title }));
              } else {
                router.push(`/services/${service.slug}`);
              }
            }}
          >
            <div className="relative h-48 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover rounded-t-lg"
                priority
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <Badge variant="secondary">{service.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{service.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IndianRupee className="h-4 w-4" />
                  <span>{service.price}</span>
                </div>
                <div className="space-y-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {service.category === 'Custom Services' ? 'Request Service' : 'Learn More'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* Custom Form Modal */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                setShowCustomForm(false);
                setFormData({ name: '', email: '', phone: '', serviceType: '', description: '' });
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardHeader>
              <CardTitle>{formData.serviceType || 'Custom Service Request'}</CardTitle>
              <CardDescription>
                Tell us about your specific requirements and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">Full Name</label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone">Phone Number</label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    placeholder="Please describe your requirements in detail"
                    rows={4}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCustomForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}