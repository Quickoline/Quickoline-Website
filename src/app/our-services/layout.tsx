import React from 'react'
import Image from 'next/image'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Download, 
  Send 
} from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const servicesList = [
    "Custom Software Development",
    "Cloud Solutions & Migration",
    "Cybersecurity Consulting",
    "Digital Transformation Strategy",
    "AI & Machine Learning Integration",
    "Enterprise Mobile Application Development",
    "UX/UI Design Services",
    "IT Infrastructure Support"
  ]

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50 mt-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Our Services
        </h1>

        {/* Hero Image */}
        <div className="mb-12 overflow-hidden rounded-xl flex justify-center items-center">
          <Image 
            src="/images/services/services.jpg"
            alt="Our Services Overview"
            width={600}
            height={500}
            className="object-cover rounded-xl hover:scale-105 transition-transform"
          />
        </div>

        {/* Services List */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg"
            >
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-700">{service}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Send className="mr-2" /> Apply Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
          >
            <Download className="mr-2" /> Download Quickline App
          </Button>
        </div>

        {/* Social Media & Share Buttons */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Facebook />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram />
            </Button>
          </div>
          <p className="text-gray-500 text-sm">Share our services with your network</p>
        </div>
      </div>
    </div>
  )
}