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

Capture Truth is the intake component in the Truth Suite. It handles the step
before Truth Tools review: preserving what was captured, where it came from,
and whether the source material is complete enough to trust downstream.

It turns pasted text, local files, CSV or JSON exports, and read-only adapter outputs into a neutral `evidence_pack` with source snapshots, extracted claims, source references, freshness metadata, validation gaps, unresolved conflicts, and portable renders.

## What changed — component contribution

- Makes evidence intake a separate workflow instead of mixing capture with
  status, risk, or timeline judgment.
- Preserved source identity, capture time, freshness, and source references before handing material to downstream workflows.
- Added validation for missing source refs, missing capture metadata, stale sources, duplicate ids, and unresolved conflicts.
- Supported safe render profiles so repo artifacts can omit raw source bodies while keeping reviewable evidence structure.

## Evidence I can show

- Public repository with CLI commands, MCP tool boundaries, install notes, and development checks.
- Read-only compact intake helpers for Jira and Confluence-shaped evidence.
- Benchmark fixture covering stale sources, source conflicts, repo-safe export, redaction checks, and compact adapters.

## Why it matters

Program workflows can only be as reliable as the material they start from.
Capture Truth keeps intake narrow and explicit, so Truth Tools receives a
reviewable artifact instead of an untraceable summary.
