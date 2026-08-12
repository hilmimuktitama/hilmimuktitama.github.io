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
timeline inputs into structured artifacts that Truth Tools can review without
losing their source references or visible uncertainty.

The public implementation is a local MCP server, but the point is review
discipline. PRD snippets, Jira notes, CSV exports, launch checklists, and
status updates can disagree on dates, owners, dependencies, and assumptions.

## What it contributes

- Turned messy planning inputs into structured timeline artifacts for review.
- Preserved source references instead of flattening context into a confident summary.
- Flagged missing dates, owners, dependency issues, and sequencing problems.
- Produced Mermaid and Markdown outputs after validation, so timelines could move into planning docs and status reports.

## Evidence I can show

- Public repository with install instructions, MCP tool boundaries, examples, and tests.
- Example inputs for PRD snippets, Jira CSV exports, launch checklists, and status updates.
- A narrow project boundary that keeps the tool focused on timeline compilation and validation.

## Why it matters

AI can draft a timeline quickly, but program operators still need to know what
is known, what is missing, and where each planning item came from. Timeline
Truth supplies that planning evidence to a reviewable Truth Suite workflow
instead of relying on a polished rewrite.
