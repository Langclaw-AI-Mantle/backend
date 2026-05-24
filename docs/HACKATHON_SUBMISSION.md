# Langclaw Mantle Alpha Sentinel

> This document describes the Mantle track submission narrative. For the live Celo eligibility runbook and current blocker status, see [`CELO_ELIGIBILITY.md`](./CELO_ELIGIBILITY.md).

## Track

Langclaw targets the **AI Alpha & Data / Data & Analytics** path and now has an additive **AI Trading & Strategy** demo path through Strategy Lab.

It is not positioned as a live-funds trading executor. The product produces source-backed Mantle intelligence, watchlist recommendations, Dune-backed strategy backtests, paper-trading orders, and verifiable on-chain proof.

## One-Liner

Langclaw is a Mantle-first AI intelligence and strategy agent that analyzes smart-money flow, liquidity anomalies, protocol momentum, and DEX pair history, then records each agent decision and paper-trading outcome on Mantle through proof contracts linked to an ERC-8004 identity.

## Why It Fits

| Requirement | Langclaw coverage |
| --- | --- |
| Mantle on-chain data as a core source | Etherscan V2 with `chainid=5000`, DEX Screener Mantle pairs, DeFiLlama protocol/yield data, optional Dune/Alchemy/GoPlus providers |
| AI analysis depth | Planner, source normalization, signal synthesis, risk notes, evidence packaging, final answer generation |
| Technical completeness | Backend API, Next.js frontend, Mantle wallet flow, proof registry, ERC-8004 agent identity, provider-gap reporting |
| Sustainability | Modular provider layer, optional usage vault, API-key based backend, automation/notification hooks |
| Insight value | Smart-money transfer summaries, liquidity risk checks, protocol/yield watchlists, Supabase-backed Alpha Watchlist signals, source-backed confidence notes |
| Strategy alpha | Mantle Liquidity Momentum Strategy with Dune historical rows, equity curve, trade table, win rate, drawdown, deterministic paper orders, and journal proof status |
| Visualization quality | Mantle Intelligence UI cards, Strategy Lab charts/tables, provider evidence details, source-gap display, on-chain proof panel, Proof Center registry and strategy tables |

## AI Alpha & Data Criteria

Langclaw should be submitted as an **AI Alpha & Data** project first. Strategy Lab is a supporting proof module, not the core claim.

| Criteria | Langclaw evidence | Status |
| --- | --- | --- |
| Smart money tracking agent | Research mode routes smart-money prompts to Surf, Dune, and Nansen. Reports show candidate wallets, DEX accumulation rows, CEX withdrawal signals, source gaps, and watchlist recommendations. | Ready |
| Mantle ecosystem protocol data dashboard | Mantle protocol and yield momentum prompts use DeFiLlama protocol and pool data, then render ranked entities, metrics, and source-backed report sections. | Ready |
| AI-driven market sentiment analysis | Surf, Elfa, Brave/Tavily, GitHub, and social/public discovery feed the social and combined signal sections. The demo should describe this as market narrative and sentiment context, not as standalone sentiment trading execution. | Ready for demo |
| Automated arbitrage / market-making strategies | Not a primary claim. Strategy Lab backtests and opens paper-trading proof only. Langclaw does not execute live arbitrage or market-making trades. | Supporting only |
| Use Mantle on-chain data as a core data source | Mantle chain `5000`, Mantle DEX pairs, Mantle provider routes, MNT usage billing, and Mantle proof contracts are core to the workflow. | Ready |
| Deploy on Mantle Network | `LangclawRegistry`, `LangclawTradingJournal`, `LangclawUsageVault`, and ERC-8004 agent identity are deployed or registered on Mantle. | Ready |

## Signal Quality Metric

Langclaw does not treat every large flow as alpha. It scores signal quality from source depth, provider status, row-level evidence, and missing checks.

| Confidence | Meaning | Example evidence |
| --- | --- | --- |
| High | Multiple sources agree and wallet evidence includes labels plus follow-up checks. | Row-level wallet flow, wallet label, retention check, sell-pressure check, source URL, and second-source validation. |
| Medium | Row-level on-chain data exists, but identity or follow-up evidence is incomplete. | DEX accumulation rows, CEX withdrawal rows, token amount, USD value, trade count, window, provider status, and source URL. |
| Low | The run has only narrative context, weak provider coverage, or fallback synthesis. | No wallet-flow rows, partial social signal, failed provider route, or unavailable label and retention checks. |

The report exposes this through the `Confidence` badge, evidence tables, provider diagnostics, limits, checks performed, checks unavailable, and conclusion sections.

## False Positive Handling

Langclaw avoids overclaiming smart-money identity.

- DEX-only rows are treated as **large-flow watchlist** entries, not confirmed smart-money wallets.
- Confirmed smart money requires wallet labels plus retention or sell-pressure checks.
- CEX deposits are treated as possible sell-pressure signals, not accumulation candidates.
- External token activity is marked as low-confidence context when it is not native to the requested chain.
- Empty provider rows do not create fake tables.

## Alert Channel Positioning

The main product surface is the web dashboard. Telegram is the alert and automation channel for saved signals and monitor updates.

Do not claim Discord support unless a Discord integration is added. For this submission, describe Telegram as the notification path and Proof Center as the verification path.

## Deployed Proof Layer

| Item | Value |
| --- | --- |
| Mantle chain ID | `5000` |
| LangclawRegistry | `0xe69755e4249c4978c39fbe847ca9674ce7af3505` |
| Registry deployment tx | `0xf6f8af14295c86d2f358c32ba15d0669903b122c086dcb0b432d9df8aaec6b6c` |
| Optional usage vault | `0x7e93Ef361e7b54297cF963977bA829E47E59e8E1` |
| Usage vault deployment tx | `0xb60ed9019c5c8bb4c2b32c6a3e62e1edaf3b1530528d8151dfce08c1fd8b44e0` |
| LangclawTradingJournal | `0xe96e9b76af8c8f32bfa2235d647186826d92fb7d` |
| ERC-8004 identity registry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Langclaw ERC-8004 agent ID | `94` |
| Agent owner / recorder | `0x2cA915EF6be8D2D48ccD3c5dAF715546AF873A4c` |

## Live Decision Proofs

| Decision | Signal | Transaction |
| --- | --- | --- |
| `0` | `smart-money` | `0x8a598de98fac01d53e696df67a9527de280c4d8cece72ccc4ced91164efa5187` |
| `1` | `smart-money` | `0x39caaca5fe3a6792c427740342116f309ac02ee0a846c7dbe54f12c86a39a177` |
| `2` | `liquidity-anomaly` | `0x9956a7574f6144ce831deac3275305939d65503366bc11bd922bc4783eeb5faf` |

The frontend Proof Center reads the registry and displays the latest on-chain decision history, including smart-money, liquidity-anomaly, and TVL/yield-momentum signals.

Each registry record stores:

- ERC-8004 `agentId`
- Langclaw `runId`
- deterministic `decisionHash`
- evidence URI
- signal type
- recorder wallet
- block timestamp

## Strategy Lab

Strategy Lab adds the AI Trading & Strategy path without live-funds risk:

1. User chooses a Mantle pair or uses the sample pair.
2. Backend fetches historical rows from Dune using `DUNE_STRATEGY_QUERY_ID` or a submitted query ID.
3. The Mantle Liquidity Momentum Strategy backtests price momentum, volume/liquidity strength, minimum liquidity, optional whale flow, stop loss, take profit, and max holding time.
4. UI renders equity curve, trades, win rate, max drawdown, PnL, latest signal, and evidence metadata.
5. User opens a paper trade from the latest signal.
6. Backend computes deterministic `decisionHash` and `resultHash`, then records the run in the live `LangclawTradingJournal` deployment in the submission environment.

Each trading journal record stores:

- ERC-8004 `agentId`
- `runId` and `strategyId`
- Mantle market / pair address
- deterministic decision and result hashes
- evidence URI
- action (`buy`, `sell`, `hold`, or `exit`)
- PnL in bps
- status (`backtested`, `paper-opened`, or `paper-closed`)

## Demo Prompts

Use these prompts in Mantle Intelligence mode:

```text
Analyze holder flow and smart-money signals on Mantle token 0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34
```

Expected result: token transfer evidence from Mantle chain `5000`, holder-flow summary, confidence/risk note, and decision proof.

```text
Detect liquidity anomaly on Mantle pair 0xeAfc4D6d4c3391Cd4Fc10c85D2f5f972d58C0dD5
```

Expected result: DEX Screener Mantle pair details, liquidity/risk signal, no unrelated chain pair leakage, and decision proof.

```text
Rank Mantle protocols by TVL and yield momentum
```

Expected result: DeFiLlama-backed protocol/yield context for a Mantle ecosystem dashboard narrative.

Use Strategy Lab at `/strategy`:

```text
Select the Mantle DEX pair sample, provide a Dune query id if it is not set in backend env, and run backtest.
```

Expected result: Strategy metrics, equity curve, trade log, latest AI signal, Dune evidence details, and an anchored `LangclawTradingJournal` proof in the submission environment. Local clones without the journal env can still return `prepared`. Then click **Open Paper Trade** to create a deterministic simulated order.

## What To Say In The Video

1. Langclaw is an AI Alpha & Data agent for Mantle, with a Strategy Lab for verifiable backtesting and paper trading.
2. It uses Mantle on-chain/provider data as the evidence base.
3. It separates usable evidence from provider gaps instead of hiding missing sources.
4. It records each AI decision hash on Mantle through `LangclawRegistry`.
5. The registry record is linked to ERC-8004 agent ID `94`, giving the agent an on-chain performance trail.
6. Strong signals can be saved to Alpha Watchlist for follow-up, while Proof Center shows the verifiable registry history and Strategy Proofs from the trading journal.

## Demo Evidence Checklist

- Run the smart-money prompt and show the report title, confidence, source count, provider status, candidate table, and limits.
- Run the liquidity-anomaly prompt and show Mantle pair evidence, risk note, and decision proof.
- Run the protocol momentum prompt and show Mantle TVL/yield ranking.
- Save one strong signal to Alpha Watchlist.
- Open Proof Center and show `agentId`, `signalType`, decision hash, evidence URI, and Mantle transaction link.
- Show Telegram alert settings only as the notification channel, not as the primary research UI.
- Mention focused verification: smart-money, liquidity anomaly, provider routing, proof workflow, and research streaming tests passed locally.

## Local Verification

Backend:

```bash
cd backend
npm run check:mantle-proof
npm run typecheck
npm test
```

Frontend:

```bash
cd frontend
pnpm typecheck
```

Contracts:

```bash
cd contracts
git submodule update --init
forge build
forge test
```

Current contract test result depends on local Foundry availability. Run `forge test` after installing Foundry to verify registry, usage vault, and trading journal tests together.

## Caveat

Langclaw does not sign, send, swap, buy, sell, or execute live-funds trades in the current hackathon build. Strategy Lab is intentionally scoped to backtesting and paper trading.

Usage billing is ledger-based: user MNT deposits on Mantle or USDT deposits on Celo are credited after vault deposit verification, then Mantle Intelligence / agent requests reserve and settle usage balance internally. The vault is not charged by sending an on-chain transaction for every individual AI request.
