---
title: Wisio — AI writing for researchers
date: '2026.01'
excerpt: Building a source-grounded writing editor for scientists who draft in English — TipTap, streaming-ready AI feedback, and one-click PubMed/Crossref citations.
role: Founder & lead engineer
tags: ['REACT', 'NEXT.JS', 'TIPTAP', 'AI STREAMING', 'OPENAI']
liveUrl: https://wisio.app
video: /work/wisio-demo.webm
---

## The problem

Researchers writing in English need feedback that improves their draft — not confident-sounding advice backed by papers that do not exist. I learned this the hard way during my PhD on heart rate variability: [ChatGPT cited plausible HRV studies with real-looking authors and journal names, and they simply were not in PubMed](/writing/gpt3-artigos-falsos). Wisio starts from that constraint: every citation suggestion must resolve to a real DOI or PubMed ID before it reaches the manuscript.

## The editor

I chose TipTap because scientific writing is structured prose, not a textarea — headings, superscripts, bibliography blocks, and inline reference links all need to survive round-trips to the server as HTML. The editor is a fixed three-column layout (formatting toolbar · writing surface · AI panel) so the writing column never reflows when feedback arrives.

AI suggestions do not live inside the document as ghost text. Early prototypes with inline decorations fought the cursor on every keystroke. Instead, findings queue in a 380px right panel and connect to the editor through an imperative `EditorHandle` bridge: `findTextRange` walks the ProseMirror doc to locate the original span, `replaceRange` applies a writing fix, and `insertCitationAt` patches in-text link marks at the end of a claim. Citations themselves *are* TipTap marks — `link` nodes pointing to `#ref-{slug}` anchors on bibliography paragraphs with stable `anchorId` attributes, so clicking an in-text "(Silva-Filho et al., 2021)" scrolls to the full APA entry below.

Editor state and server state stay deliberately simple: MongoDB stores the manuscript as an HTML string, autosaved on a 10-second debounce after each edit. The AI panel state (feedback queue, chat history) lives in `sessionStorage` keyed by project ID — it is ephemeral review context, not part of the document. When a user accepts a suggestion, the panel updates immediately and the debounced save persists the new HTML. No CRDT, no operational transform — last write wins, which is fine for a single-author drafting tool.

## Streaming UX

AI responses today arrive as complete JSON payloads from a Go API, but the interface is built so adding token-by-token streaming does not require rethinking the layout. Three patterns keep the experience stable while the model thinks:

**Reserved space.** The right panel uses CSS `hidden` on inactive tabs instead of unmounting them, so switching between Tools, Chat, and Feedback never shifts the editor column. The panel grid is `288px | 1fr | 380px` — fixed before the first request fires.

**Skeleton-first loading.** When a paragraph scan starts, an `AISkeleton` block renders at the full height of a typical result card. The header shows "Reviewing…" and the skeleton sits above the existing queue, so new findings push in from the top without jumping the scroll position. Chat uses a three-dot "thinking" bubble in the message thread — same footprint as a short assistant reply.

**Error without drama.** Failed scans surface as a destructive toast and leave the draft untouched. The feedback queue persists in `sessionStorage`, so a network blip mid-review does not discard findings the user has not acted on yet.

Paragraph-level scans debounce for three seconds after the user stops typing in a paragraph, which batches rapid edits into one request instead of firing on every keystroke. That is the main latency win until true SSE streaming lands on the API.

## Citations flow

The pipeline splits *where* a citation is needed from *what* to cite:

1. **Scan** — the user pauses in a paragraph (or clicks Re-scan). The model returns structured findings: `type: "citation"` with `originalText` (the unsupported claim) and a `searchQuery`.
2. **Lookup** — the Go backend queries PubMed E-utilities first, then Crossref as fallback. Articles older than five years are filtered out; remaining hits are ranked by token overlap between the claim and title/journal/author strings.
3. **Format** — the server generates APA in-text and reference strings. Each ref gets a stable `anchorId` from DOI → PubMed ID → title prefix.
4. **Insert** — one click creates the References section if missing, appends the bibliography paragraph, and inserts the in-text link mark at the end of the claim span.

![Citations flow: paragraph scan → PubMed/Crossref lookup → inline citation insert](/work/citations-flow.svg)

Reference search in the Tools tab (browse PubMed/Crossref by keyword) is separate from this insert path — it is for exploration; the Feedback tab owns the one-click insert flow.

## What I'd do differently

I would ship true streaming on the feedback endpoint before adding more AI features. The skeleton UX papers over 5–8 second waits, but watching findings appear word-by-word would make the product feel alive and let users start reading the first suggestion while the model finishes the rest. I would also extract the `EditorHandle` bridge into a TipTap plugin with ProseMirror decorations for the *active* finding only — one highlighted span in the document, linked to the selected card in the panel — without going back to full inline ghost text. Finally, I would move manuscript storage from HTML strings to a structured JSON document (TipTap's native format) so diffing and collaborative editing do not depend on fragile string matching when the user edits text that has a pending suggestion.
