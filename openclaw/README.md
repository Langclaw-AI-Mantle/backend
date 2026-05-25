# Langclaw OpenClaw Workflow

Langclaw uses this folder as the OpenClaw skill workspace.

OpenClaw is the agent reasoning layer for planner, trend scoring, evidence packaging, verification, and optional final-answer synthesis. It does **not** call X, GitHub, Tavily, Brave Search, HackQuest, Surf, Nansen, Elfa, or on-chain APIs directly. The backend keeps those provider tools in TypeScript so API keys stay server-side.

## Runtime steps

`runLangclawWorkflow(topic)` in `src/lib/langclaw/workflow.ts` executes:

| Step ID | Layer | Responsibility |
| --- | --- | --- |
| `runtime` | TS | Probe OpenClaw CLI; set `runtime: openclaw` or `typescript` |
| `planner` | OpenClaw / fallback | Research and on-chain routing plan, chain context |
| `discovery` | **TypeScript** | Live provider discovery (Surf, Elfa, public fallbacks) |
| `source-normalizer` | **TypeScript** | Normalize results into `SourceCard` records |
| `trend-scorer` | OpenClaw / fallback | Rank evidence-backed patterns |
| `evidence-packager` | OpenClaw / fallback | Canonical evidence bundle for proof |
| `verifier` | OpenClaw / fallback | Verification fields for proof panel |
| `onchain-enrichment` | **TypeScript** | Smart-money, liquidity, DeFi, and market tools with provider fallback |
| `final-conclusion` | OpenClaw / OpenAI / fallback | User-facing answer (`conclusion` JSON shape) |
| `evidence-bundle` | TS | Persist evidence URI and decision hash inputs |
| `mantle-chain` | TS | Anchor `LangclawRegistry` record on product chain when configured |

After discovery, the workflow builds `signals` (social / onchain / combined), optional `report`, `providerTrace`, and `alphaSignal` before final synthesis.

## Skill files

| Skill | File | Runs in |
| --- | --- | --- |
| Planner | [`skills/planner.md`](skills/planner.md) | OpenClaw |
| Discovery | [`skills/discovery.md`](skills/discovery.md) | TypeScript (skill describes provider intent) |
| Source normalizer | [`skills/source-normalizer.md`](skills/source-normalizer.md) | TypeScript |
| Trend scorer | [`skills/trend-scorer.md`](skills/trend-scorer.md) | OpenClaw |
| Evidence packager | [`skills/evidence-packager.md`](skills/evidence-packager.md) | OpenClaw |
| Verifier | [`skills/verifier.md`](skills/verifier.md) | OpenClaw |
| Final conclusion | [`skills/final-conclusion.md`](skills/final-conclusion.md) | OpenClaw / OpenAI fallback |

X discovery defaults to Brave Search (`X_DISCOVERY_PROVIDER=brave`). Use `x-api` only with `X_BEARER_TOKEN` and credits.

## Environment

Default runtime:

```bash
OPENCLAW_ENABLED=true
OPENCLAW_WORKFLOW_ENABLED=true
OPENCLAW_AI_SYNTHESIS=true
OPENCLAW_STEP_TIMEOUT_SECONDS=60
OPENAI_API_KEY=
OPENAI_AGENT_MODEL=gpt-5.2
```

Optional overrides:

```bash
OPENCLAW_CLI_PATH=openclaw
OPENCLAW_MODEL=
OPENAI_CHAT_MODEL=gpt-5-mini
```

When OpenClaw is enabled, Langclaw probes the CLI. If it responds, the run is marked `runtime: "openclaw"`. If the CLI is missing, the API falls back to `runtime: "typescript"` and keeps the run live with deterministic step output.

If an OpenClaw step fails, that step is marked `execution: "deterministic-fallback"`. Evidence and verifier steps prepare proof fields only; they do not claim a chain transaction unless the registry write actually succeeds.

## Proof and chat paths

- Direct chat: `src/lib/openai-direct-chat.ts` uses OpenAI Responses API (`toolMode: chat`).
- Final answer synthesis: `src/lib/langclaw/openclaw-ai.ts` (OpenClaw) and `src/lib/langclaw/openai-synthesis.ts` (fallback).
- Proof anchoring: `src/lib/langclaw/proof.ts` when `{MANTLE,CELO}_CHAIN_ENABLED` and registry env are set.

If proof env is missing, the response stays honest with `proof.chain.status` of `prepared` or `failed` instead of implying an on-chain write.

## Install (optional, recommended for demos)

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
openclaw doctor
```
