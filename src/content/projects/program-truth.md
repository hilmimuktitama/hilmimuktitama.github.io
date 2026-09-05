---
title: "Program Truth"
description: "A small part of Truth Tools that turns project evidence into a structured status draft while keeping blockers and unknowns visible."
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
  myRole: "I focused this piece on separating the project evidence from the status story."
  whatChanged: "The draft separates facts, assumptions, blockers, owners, dates, and open questions while keeping their sources attached."
  evidenceAvailable: "A public repository with prompts, sanitized examples, setup checks, and a repeatable workflow."
---

## Context

Program Truth is the piece that turns project evidence into a status draft. It
emits a canonical `StatusArtifact` v2 directly for Truth Tools. The file carries
a supplied explicit health assessment, active signals, and claims that someone
has reviewed. It keeps the evidence separate from the final status story and
does not verify whether a claim is true.

I made it for a familiar mismatch: a parent ticket says one thing while the
task-level evidence says something messier. A clean summary can make work look
green even when a blocker is still open.

## What changed

- The draft separates facts, assumptions, blockers, owners, dates, and open
  questions.
- Each part can keep a link back to its source instead of relying on memory or
  a meeting recap.
- The parent-ticket summary is treated as something to review, not the final
  answer.
- The public examples show the shape of the work without including private
  project details.
- Setup notes point to available Jira and Confluence connectors, but the project
  bundles no connectors.
- Program Truth passes the explicit health assessment and active signals to the
  next review step. It does not perform deterministic validation itself.

## Evidence I can show

- A public repository with prompts and setup notes.
- Sanitized examples that keep blockers, owners, and decisions separate before
  a report is written.
- An npm installer and a small setup check.
- A workflow that can be adapted to projects using Jira and Confluence.

## Why I made it

I wanted the draft to show its uncertainty before it became a polished status
update. Truth Tools can compare the supplied explicit health assessment with
the active signals and claim floor. Program Truth prepares the file; it does
not decide whether the program is healthy or whether the result led to a better
outcome.
