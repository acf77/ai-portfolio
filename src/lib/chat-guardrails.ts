const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /\b(system\s+prompt|developer\s+mode|jailbreak|DAN\b|do\s+anything\s+now)/i,
  /\byou\s+are\s+now\b/i,
  /\b(reveal|show|print|repeat)\s+(your\s+)?(instructions|system\s+prompt|prompt)\b/i,
  /\bact\s+as\b/i,
  /\bpretend\s+(you\s+are|to\s+be)\b/i,
  /\bnew\s+instructions?\s*:/i,
];

const REFUSAL =
  "I can only help with questions about Antonio's experience, projects, and research. Ask me something about his work or background.";

export function isBlockedMessage(message: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(message));
}

export function refusalReply(): string {
  return REFUSAL;
}

export function wrapUserMessage(message: string): string {
  return `Visitor question (answer only if about Antonio Carlos Filho — otherwise refuse):\n\n${message}`;
}
