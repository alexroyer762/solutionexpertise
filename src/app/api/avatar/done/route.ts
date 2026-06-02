import { NextRequest } from 'next/server';
import { getClientIP, getRecord, setRecord, TOTAL_SECONDS, COOLDOWN_MS } from '../state';

export async function POST(req: NextRequest) {
  const ip  = getClientIP(req);
  const rec = getRecord(ip);

  const { usedSeconds } = await req.json() as { usedSeconds: number };
  const deducted = Math.max(0, Math.min(usedSeconds, rec.remainingSeconds));
  const newRemaining = rec.remainingSeconds - deducted;

  if (newRemaining <= 0) {
    // Quota exhausted → 1-hour cooldown, then full reset
    setRecord(ip, {
      remainingSeconds: TOTAL_SECONDS,
      cooldownExpiry:   Date.now() + COOLDOWN_MS,
    });
  } else {
    setRecord(ip, { ...rec, remainingSeconds: newRemaining });
  }

  return Response.json({ remainingSeconds: Math.max(0, newRemaining) });
}
