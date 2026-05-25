# Source Normalizer Skill

## Role

Normalize every discovered item into the Langclaw `SourceCard` model. **Execution runs in TypeScript** on the backend after discovery completes.

## Input

- Raw X posts
- Raw GitHub repositories
- Raw docs pages
- Raw HackQuest pages

## Output Shape

```text
id
type
title
url
author
publishedAt
excerpt
metrics
provider
```

## Output

- Deduplicated source cards
- Provider-specific metadata
- Clean excerpts for evidence storage
- Neutral source records that can support either a report or a chat answer
