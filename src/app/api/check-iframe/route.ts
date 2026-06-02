import { NextResponse } from 'next/server';

const PORTAL_BASE_URL = 'https://solutionexpertise.zohocreatorportal.ca';

export async function GET() {
  try {
    const response = await fetch(PORTAL_BASE_URL, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    const xfo = response.headers.get('X-Frame-Options')?.toUpperCase();
    const csp = response.headers.get('Content-Security-Policy')?.toLowerCase() ?? '';

    const canEmbed =
      xfo !== 'DENY' &&
      xfo !== 'SAMEORIGIN' &&
      !csp.includes("frame-ancestors 'none'") &&
      !csp.includes("frame-ancestors 'self'");

    return NextResponse.json({ canEmbed });
  } catch {
    return NextResponse.json({ canEmbed: false });
  }
}
