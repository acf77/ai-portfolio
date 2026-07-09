import type { APIRoute } from 'astro';
import { isBlockedMessage, refusalReply, wrapUserMessage } from '../../lib/chat-guardrails';
import { buildSystemPrompt } from '../../lib/chat-context';

export const prerender = false;

const gatewayUrl = (import.meta.env.AI_GATEWAY_URL ?? 'https://ai.trapiche.cloud').replace(
  /\/$/,
  '',
);
const gatewayKey = import.meta.env.AI_GATEWAY_API_KEY;
const gatewayModel = import.meta.env.AI_GATEWAY_MODEL ?? 'qwen-3.7-max';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type GatewayError = {
  error?: {
    message?: string;
    code?: string;
  };
};

type GatewayResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function userFacingError(status: number, message?: string, code?: string): string {
  if (status === 401) return 'Chat is not configured yet. Missing or invalid gateway credentials.';
  if (status === 402) return 'The portfolio chat is temporarily out of credits.';
  if (status === 429) return 'Too many questions at once. Please wait a few seconds and try again.';
  if (status === 502) return 'The AI gateway is unavailable right now. Try again shortly.';
  if (message) return message;
  if (code === 'insufficient_balance') return 'The portfolio chat is temporarily out of credits.';
  return 'Something went wrong. Please try again.';
}

export const POST: APIRoute = async ({ request }) => {
  if (!gatewayKey) {
    return Response.json(
      { error: 'Chat is not configured. Set AI_GATEWAY_API_KEY in the environment.' },
      { status: 503 },
    );
  }

  let body: { message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return Response.json({ error: 'Message is required.' }, { status: 400 });
  }

  if (message.length > 1000) {
    return Response.json({ error: 'Message is too long (max 1000 characters).' }, { status: 400 });
  }

  if (isBlockedMessage(message)) {
    return Response.json({ reply: refusalReply() });
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: await buildSystemPrompt() },
    { role: 'user', content: wrapUserMessage(message) },
  ];

  let gatewayResponse: Response;
  try {
    gatewayResponse = await fetch(`${gatewayUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${gatewayKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: gatewayModel,
        messages,
        temperature: 0.2,
        max_tokens: 400,
      }),
    });
  } catch {
    return Response.json(
      { error: 'Could not reach the Trapiche AI gateway.' },
      { status: 502 },
    );
  }

  const payload = (await gatewayResponse.json()) as GatewayResponse & GatewayError;

  if (!gatewayResponse.ok) {
    return Response.json(
      {
        error: userFacingError(
          gatewayResponse.status,
          payload.error?.message,
          payload.error?.code,
        ),
      },
      { status: gatewayResponse.status },
    );
  }

  const reply = payload.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return Response.json({ error: 'The gateway returned an empty response.' }, { status: 502 });
  }

  return Response.json({ reply });
};
