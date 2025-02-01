import { NextResponse } from 'next/server';

const services = [
  {
    id: '1',
    title: 'Academic Forms',
    description: 'Complete assistance with all types of academic forms including schools, colleges, and universities.',
    category: 'Education',
    timeEstimate: '30-60 minutes',
    price: 'Starts from ₹50',
    features: [
      'School/College Admission Forms',
      'Scholarship Applications',
      'Education Certificates',
      'Result Verification',
      'Migration Certificates'
    ],
    image: 'https://placehold.co/600x400/2563eb/ffffff/png?text=Academic+Forms',
    slug: 'academic-forms'
  },
  {
    id: '2',
    title: 'Entrance Examinations',
    description: 'Expert guidance and form filling services for all major entrance examinations.',
    category: 'Education',
    timeEstimate: '45-90 minutes',
    price: 'Starts from ₹100',
    features: [
      'JEE Application',
      'NEET Registration',
      'CUET Forms',
      'State Entrance Exams',
      'Counselling Registration'
    ],
    image: 'https://placehold.co/600x400/dc2626/ffffff/png?text=Entrance+Exams',
    slug: 'entrance-examinations'
  },
  {
    id: '3',
    title: 'Government Job Applications',
    description: 'Complete assistance with government job applications and related documentation.',
    category: 'Career',
    timeEstimate: '60-120 minutes',
    price: 'Starts from ₹150',
    features: [
      'Central Government Jobs',
      'State Government Jobs',
      'PSU Applications',
      'Defence Recruitment',
      'Railway Recruitment'
    ],
    image: 'https://placehold.co/600x400/16a34a/ffffff/png?text=Government+Jobs',
    slug: 'government-jobs'
  },
  {
    id: '4',
    title: 'Legal Certificates',
    description: 'Assistance in obtaining various legal certificates and documentation.',
    category: 'Legal',
    timeEstimate: '2-3 days',
    price: 'Starts from ₹200',
    features: [
      'Birth Certificates',
      'Death Certificates',
      'Marriage Certificates',
      'Domicile Certificates',
      'Income Certificates',
      'Caste Certificates'
    ],
    image: 'https://placehold.co/600x400/9333ea/ffffff/png?text=Legal+Certificates',
    slug: 'legal-certificates'
  },
  {
    id: '5',
    title: 'Affidavits & Notary',
    description: 'Professional assistance with affidavits and notary services.',
    category: 'Legal',
    timeEstimate: '1-2 days',
    price: 'Starts from ₹300',
    features: [
      'General Affidavits',
      'Name Change Affidavits',
      'Property Affidavits',
      'Marriage Affidavits',
      'Notary Services'
    ],
    image: 'https://placehold.co/600x400/ea580c/ffffff/png?text=Affidavits',
    slug: 'affidavits-notary'
  },
  {
    id: '6',
    title: 'Legal Documentation',
    description: 'Expert assistance in preparing and filing legal documents.',
    category: 'Legal Services',
    timeEstimate: '3-5 days',
    price: 'Starts from ₹500',
    features: [
      'Property Documents',
      'Rental Agreements',
      'Power of Attorney',
      'Legal Notices',
      'Court Document Filing'
    ],
    image: 'https://placehold.co/600x400/0891b2/ffffff/png?text=Legal+Documents',
    slug: 'legal-documentation'
  },
  {
    id: '7',
    title: 'Legal Consultation',
    description: 'Professional legal consultation and advisory services.',
    category: 'Legal Services',
    timeEstimate: '30-60 minutes',
    price: 'Starts from ₹1000',
    features: [
      'Property Law Consultation',
      'Family Law Advice',
      'Consumer Rights',
      'Business Legal Advisory',
      'Document Review'
    ],
    image: 'https://placehold.co/600x400/4f46e5/ffffff/png?text=Legal+Consultation',
    slug: 'legal-consultation'
  },
  {
    id: '8',
    title: 'Firm Registration Services',
    description: 'Complete assistance in registering different types of firms and businesses.',
    category: 'Legal Services',
    timeEstimate: '7-15 days',
    price: 'Starts from ₹2000',
    features: [
      'Proprietorship Registration',
      'Partnership Firm Registration',
      'LLP Registration',
      'Private Limited Company',
      'MSME Registration',
      'GST Registration',
      'Shop Act License'
    ],
    image: 'https://placehold.co/600x400/0d9488/ffffff/png?text=Firm+Registration',
    slug: 'firm-registration'
  },
  {
    id: '9',
    title: 'Business Compliance Services',
    description: 'Ongoing compliance and legal support for businesses.',
    category: 'Legal Services',
    timeEstimate: 'Variable',
    price: 'Starts from ₹1500',
    features: [
      'Annual Compliance Filing',
      'Tax Registration & Returns',
      'License Renewals',
      'Regulatory Compliance',
      'Legal Document Updates',
      'Business Restructuring'
    ],
    image: 'https://placehold.co/600x400/be185d/ffffff/png?text=Business+Compliance',
    slug: 'business-compliance'
  },
  {
    id: '10',
    title: 'Custom Service Request',
    description: 'Have a unique requirement? Submit your custom service request and our team will assist you.',
    category: 'Custom Services',
    timeEstimate: 'Based on requirement',
    price: 'Custom quote',
    features: [
      'Personalized Service Solutions',
      'Priority Handling',
      'Dedicated Support Team',
      'Flexible Requirements',
      'Custom Documentation',
      'Specialized Assistance'
    ],
    image: 'https://placehold.co/600x400/6366f1/ffffff/png?text=Custom+Services',
    slug: 'custom-service-request'
  },
  {
    id: '11',
    title: 'Bulk Applications',
    description: 'Special handling for bulk applications and institutional requirements.',
    category: 'Custom Services',
    timeEstimate: 'Flexible timeline',
    price: 'Volume-based pricing',
    features: [
      'Bulk Form Processing',
      'Institutional Partnerships',
      'Volume Discounts',
      'Dedicated Account Manager',
      'Customized Reporting',
      'Priority Support'
    ],
    image: 'https://placehold.co/600x400/8b5cf6/ffffff/png?text=Bulk+Services',
    slug: 'bulk-applications'
  }
];

interface ServiceQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  documents?: string[];
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}

export async function GET() {
  try {
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const query: ServiceQuery = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      description: body.description,
      documents: body.documents || [],
      status: 'pending',
      createdAt: new Date()
    };

    return NextResponse.json({
      success: true,
      message: 'Custom service query received',
      queryId: query.id
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit service query' },
      { status: 500 }
    );
  }
} 