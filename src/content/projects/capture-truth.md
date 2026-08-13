---
title: "Capture Truth"
description: "The evidence-intake component for Truth Tools: turns local notes, files, exports, and adapter metadata into neutral evidence packs before review."
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
---

## Context — component role

Capture Truth is the intake component in the Truth Suite. It owns only the
pre-review mechanics of preserving what was captured, where it came from, and
what remains unreviewed before downstream review. Candidate claims remain unreviewed until that downstream review. Capture Truth does not establish semantic truth and does not establish semantic source support; it preserves the captured material and its provenance for review rather than treating intake as verification.

It turns pasted text, local files, CSV or JSON exports, and already-fetched
read-only adapter outputs into a neutral `evidence_pack`. Its boundary covers normalization,
timestamps, source revisions, content hashes, locator-only references,
unreviewed candidate claims, and derivation metadata. Explicit approval is required for
candidate text in `portable-summary`. An `internal-evidence-pack` can contain unreviewed
structured and metadata candidates for internal review, but it is not a repo-safe guarantee.
Raw and mixed representations remain excluded from portable output; `raw-local` is local-only
and is never promoted into a portable representation.
Its Jira- and Confluence-shaped helpers accept already-fetched evidence;
Capture Truth bundles no connectors and performs no fetching.

Capture Truth explicitly does not own gaps, final conflicts, program health or
health assessment, timeline validation, or truth determination. Those are
downstream review responsibilities, not intake output fields.

## What changed — component contribution

- Makes evidence intake a separate workflow instead of mixing capture with
  status, risk, or timeline judgment.
- Preserved source identity, timestamps, revisions, hashes, and locator-only references before handing unreviewed candidates to downstream workflows.
- Recorded derivation and explicit approval decisions without deciding whether a claim is true.
- Kept `portable-summary`, `internal-evidence-pack`, and local representations distinct, with explicit approval required for candidate text in `portable-summary`.

## Evidence I can show

- Public repository with CLI commands, MCP tool boundaries, install notes, and development checks.
- Read-only compact intake helpers for already-fetched Jira and Confluence-shaped evidence; Capture Truth bundles no connectors and performs no fetching.
- Repo-safe fixture covering export, redaction checks, and compact adapters; it is not an outcome measurement.

## Why it matters

Program workflows can only be as reliable as the material they start from.
Capture Truth keeps intake narrow and explicit, so an operator or agent can use
its provenance-preserving source records and unreviewed candidate claims with Timeline Truth and
Program Truth when assembling a canonical `StatusArtifact`, rather than relying
on an untraceable summary.
