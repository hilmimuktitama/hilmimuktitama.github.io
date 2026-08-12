---
title: "Truth Tools"
description: "A deterministic evidence gate for project-status artifacts that separates artifact quality from program health before publication."
source: "github"
status: "public"
repoUrl: "https://github.com/hilmimuktitama/truth-tools"
liveUrl: "https://hilmimuktitama.github.io/truth-tools/"
language: "JavaScript"
updatedDate: 2026-08-12
featured: true
order: 1
tags:
  - TPM
  - JavaScript
  - MCP
  - evidence
  - quality
---

## Context

Truth Tools is the flagship review gate in a small, componentized Truth Suite.
It is prepared as a public repository and static demo; this case study does
not imply a published package release or real-world adoption.

## Problem

Cross-team status updates often flatten conflicting evidence into one confident
story. A tracker can name one date, a decision log another, and an unresolved
blocker can disappear from the leadership summary. A broad workflow also tried
to solve capture, timeline parsing, reconciliation, exports, and review in one
product, which made its boundary hard to explain.

## Product reset

Truth Tools answers one narrower question: does a supplied status artifact
have a reviewable evidence trail, or an obvious gap that should block
publication? It runs after evidence collection and before publication. It is
not a source connector or an LLM judge; the component tools remain separate.

The flagship distinction is deliberately uncomfortable:

| Artifact | Verdict | Meaning |
| --- | --- | --- |
| Broken evidence | `fail` + `blocked` | The status cannot be trusted yet. |
| Fixed evidence | `pass` + `blocked` | The evidence is trustworthy, and the real blocker is visible. |

Fixing the evidence does not fix the program. It makes the blocker trustworthy
and actionable.

## What changed

The product boundary is now explicit: capture, timeline, and program-status
components prepare structured inputs, while Truth Tools owns the final
evidence review and publication gate.

## Architecture

Source systems feed a structured `StatusArtifact` through capture agents or
adapters. Truth Tools then normalizes and validates that artifact with one
deterministic core shared by the CLI and the two read-only MCP tools:
`truth.review` and `truth.doctor`. The result is a `TruthReview` with Markdown
and JSON output plus explicit CI exit-code gates.

The surrounding Truth Suite remains componentized: Capture Truth prepares
source metadata, Timeline Truth builds and compares planning timelines, and
Program Truth maps program status into a canonical artifact. Truth Tools owns
the contract, review, demo, and evaluation boundary.

## Engineering decisions

- **Snapshot gap:** `as_of`, `observed_at`, and `source_updated_at` are kept
  distinct, so a source that changed after its snapshot is a visible review
  finding rather than silently fresh evidence.
- **Privacy boundary:** source records carry metadata and structured
  references, never raw Jira or document bodies. The static demo has no login,
  telemetry, or network requests.
- **Quality and health:** `artifact_quality` (`pass`, `needs_review`, `fail`)
  is independent from `program_health` (`on_track`, `at_risk`, `blocked`,
  `unknown`). A quality pass must not turn a blocked program green.
- **OIDC release provenance:** publishing is designed around trusted npm and
  Pages workflows with GitHub OIDC rather than long-lived registry tokens.
- **Exact component lock:** the integrated demo locks the capture-truth,
  timeline-truth, and program-truth component checkouts and can require those
  exact sibling APIs in CI; a checked-in public-safe projection is the honest
  local fallback.
- **One contract:** canonical JSON Schema contracts are shared by CLI, MCP,
  generated reports, and verification instead of relying on implicit shapes.

## Evidence I can show

The repository includes canonical JSON Schema contracts, CLI and read-only MCP
interfaces, a static no-login demo, launch-readiness fixtures, generated
reports, timeline-drift output, and a repeatable evaluation harness.

## Honest evaluation boundary

The hand-written and seeded synthetic suites are repeatable policy tests. They
measure whether the engine implements its own documented rules, not whether it
improves real-world status quality, saves time, or has adoption. Proving that
boundary would require anonymized real artifacts, a documented labeling process
with a second labeler, and measured misses and false positives.

## TPM competencies

This project shows product reset and scope control, contract-first thinking,
cross-component dependency management, privacy-aware release planning,
quality-gate design, deterministic verification, and honest communication of
evidence, risk, and uncertainty.

## Links

- [Public repository](https://github.com/hilmimuktitama/truth-tools)
- [Live demo](https://hilmimuktitama.github.io/truth-tools/)
- [Portfolio case study (this page)](/work/truth-tools/)
- [Capture Truth component](https://github.com/hilmimuktitama/capture-truth)
- [Timeline Truth component](https://github.com/hilmimuktitama/timeline-truth)
- [Program Truth component](https://github.com/hilmimuktitama/program-truth)
