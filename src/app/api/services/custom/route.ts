import { NextResponse } from 'next/server';

interface CustomServiceQuery {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const query: CustomServiceQuery = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType || 'Custom Request',
      description: body.description,
      documents: body.documents || [],
      status: 'pending',
      createdAt: new Date()
    };

    // Here you would save to your database
    
    return NextResponse.json({
      success: true,
      message: 'Custom service query received',
      queryId: query.id
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit custom service query' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Please use POST method to submit custom service queries'
  }, { status: 405 });
} 