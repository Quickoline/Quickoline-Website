import { NextResponse } from 'next/server';

export async function GET() {
  const homepageData = {
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

  return NextResponse.json(homepageData);
} 