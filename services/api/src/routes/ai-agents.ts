import { createHash, randomUUID } from 'crypto';

import express from 'express';

const router = express.Router();

function exploreAiConfigured(): boolean {
  return Boolean(process.env.EXPLORE_AI_BASE_URL && process.env.EXPLORE_AI_SERVICE_KEY);
}

function agentsBase(): string {
  return String(process.env.EXPLORE_AI_BASE_URL).replace(/\/$/, '') + '/api/agents';
}

function serviceHeaders(clientId: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Service-Key': String(process.env.EXPLORE_AI_SERVICE_KEY),
    'X-Client-Id': clientId,
  };
}

/** Stable UUID for Explore AI X-Client-Id (never email / display name). */
function resolveClientId(req: express.Request): string {
  const auth = (req as express.Request & { auth?: { id?: string; sub?: string } }).auth;
  const raw = String(auth?.id || auth?.sub || req.header('x-client-id') || '').trim();
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw)) {
    return raw;
  }
  if (raw) {
    const hex = createHash('sha256').update(raw).digest('hex');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
  }
  return randomUUID();
}

/** Lists Explore AI Gallery agents via Commerce BFF. */
router.get('/', async (req, res) => {
  if (!exploreAiConfigured()) {
    return res.status(503).json({ status: 'error', message: 'Explore AI BFF is not configured' });
  }
  const lang = typeof req.query.lang === 'string' ? `?lang=${encodeURIComponent(req.query.lang)}` : '';
  try {
    const response = await fetch(`${agentsBase()}${lang}`, {
      headers: serviceHeaders(resolveClientId(req)),
    });
    const body = await response.json();
    return res.status(response.status).json(body);
  } catch (err) {
    return res.status(502).json({
      status: 'error',
      message: 'Upstream unavailable',
    });
  }
});

/** Invokes one Explore AI agent; optional orderSummary grounding in body. */
router.post('/:type/invoke', async (req, res) => {
  if (!exploreAiConfigured()) {
    return res.status(503).json({ status: 'error', message: 'Explore AI BFF is not configured' });
  }
  const agentType = String(req.params.type || '').trim();
  const userMessage = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!agentType || !userMessage) {
    return res.status(400).json({ status: 'error', message: 'type and message are required' });
  }
  const orderSummary =
    typeof req.body?.orderSummary === 'string' ? req.body.orderSummary.trim() : '';
  const message = orderSummary
    ? `Order context (minimize PII):\n${orderSummary}\n\nCustomer question:\n${userMessage}`
    : userMessage;
  const lang = typeof req.query.lang === 'string' ? `?lang=${encodeURIComponent(req.query.lang)}` : '';
  try {
    const response = await fetch(`${agentsBase()}/${encodeURIComponent(agentType)}/invoke${lang}`, {
      method: 'POST',
      headers: serviceHeaders(resolveClientId(req)),
      body: JSON.stringify({ message }),
    });
    const body = await response.json();
    return res.status(response.status).json(body);
  } catch {
    return res.status(502).json({
      status: 'error',
      message: 'Upstream unavailable',
    });
  }
});

export default router;
