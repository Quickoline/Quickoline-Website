import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"

const HeroSection = () => {
  const sliderImages = [
    '/images/herosection/image-8.png',
    '/images/herosection/online-legal-services.png'
  ]

  return (
    <div className="relative w-full min-h-screen flex items-center bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Section - Responsive Typography */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Transform Your Business with Innovative Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
              Empowering businesses through cutting-edge technology and strategic insights. 
              We deliver transformative solutions that drive growth and efficiency.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full md:w-auto border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image Slider Section - Responsive Layout */}
          <div className="relative w-full max-w-2xl mx-auto md:max-w-full">
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {sliderImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image 
                        src={img} 
                        alt={`Slider image ${index + 1}`}
                        width={600} 
                        height={400}
                        className="rounded-xl shadow-lg object-cover w-full h-[250px] sm:h-[350px] md:h-[400px]"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex left-2" />
              <CarouselNext className="hidden md:flex right-2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection