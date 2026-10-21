import Runway from '@runwayml/sdk';
import type { RealtimeSessionRetrieveResponse } from '@runwayml/sdk/resources/realtime-sessions';
import { NextRequest } from 'next/server';
import { getClientIP, getRecord } from '../state';

export async function POST(req: NextRequest) {
  // Le client est créé ICI (pas en haut du fichier) : si la clé API manque,
  // ça renvoie une erreur claire au lieu de faire planter le build/la
  // fonction serverless (Next.js exécute ce module pendant "Collecting page
  // data" au build, avant même qu'une requête n'arrive).
  if (!process.env.RUNWAYML_API_SECRET) {
    console.error('[Noah] RUNWAYML_API_SECRET manquante côté serveur');
    return Response.json({ error: 'RUNWAYML_API_SECRET manquante côté serveur' }, { status: 500 });
  }
  const client = new Runway({ apiKey: process.env.RUNWAYML_API_SECRET });

  const ip  = getClientIP(req);
  const rec = getRecord(ip);
  const now = Date.now();

  // IP is on cooldown
  if (rec.cooldownExpiry > 0 && now < rec.cooldownExpiry) {
    const secondsLeft = Math.ceil((rec.cooldownExpiry - now) / 1000);
    return Response.json({ error: 'cooldown', secondsLeft }, { status: 429 });
  }

  // No quota left (shouldn't normally reach here, but guard anyway)
  if (rec.remainingSeconds <= 0) {
    return Response.json({ error: 'cooldown', secondsLeft: 0 }, { status: 429 });
  }

  try {
    const { avatarId } = await req.json();

    const { id: sessionId } = await client.realtimeSessions.create({
      model: 'gwm1_avatars',
      avatar: { type: 'custom', avatarId },
    });

    const session = await pollUntilReady(client, sessionId);

    return Response.json({
      sessionId,
      sessionKey:     session.sessionKey,
      allowedSeconds: rec.remainingSeconds, // tell client its actual quota
    });
  } catch (err: any) {
    console.error('[Noah] Error:', err?.message ?? err);
    return Response.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}

async function pollUntilReady(client: Runway, sessionId: string): Promise<RealtimeSessionRetrieveResponse.Ready> {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    const session = await client.realtimeSessions.retrieve(sessionId);

    if (session.status === 'READY') return session;

    if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(session.status)) {
      throw new Error(`Session ended with status: ${session.status}`);
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error('Session creation timed out after 30s');
}
