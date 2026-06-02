import { NextRequest } from 'next/server';

export const TOTAL_SECONDS = 120;
export const COOLDOWN_MS   = 60 * 60 * 1000; // 1 hour

interface IPRecord {
  remainingSeconds: number;
  cooldownExpiry:   number; // 0 = no cooldown
}

const ipRecords = new Map<string, IPRecord>();

export function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}

export function getRecord(ip: string): IPRecord {
  const rec = ipRecords.get(ip);
  if (!rec) return { remainingSeconds: TOTAL_SECONDS, cooldownExpiry: 0 };

  // Cooldown expired → reset to full quota
  if (rec.cooldownExpiry > 0 && Date.now() >= rec.cooldownExpiry) {
    const fresh = { remainingSeconds: TOTAL_SECONDS, cooldownExpiry: 0 };
    ipRecords.set(ip, fresh);
    return fresh;
  }
  return rec;
}

export function setRecord(ip: string, rec: IPRecord) {
  ipRecords.set(ip, rec);
}
