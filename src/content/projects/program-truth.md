---
title: "Program Truth"
description: "The program-status component for Truth Tools: maps execution evidence into a canonical artifact without hiding blockers or unknowns."
source: "github"
status: "public"
repoUrl: "https://github.com/hilmimuktitama/program-truth"
language: "JavaScript"
updatedDate: 2026-08-11
featured: false
order: 30
tags:
  - TPM
  - Jira
  - Confluence
  - evidence
---

## Context — component role

Program Truth is the status-mapping component in the Truth Suite. It gives
program operators a canonical artifact shape for Truth Tools to review while
keeping execution reality separate from the final narrative.

The familiar problem: the parent ticket says one thing, while task-level evidence shows something messier. A status update can look green because the summary is clean, not because the work is actually unblocked.

## What changed — component contribution

- Splits status work into facts, assumptions, blockers, owners, dates, and open questions.
- Made the update traceable to source evidence instead of relying on memory or meeting narration.
- Treated the parent-ticket story as a claim to verify, not the final truth.
- Kept the output reviewable enough for leadership updates without exposing private project details.

## Evidence I can show

- Public repository structure and prompts for evidence-first program review.
- Sanitized examples of how blockers, owners, and decisions are separated before a report is written.
- Npm installer and doctor flow for setting up the skill in local agent environments.
- A repeatable workflow that can be adapted to Jira and Confluence-heavy delivery environments.

## Why it matters

Good status work is not about making the slide look green. Program Truth makes
the claims and blockers explicit so Truth Tools can distinguish evidence quality
from program health.
