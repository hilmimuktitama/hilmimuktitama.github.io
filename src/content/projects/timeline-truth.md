---
title: "Timeline Truth"
description: "A small experiment in turning rough planning notes into a timeline that keeps gaps, assumptions, and source references visible."
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
kind: "component"
glance:
  problem: "Planning inputs can disagree on dates, owners, dependencies, and assumptions."
  myRole: "I kept this focused on compiling and checking timelines rather than trying to solve every planning problem."
  whatChanged: "The output keeps source references and uncertainty alongside the timeline."
  evidenceAvailable: "A public repository with install notes, examples, tests, and representative inputs."
---

## Context

Timeline Truth is a small planning tool for notes that do not quite agree. It
takes PRD snippets, Jira notes, CSV exports, launch checklists, and status
updates, then puts their dates and dependencies into one draft timeline.

The public version is a local MCP server that parses inputs locally. It keeps
the source reference and uncertainty beside each item. It does not assemble a `StatusArtifact` itself,
decide whether a source is correct, or calculate a critical path.

## What changed

- Rough planning notes become a structured timeline that is easier to check.
- The handoff keeps locator-only references—locators, no excerpts—rather than
  rewriting every source into one confident summary.
- Missing dates, owners, dependency references, and sequencing problems remain
  visible. The tool did not compute a critical path.
- It can produce Mermaid and Markdown and point out drift, including detectable baseline/current schedule drift.

## Evidence I can show

- A public repository with install instructions, MCP boundaries, examples, and
  tests.
- Sample PRD snippets, Jira CSV exports, launch checklists, and status updates.
- A deliberately narrow scope: compiling and checking a timeline, not making
  the planning decision.

## Why I made it

AI can make a tidy timeline quickly. I still want to see what is missing and
where each date came from. Timeline Truth keeps that information in the draft
instead of hiding it in a polished rewrite. Its checks can point out gaps,
assumptions, and schedule drift; they cannot tell me whether the plan is true.
