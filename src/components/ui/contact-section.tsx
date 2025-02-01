'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: 'Basti, UP, India',
      href: null
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'support@quickoline.com',
      href: 'mailto:support@quickoline.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 8881709638',
      href: 'tel:+918881709638'
    }
  ];

  return (
    <Card className="relative overflow-hidden border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-black/95"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <CardContent className="relative p-8 md:p-12 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="mt-4 text-lg text-white/60">We're here to help with any questions about our services</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Name</label>
                    <Input 
                      type="text" 
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Email</label>
                    <Input 
                      type="email" 
                      placeholder="Your email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60">Message</label>
                  <Textarea 
                    placeholder="Your message"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[120px]"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 transition-colors h-12 text-base"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid gap-6 content-start">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const Content = item.href ? (
                  <a 
                    href={item.href}
                    className="text-lg text-white/60 hover:text-white transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-lg text-white/60">{item.content}</p>
                );

                return (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 flex items-center gap-4"
                  >
                    <div className="rounded-lg bg-white/10 p-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      {Content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}