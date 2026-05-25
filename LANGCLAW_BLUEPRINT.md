# Langclaw Mantle Hackathon Blueprint

Langclaw is positioned for the Mantle Turing Test Hackathon as **Mantle Alpha Sentinel**.

## One sentence

Langclaw is a verifiable Mantle on-chain intelligence agent that monitors smart money, liquidity anomalies, protocol momentum, and risk signals, then records evidence-backed AI decisions on Mantle. Strategy Lab adds Dune-backed backtests and paper-trade proofs without live-funds execution.

## Track fit

Primary track: **AI Alpha & Data / Data & Analytics**.

Supporting module: **Strategy Lab** (AI Trading & Strategy score booster via `LangclawTradingJournal`, not live trading).

Why AI Alpha & Data fits:

- Mantle on-chain data is the core input.
- The output is an AI-generated alpha brief, not an autonomous trade claim.
- Insight value comes from source-backed findings, structured reports, and provider-gap honesty.
- Agent decisions are verifiable through `LangclawRegistry` on Mantle.

## Product positioning

Langclaw should be framed as:

```text
Mantle Alpha Sentinel: an AI agent for verifiable on-chain alpha, smart-money monitoring, and anomaly alerts.
```

It should not be framed as:

```text
An autonomous trading bot or live-funds executor.
```

The user asks a Mantle alpha question in **Research** mode. Langclaw runs discovery, on-chain enrichment, signal synthesis, structured reporting, and optional registry proof. Strategy Lab is a separate `/strategy` surface for backtests and paper trades.

## Core demo prompts

- `Find smart-money accumulation on Mantle`
- `Detect liquidity anomalies on Mantle DEX pairs`
- `Rank Mantle protocols by TVL and yield momentum`

## Agent workflow

```text
User prompt (Research mode)
  -> Runtime probe (OpenClaw CLI)
  -> Planner
  -> Discovery (TypeScript: Surf, Elfa, Brave/Tavily/GitHub/HackQuest)
  -> Source normalizer (TypeScript)
  -> Trend scorer
  -> Evidence packager
  -> Verifier
  -> On-chain enrichment (TypeScript: Surf, Dune, Nansen, GeckoTerminal, CoinGecko, DEX Screener, DeFiLlama, Alchemy, Etherscan, GoPlus)
  -> signals + report + alphaSignal + providerTrace
  -> Final conclusion (OpenClaw or OpenAI fallback; guardrails append caveats)
  -> Evidence bundle storage
  -> LangclawRegistry agent decision record on product chain
```

Direct **Chat** mode skips the workflow and uses OpenAI Responses only.

## Output shape

Each Research run should surface:

- `signals.social`, `signals.onchain`, `signals.combined`
- Structured `report` (entities, tables, sections, caveats, recommendations)
- `alphaSignal` with quality score and `alertEligible`
- `providerTrace` per provider
- Final answer (analysis-only; no proof claims in answer body)
- Proof panel: evidence URI, decision hash, tx link when anchored
- ERC-8004 `agentId` when configured

## Proof contracts

### LangclawRegistry

Records agent decisions:

```solidity
struct AgentDecision {
    uint256 agentId;
    string runId;
    bytes32 decisionHash;
    string evidenceUri;
    string signalType;
    address recorder;
    uint256 createdAt;
}
```

Mantle mainnet: `0xe69755e4249c4978c39fbe847ca9674ce7af3505`

### LangclawTradingJournal

Records Strategy Lab backtests and paper trades. Mantle mainnet: `0xe96e9b76af8c8f32bfa2235d647186826d92fb7d`

### LangclawUsageVault

Optional MNT billing. Mantle mainnet: `0x7e93Ef361e7b54297cF963977bA829E47E59e8E1`

## UI scope

Keep the chat layout. Current mode labels:

- **Chat** — direct OpenAI chat
- **Research** — full Langclaw workflow (legacy `onchain` aliases here)

Frontend routes: `/chat`, `/watchlist`, `/strategy`, `/proofs`, `/usage`, `/task`, `/key`, `/memory`, `/settings`

Proof copy: **Agent Decision Proof**, Proof Center at `/proofs`

Badges: Mantle, AI Alpha, Evidence-backed, On-chain recorded

Client chat model is fixed to **GPT-5.4 nano** (`frontend/lib/chat-model.ts`). Backend synthesis may use `OPENAI_AGENT_MODEL` independently.

## Scoring narrative

- **Data source quality:** Mantle chain, Surf/Elfa/Nansen (Mantle-scoped), Dune, DEX Screener, DeFiLlama, wallet/token reads.
- **AI analysis depth:** signals, structured report, confidence, caveats, recommended watch/action.
- **Technical completeness:** 11-step workflow, frontend Research UI, Strategy Lab, automation, proof contracts.
- **Insight value:** smart-money tracking, liquidity anomaly detection, protocol momentum ranking, Alpha Watchlist.
- **Sustainability:** scheduled monitors, Telegram alpha alerts, optional usage vault.
- **Verifiability:** decision hash, evidence URI, agent id, recorder, timestamp, Mantle tx when anchored.

## MVP acceptance

- Prompt mentioning Mantle resolves to chain ID `5000`.
- Research mode returns signals, report, final answer, and proof metadata.
- Provider failures appear in `providerTrace` and report caveats, not hidden.
- `LangclawRegistry` records and returns agent decisions when configured.
- Frontend loads with Mantle-only wallet config and Chat/Research modes.
- Docs describe AI Alpha & Data first; Strategy Lab as supporting proof module.
