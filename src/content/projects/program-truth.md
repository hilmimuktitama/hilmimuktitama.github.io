---
title: "Program Truth"
description: "The program-status component for Truth Tools: emits canonical StatusArtifact v2 directly from execution evidence, with structured reviewed claims that keep blockers and unknowns visible."
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
kind: "component"
glance:
  problem: "A status update can look green because its summary is clean, not because work is unblocked."
  myRole: "Separate execution reality from the final narrative with a canonical artifact shape."
  whatChanged: "Split status work into facts, assumptions, blockers, owners, dates, and open questions tied to source evidence."
  evidenceAvailable: "Public repository structure, prompts, sanitized examples, an installer, a doctor flow, and a repeatable workflow."
---

## Context — component role

Program Truth is the status-mapping component in the Truth Suite. It emits a
canonical `StatusArtifact` v2 directly, carrying a supplied explicit health
assessment alongside active signals and structured, reviewed claims for Truth
Tools. It keeps execution evidence separate from the final narrative. It does
not prove truth or semantic source support.

The familiar problem: the parent ticket says one thing, while task-level evidence shows something messier. A status update can look green because the summary is clean, not because the work is actually unblocked.

## What changed — component contribution

- Splits status work into facts, assumptions, blockers, owners, dates, and open questions.
- Made the update traceable to source evidence instead of relying on memory or meeting narration.
- Treated the parent-ticket story as a structured claim to review, not the final truth.
- Kept the output reviewable enough for leadership updates without exposing private project details.
- Guides operators toward available Jira and Confluence connectors, but bundles no connectors.
- Emits the canonical `StatusArtifact` v2 with the explicit assessment and active signals for downstream review; it does not perform deterministic validation itself.

## Evidence I can show

- Public repository structure and prompts for evidence-first program review.
- Sanitized examples of how blockers, owners, and decisions are separated before a report is written.
- Npm installer and doctor flow for setting up the skill in local agent environments.
- A repeatable workflow that can be adapted to Jira and Confluence-heavy delivery environments.

## Why it matters

Good status work is not about making the slide look green. Program Truth makes
the supplied explicit health assessment, active signals, structured reviewed
claims, and blockers available so Truth Tools can reconcile the assessment with
the active claim floor. Program Truth itself performs no deterministic
validation, and neither component presents its output as proof of truth or
outcomes.
