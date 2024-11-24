import React from 'react'
import Image from 'next/image'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Share2 
} from 'lucide-react'
import { Button } from "@/components/ui/button"

const AboutPage = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "/images/team/client3.png",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Jane Smith",
      role: "Chief Technology Officer",
      image: "/images/team/client3.png", 
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ]

  return (
    <div className="container mx-auto px-4 py-4 mt-10 bg-gray-50">
       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About Our Company
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">
          We are a passionate team dedicated to delivering innovative solutions 
          that transform businesses and create meaningful impact.
        </p>
      </section>

      {/* Company Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2015, our company began with a simple mission: 
            to help businesses leverage technology for growth and innovation. 
            Over the years, we've worked with diverse clients across multiple industries, 
            delivering cutting-edge solutions that drive real results.
          </p>
          <p className="text-gray-600">
            Our approach combines deep technological expertise with a 
            client-centric philosophy, ensuring we not just meet, but exceed expectations.
          </p>
          <p className="text-gray-600">
            Our approach combines deep technological expertise with a 
            client-centric philosophy, ensuring we not just meet, but exceed expectations.
          </p>
        </div>
        <Image 
          src="/images/company/buildings.jpg"
          alt="Company Story"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* Team Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-12">Our Leadership Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <Image 
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-6"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Linkedin />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Section */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-6">Share Our Story</h2>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="lg">
            <Facebook className="mr-2" /> Share on Facebook
          </Button>
          <Button variant="outline" size="lg">
            <Twitter className="mr-2" /> Share on Twitter
          </Button>
        </div>
      </section>
      </div>
    </div>
  )
}

export default AboutPage