---
title: "Timeline Truth"
description: "The planning component for Truth Tools: turns rough timeline inputs into reviewable artifacts with drift, gaps, assumptions, and source references visible."
source: "github"
status: "public"
repoUrl: "https://github.com/hilmimuktitama/timeline-truth"
language: "JavaScript"
updatedDate: 2026-08-11
featured: false
order: 20
tags:
  - TPM
  - MCP
  - planning
  - timeline
---

## Component role

Timeline Truth is the planning component in the Truth Suite. It turns rough
timeline inputs into structured planning artifacts that an operator or agent
may use when assembling a `StatusArtifact` for Truth Tools, without losing
source references or visible uncertainty. It prepares and checks planning
evidence; it does not assemble a `StatusArtifact` itself, prove semantic
source support, or compute a critical path.

The public implementation is a local MCP server that parses inputs locally,
but the point is review discipline. PRD snippets, Jira notes, CSV exports,
launch checklists, and status updates can disagree on dates, owners,
dependencies, and assumptions.

## What it contributes

- Turned messy planning inputs into structured timeline artifacts for review.
- Preserved locator-only source references instead of flattening context into a confident summary; the canonical handoff contains locators, not excerpts.
- Flagged missing dates, owners, dependency references, and sequencing problems; it did not compute a critical path.
- Produced Mermaid and Markdown planning outputs after local parsing and checks, and can surface baseline/current schedule drift.

## Evidence I can show

- Public repository with install instructions, MCP tool boundaries, examples, and tests.
- Example inputs for PRD snippets, Jira CSV exports, launch checklists, and status updates.
- A narrow project boundary that keeps the tool focused on timeline compilation and validation.

## Why it matters

AI can draft a timeline quickly, but program operators still need to know what
is known, what is missing, and where each planning item came from. Timeline
Truth supplies provenance-preserving planning inputs that an operator or agent
may hand off to a canonical `StatusArtifact` for review by Truth Tools,
instead of relying on a polished rewrite. That handoff is locator-only and
contains no excerpts. Its local checks make gaps, assumptions, and detectable
baseline/current schedule drift visible; they do not prove that the timeline is true or that a source
supports its interpretation.
