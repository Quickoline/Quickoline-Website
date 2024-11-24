import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      title: "Digital Transformation",
      description: "Revolutionize your business with cutting-edge digital solutions that enhance efficiency and innovation.",
      icon: "/images/services/DT.jpg"
    },
    {
      title: "Cloud Computing",
      description: "Scalable and secure cloud solutions that empower your business with flexibility and advanced technological capabilities.",
      icon: "/images/services/CC.jpg"
    }
  ]

  const clients = [
    {
      name: "Tech Innovations Inc",
      logo: "/images/clients/client1.jpg",
      description: "Leading technology solutions provider"
    },
    {
      name: "Global Enterprises",
      logo: "/images/clients/client1.jpg", 
      description: "International business consulting firm"
    },
    {
      name: "Startup Accelerator",
      logo: "/images/clients/client1.jpg",
      description: "Innovative startup ecosystem"
    }, {
      name: "Tech Innovations Inc",
      logo: "/images/clients/client1.jpg",
      description: "Leading technology solutions provider"
    },
    {
      name: "Global Enterprises",
      logo: "/images/clients/client1.jpg", 
      description: "International business consulting firm"
    },
    {
      name: "Startup Accelerator",
      logo: "/images/clients/client1.jpg",
      description: "Innovative startup ecosystem"
    }, {
      name: "Tech Innovations Inc",
      logo: "/images/clients/client1.jpg",
      description: "Leading technology solutions provider"
    },
    {
      name: "Global Enterprises",
      logo: "/images/clients/client1.jpg", 
      description: "International business consulting firm"
    },
    {
      name: "Startup Accelerator",
      logo: "/images/clients/client1.jpg",
      description: "Innovative startup ecosystem"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Services Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={50} 
                    height={50} 
                  />
                  <CardTitle>{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted By Industry Leaders
        </h2>
        <div className="flex overflow-x-scroll space-x-6 pb-6 hide-scrollbar">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="relative min-w-[250px] h-[300px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image 
                src={client.logo} 
                alt={client.name}
                fill
                className="object-cover brightness-50 transition-all duration-300 hover:brightness-75"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">{client.name}</h3>
                <p className="text-sm">{client.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((review, index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600">
  &quot;Exceptional service and outstanding results. They transformed our business strategy 
  and helped us achieve remarkable growth.&quot;
</p>

              <div className="flex items-center space-x-4">
                <Image 
                  src="/images/clients/client2.png" 
                  alt="Client Avatar" 
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">CEO, Company Name</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ServicesSection