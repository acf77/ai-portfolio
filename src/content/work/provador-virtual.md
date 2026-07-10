---
title: Provador Virtual — AI virtual try-on
date: '2026.02'
excerpt: Upload your photo and a garment, preview the outfit with IDM-VTON on Replicate — and keep the UI honest while inference takes 30+ seconds.
role: Solo project
tags: ['NEXT.JS', 'REACT', 'REPLICATE', 'TYPESCRIPT', 'TAILWIND']
repoUrl: https://github.com/acf77/provador-virtual
video: /work/provador-demo.webm
---

## Upload → preview

Provador Virtual is a mobile-first try-on MVP: the user uploads a full-body photo and one or more garment images, taps **Gerar look**, and gets a composite preview of how the outfit looks on them. Under the hood, a Next.js API route sends both images to [IDM-VTON](https://replicate.com/cuuupid/idm-vton) on Replicate and polls until the prediction succeeds. Results land in a local wardrobe (IndexedDB) so `/wardrobe` and `/looks` work offline after the first generation.

I built this to dogfood the same deploy-and-ship loop I use for [Trapiche](https://trapiche.cloud) — the app itself is not on Trapiche (Replicate inference needs a server runtime and an API key), but the portfolio case study page you're reading is. For a portfolio piece, a bare GitHub link tells interviewers nothing; a short demo and three paragraphs on the hard part — slow inference UX — is the point.

## Handling slow inference in the UI

IDM-VTON runs on a GPU somewhere in Replicate's fleet. Cold starts plus diffusion steps routinely push past 30 seconds. The UI treats that as a first-class state machine, not a spinner on a button:

**Stage progression.** `idle → uploading → processing → done | error`. Each stage has a fixed label and target progress percentage (20 → 60 → 100). The user always knows which phase they are in.

**Honest progress.** While polling every 2.5 seconds, a timer ticks the bar upward toward 95% — it never hits 100% until Replicate returns `succeeded`. That avoids the classic "stuck at 99%" problem without lying about how long is left.

**Layout-stable waiting.** A full-screen `LoadingOverlay` with a fixed-height preview placeholder (`h-24` shimmer block) reserves space for the result image before it exists. The overlay uses `backdrop-blur` over the upload form so the transition to the result page does not reflow the layout underneath.

**Failure recovery.** Replicate `failed` or `canceled` statuses surface a clear error message; the user returns to the upload form with their photos still attached. No silent retries that burn inference credits.

## What I'd do differently

I would add a server-side queue with webhooks instead of client polling — fewer open tabs hammering `/api/generate/:id`, and push notifications when the look is ready. For a public demo, I would cache a few pre-generated examples (same garment, different body types) so visitors can see output quality without spending Replicate credits on every portfolio visit. And I would deploy the frontend on Trapiche with a rate-limited demo endpoint behind the platform's AI gateway, keeping the Replicate key server-side while still dogfooding the full stack.
