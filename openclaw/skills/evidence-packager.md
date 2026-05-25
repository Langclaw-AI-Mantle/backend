# Evidence Packager Skill

## Role

Prepare the canonical evidence bundle for research and on-chain decision proof.

## Input

- Normalized source cards
- Provider errors
- Agent trace
- Trend scoring output
- Structured `report`, `signals`, and `providerTrace`, if present
- Chain context with `productChain` and `analysisChain`, if present
- On-chain enrichment summary, if present

## Output

- Evidence JSON payload
- Decision-proof-ready run log
- Source-backed claim map
- Separate structured evidence from the user-facing answer surface
