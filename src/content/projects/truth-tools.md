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

**Flagship framing:**

> Truth Tools is the flagship evidence-first technical-program reliability toolkit combining provenance-preserving evidence intake, defensible timeline compilation, agent-guided status synthesis, and deterministic pre-publication review.

Truth Tools is the flagship product and deterministic review gate in a small,
componentized Truth Suite. The sentence above is product framing for the
flagship and its surrounding components, not a claim that every component runs
as one integrated runtime.
The 0.4.0 release line adds the public repository, static demo, and
pre-publication evidence gate described here; this case study does not imply
real-world adoption or effectiveness.

## Problem

Cross-team status updates often flatten conflicting evidence into one confident
story. A tracker can name one date, a decision log another, and an unresolved
blocker can disappear from the leadership summary. A broad workflow also tried
to solve capture, timeline parsing, reconciliation, exports, and review in one
product, which made its boundary hard to explain.

## Product reset

Truth Tools is a deterministic review gate answering one narrower question:
does a supplied status artifact meet the claim floor for a reviewable evidence
trail, or have an obvious gap that should block publication? The claim floor is
an explicit minimum: active claims need stable, locator-only references and
the required status metadata before they can pass artifact-quality review. It
is not a source connector, an LLM judge, or an independent source of truth;
the component tools remain separate. Its deterministic checks do not prove
that a claim is true or that a source semantically supports a claim.

The flagship distinction is deliberately uncomfortable:

| Artifact | Verdict | Meaning |
| --- | --- | --- |
| Broken evidence | `fail` + `blocked` | The status is not ready for publication. |
| Fixed evidence | `pass` + `blocked` | The artifact passes quality checks while the declared blocker remains visible. |

Fixing the evidence does not fix the program. It makes the declared blocker
traceable and actionable.

## What changed

The product boundary is now explicit: capture, timeline, and program-status
components prepare structured inputs, while Truth Tools owns the final
evidence review and publication gate.

## Architecture

The following is a conceptual, operator-or-agent-mediated flow, not a claim
about a direct runtime pipeline:

**Capture -> provenance-preserving sources/unreviewed candidate claims -> Timeline/Program -> canonical `StatusArtifact` -> Truth Tools -> artifact quality + program-health signal derived from supplied active claims.**

Capture agents or adapters preserve source metadata and unreviewed candidate
claims. The canonical handoff carries locator-only references; source excerpts
and raw bodies do not cross that boundary. Metadata remains nested in its
declared source/claim metadata boundary rather than being promoted into claim
content.
Timeline Truth provides structured planning inputs, while Program Truth emits
structured and reviewed program claims. An operator or agent may assemble
these inputs into a canonical `StatusArtifact`; this is not described as a
direct component-to-component runtime pipeline. Truth Tools then normalizes and
validates that supplied artifact with one deterministic core shared by the CLI
and the two read-only MCP tools: `truth.review` and `truth.doctor`. The result
is a `TruthReview` with Markdown and JSON output plus explicit CI exit-code
gates. Truth Tools derives its program-health signal from supplied active
claims, not from a `health_consistency` field; health consistency is an
assessment of the supplied claims, not proof of program health. These checks
do not establish semantic source support or prove program health.

The surrounding Truth Suite remains componentized: Capture Truth prepares
source metadata and candidate claims, Timeline Truth provides planning inputs,
and Program Truth emits structured and reviewed program claims. Truth Tools
owns the contract, deterministic review, demo, and evaluation boundary.

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
- **Exact suite lock:** the integrated demo locks the exact `capture-truth`,
  timeline-truth, and program-truth component checkouts and can require those
  exact sibling APIs in CI; a checked-in public-safe projection is the honest
  local fallback. Capture's portable render is used only after its explicit
  portable approval boundary.
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
