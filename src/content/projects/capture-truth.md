---
title: "Capture Truth"
description: "An experiment in keeping the source, date, and context attached when notes, files, and exports move into a review workflow."
source: "github"
status: "public"
repoUrl: "https://github.com/hilmimuktitama/capture-truth"
language: "JavaScript"
updatedDate: 2026-08-11
featured: false
order: 10
tags:
  - TPM
  - MCP
  - evidence
  - intake
kind: "component"
glance:
  problem: "Summaries are harder to trust when their sources are missing."
  myRole: "I focused this piece on collecting evidence before making status or timeline judgments."
  whatChanged: "The output keeps source snapshots, references, dates, gaps, and conflicts together for later review."
  evidenceAvailable: "A public repository with command-line and MCP boundaries, install notes, checks, helpers, and sample fixtures."
---

## Context

Capture Truth handles the first step: recording what was captured, where it
came from, and what has not been reviewed yet. Its scope is the pre-review mechanics.
Candidate claims remain unreviewed until a later review. It does not establish semantic truth and does not establish semantic source support.

Pasted text, local files, CSV or JSON exports, and already-fetched adapter
outputs become an `evidence_pack`. The file records normalization, timestamps,
source revisions, content hashes, locator-only references, unreviewed candidate claims,
and derivation details.

Explicit approval is required for
candidate text in `portable-summary`. An `internal-evidence-pack` can contain unreviewed
structured and metadata candidates for internal review, but it is not a guarantee of portable safety.
Raw and mixed representations remain excluded from portable output; `raw-local` is local-only
and is never promoted into a portable representation.

The Jira- and Confluence-shaped helpers accept already-fetched evidence.
Capture Truth bundles no connectors and performs no fetching.

It also does not own gaps, final conflicts, program health or health assessment,
timeline validation, or truth determination. Those questions belong to a later
review.

## What changed

- Evidence collection is separate from status, risk, and timeline judgment.
- Source identity, timestamps, revisions, hashes, and locator-only references
  stay attached when an unreviewed claim moves to the next step.
- The output records where a candidate came from and whether someone approved
  it, without deciding whether the claim is true.
- Portable summaries, internal evidence, and local-only material stay separate.

## Evidence I can show

- A public repository with command-line commands, MCP boundaries, install notes,
  and development checks.
- Small read-only helpers for already-fetched Jira- and Confluence-shaped
  evidence. They do not fetch anything themselves.
- A checked-in sample for exports, redaction checks, and compact adapters. It is
  a technical example, not an outcome measurement.

## Why I made it

I wanted a status workflow to keep a trail back to its starting material. This
small piece does that collection work before Timeline Truth or Program Truth
tries to interpret it. It is deliberately limited: a traceable input can still
be wrong, but at least a reviewer can find where it came from.
