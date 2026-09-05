---
title: "Truth Tools"
description: "An experiment in keeping missing or conflicting evidence visible before a status update is shared."
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
kind: "flagship"
glance:
  problem: "Status updates can flatten conflicting evidence into one confident story."
  myRole: "I narrowed the project to preparing evidence for review before a status update is published."
  whatChanged: "The capture, timeline, and program-status pieces now meet at a separate review step."
  evidenceAvailable: "Public schemas, command-line and MCP interfaces, a static demo, fixtures, reports, and a small evaluation setup."
  evaluationBoundary: "Synthetic policy tests measure documented rules, not real-world quality, time saved, or adoption."
---

## Context

I started Truth Tools as a small experiment around a problem I kept noticing:
a status update can sound settled even when the material behind it disagrees.

The repository sits above three smaller companion projects. In practice, it is
a checker that asks whether a status draft is ready for a person to review.

The 0.4.0 release line adds a public repository, a static demo, and a check
before publication. It is not evidence that the project has been adopted or
that it improves real programs.

## Problem

Cross-team status updates can flatten conflicting evidence into one neat story.
A tracker might name one date, a decision log another, and an unresolved
blocker may disappear from the summary.

My first version also tried to handle capture, timeline parsing,
reconciliation, exports, and review in one workflow. It became hard to explain
and was probably trying to do too much.

## What I changed

I narrowed the project to one question: does a supplied status file contain the
references and metadata required by its own rules? The repository calls that
minimum the claim floor. Active claims need stable, locator-only references and
the expected status metadata before the file can pass the check.

Truth Tools is not a source connector, an AI judge, or an independent source of
truth. It checks structure and consistency. It cannot tell whether a claim is
actually true or whether a source really supports it.

One detail matters more than the name of the tool:

| Example input | Check result | What it means |
| --- | --- | --- |
| Missing references | `fail` + `blocked` | The status is not ready to share. |
| References repaired | `pass` + `blocked` | The file passes its checks, but the project is still blocked. |

Tidying the evidence does not fix the project. It only makes the blocker easier
to see and follow up.

## How the pieces fit

This is a sketch of the workflow, not a claim that the repositories run as one
automatic pipeline:

**Capture -> source references and unreviewed notes -> Timeline/Program -> structured status draft -> Truth Tools -> checks and a review result.**

Capture Truth keeps source details and candidate claims. Its handoff uses
locator-only references, so raw excerpts do not travel with the file. Source
metadata stays nested under the source or claim it belongs to.

Timeline Truth prepares planning inputs. Program Truth emits the canonical
`StatusArtifact` v2 directly, including a supplied explicit assessment and
active signals. Truth Tools checks that supplied file through the command line
or two read-only MCP tools, then returns Markdown and JSON. It compares the
assessment with the active claim floor and reports a conservative consistency result.
That result is a consistency check, not a measurement of project
health.

## A few choices I made

- **Dates can disagree.** The repository calls this the snapshot gap.
  `as_of`, `observed_at`, and `source_updated_at` stay separate so a newer
  source is visible instead of being treated as automatically current.
- **Privacy stays narrow.** Records carry metadata and references, not raw Jira
  tickets or document bodies. The demo has no login, telemetry, or network
  requests.
- **Quality and health are different.** A well-formed status file can still
  describe a blocked project.
- **Publishing uses OIDC.** The npm and Pages workflows avoid long-lived
  registry tokens.
- **The demo uses an exact suite lock.** CI can check the exact companion
  versions. A checked-in public-safe copy remains the local fallback, and a
  portable render is used only after the portable approval step.
- **The tools share one contract.** The command line, MCP tools, reports, and
  checks use the same JSON Schema instead of each assuming its own shape.

## What you can inspect

The repository includes the schemas, command-line and read-only MCP interfaces,
a no-login demo, sample inputs, generated reports, timeline-drift output, and a
small evaluation setup.

## Limits

The hand-written and seeded synthetic tests only check whether the code follows
its documented rules. They do not show that it improves real status updates,
saves time, or has been adopted. Testing those claims would need anonymized
real examples, a documented labeling process, a second reviewer, and measured
misses and false positives.

## What I practised

I used this project to practise narrowing scope, writing shared contracts,
tracking dependencies between small tools, thinking about privacy and release
checks, and being clear about what the evidence cannot show.

## Links

- [Public repository](https://github.com/hilmimuktitama/truth-tools)
- [Live demo](https://hilmimuktitama.github.io/truth-tools/)
- [This experiment](/work/truth-tools/)
- [Capture Truth component](https://github.com/hilmimuktitama/capture-truth)
- [Timeline Truth component](https://github.com/hilmimuktitama/timeline-truth)
- [Program Truth component](https://github.com/hilmimuktitama/program-truth)
