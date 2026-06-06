import { NextRequest, NextResponse } from 'next/server';
import { getCertificatesByUser, addCertificate } from '@/lib/db';

// GET certificates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }
    
    const certificates = getCertificatesByUser(userId);
    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

// POST create certificate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const certificate = {
      id: `cert-${Date.now()}`,
      ...body,
      issuedAt: new Date().toISOString(),
      verifyUrl: `https://edusphere.ai/verify/${Date.now()}`,
    };
    addCertificate(certificate);
    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create certificate' }, { status: 500 });
  }
}
