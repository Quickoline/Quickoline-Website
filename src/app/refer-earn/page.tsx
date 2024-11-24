'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { z } from 'zod'

export default function ReferAndEarnPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hearAbout: '',
    message: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    hearAbout: '',
  })

  // Validation Schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    hearAbout: z.enum(['friend or family', 'online'], {
      required_error: "Please select how you heard about us"
    }),
    message: z.string().optional()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      formSchema.parse(formData)
      // TODO: Implement actual API call
      console.log('Form submitted:', formData)
      alert('Referral submitted successfully!')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = error.flatten().fieldErrors
        setErrors({
          name: errorMap.name?.[0] || '',
          email: errorMap.email?.[0] || '',
          phone: errorMap.phone?.[0] || '',
          hearAbout: errorMap.hearAbout?.[0] || '',
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Refer & Earn
        </h1>

        {/* Refer Image */}
        <div className="mb-12 flex justify-center">
          <Image 
            src="/images/refer/refer-earn.png"
            alt="Refer and Earn"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Refer Your friends, family or anyone & Earn 20 percent commission 
            (10 Rs per service) on our services with Quickoline Referral Program. 
            Join this Referral program & make it succeed as Quickoline is a 
            problem-solving product for millions.
          </p>
          <p className="text-lg text-gray-700 mt-4 font-semibold">
            To Join <span className="text-primary">Quickoline Referral Program</span>, 
            Send us your details by filling the form below
          </p>
        </div>

        {/* Referral Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <Input 
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input 
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Input 
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Select 
              onValueChange={(value: string) => setFormData({...formData, hearAbout: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="How did you hear about us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friend or family">Friend or Family</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            {errors.hearAbout && <p className="text-red-500 text-sm mt-1">{errors.hearAbout}</p>}
          </div>

          <div>
            <Textarea 
              placeholder="Additional Message (Optional)"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Submit Referral
          </Button>
        </form>
      </div>
    </div>
  )
}