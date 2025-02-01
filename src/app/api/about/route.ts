import { NextResponse } from 'next/server';

export async function GET() {
  const aboutData = {
    hero: {
      title: "About Quickoline",
      description: "Your trusted online cyber cafe partner, making digital services accessible and convenient. We bridge the gap between traditional cyber cafes and the digital age.",
    },
    stats: [
      {
        icon: "Users",
        label: "Active Users",
        value: "10,000+",
        description: "Trusted by thousands of users"
      },
      {
        icon: "Clock",
        label: "Response Time",
        value: "< 30 mins",
        description: "Quick service delivery"
      },
      {
        icon: "Shield",
        label: "Data Security",
        value: "100%",
        description: "Your data is safe with us"
      },
      {
        icon: "Award",
        label: "Success Rate",
        value: "99%",
        description: "Satisfied customers"
      }
    ],
    mission: {
      title: "Our Mission",
      description: "To revolutionize the way people access digital services by providing a seamless, secure, and efficient online platform that makes cyber cafe services accessible to everyone, anywhere, anytime.",
      keyPoints: [
        "24/7 Service Availability",
        "Secure Document Handling",
        "Expert Support Team"
      ]
    },
    vision: {
      title: "Our Vision",
      description: "To be the leading digital service provider, recognized for our innovation, reliability, and commitment to making digital services accessible to all. We envision a future where everyone can access digital services effortlessly.",
      imageUrl: "/images/vision.jpg"
    },
    values: [
      {
        title: "Trust & Reliability",
        description: "We build lasting relationships through transparent and honest service delivery."
      },
      {
        title: "Innovation",
        description: "Constantly improving our services to meet evolving digital needs."
      },
      {
        title: "Customer First",
        description: "Your success and satisfaction are our top priorities."
      },
      {
        title: "Data Privacy",
        description: "Strict adherence to data protection and privacy standards."
      }
    ],
    timeline: [
      {
        year: "2021",
        title: "Foundation",
        description: "Quickoline was established with a vision to digitize cyber cafe services."
      },
      {
        year: "2022",
        title: "Expansion",
        description: "Expanded our services to multiple cities and launched mobile app."
      },
      {
        year: "2023",
        title: "Innovation",
        description: "Introduced AI-powered form filling and document verification."
      },
      {
        year: "2024",
        title: "Growth",
        description: "Serving 10,000+ customers with 99% satisfaction rate."
      }
    ],
    cta: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers who trust Quickoline for their digital needs."
    }
  };

  return NextResponse.json(aboutData);
} 