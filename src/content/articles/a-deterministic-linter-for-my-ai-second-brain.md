---
title: "A Deterministic Linter for My AI Second Brain"
description: "How a small deterministic linter helps me keep an AI-assisted notes repository from quietly losing its structure."
pubDate: 2026-07-17T00:00:00+07:00
tags:
  - AI
  - workflow
  - tools
  - git
---

I keep my notes where my code lives now. Not because I love Git, but because the AI I work with understands files, diffs, and directories better than it understands my personal hierarchy of folders. The repository is now the container for what I am thinking about. Drafts, tasks, references, snippets, and the prompts that generated them all live there.

That convenience has a cost.

The same model that can reorganize a hundred notes in one pass can also quietly rename a file and leave every internal link pointing at a ghost. It can invent a tag, duplicate an ID, or flatten a date into a format the static site no longer parses. These are not creative failures. They are structural failures, and they slip past a summary because the summary is written in prose.

A bigger model will not fix this. A deterministic linter will.

## The repository is the workspace, not just storage

The cleanest public example of this arrangement is Andrej Karpathy's `autoresearch` repository. Its README describes a clear split: the human edits `program.md`, and the agent edits `train.py`.[^1] The repo keeps the prompt, the code, and the results together. It is a research project, not a notes project. The shape is the same: the Git repository is the shared workspace between a person and an autonomous agent.

I am doing something far smaller. My repo holds Markdown articles, task lists, reference notes, and an index that ties them together. I ask the model to draft a new piece. I ask it to link the piece to related notes, update the index, and move a task from *todo* to *done*. The model is good at the interpretive parts: choosing the right angle, summarizing a source, finding connections I missed.

It is worse at the bookkeeping.

That is fine. Bookkeeping is not what I hired it for. The problem is that without a check, the bookkeeping errors pile up until I discover them as a broken build, a missing backlink, or a task that says it is finished but never left the inbox.

## What a tiny linter checks

A deterministic linter does not understand meaning. It checks invariants. It is the boring clerk who reads the form, not the poet who wrote it.

> The model proposes. The linter checks.

I am sketching a small linter here, not deploying a framework. It could be a short Node script run from an npm command or a Git pre-commit hook. The rules below are the ones I would want for a repository second brain like mine. They check the mistakes an agent is most likely to make when it edits in bulk:

- Every Markdown article has the required frontmatter: `title`, `description`, `pubDate`, and `tags`.
- `pubDate` parses as a valid ISO 8601 date.
- Filenames are kebab-case and match the article slug implied by the file path.
- Internal links such as `[another note](./another-note.md)` resolve to files that exist.
- Task states move only `todo -> in-progress -> done`; skipping is an error.
- Tags mentioned in an index have at least one note that uses them.
- No note is placed outside the allowed directories.

These rules are not guesses about quality. They are machine-checkable contracts. If a rule passes, I do not have to think about it. If it fails, I get an error message that points at a file and a line, not a vague sense that something feels off.

A compact slice of the rule output looks like this:

```text
articles/ai-notes.md:12  pubDate must be a valid ISO 8601 date
articles/ai-notes.md:34  link target "./future-of-work.md" does not exist
tasks/q3-review.md:7     invalid state transition: todo -> done
tags.yml:23              tag "decision-log" is unused by any note
```

Each line is actionable. Each line is also a class of mistake the model made confidently while I was not watching.

## The division of labor

This is the part that took me a while to accept.

I used to think the answer to a broken agent output was a better prompt. More constraints in the system message, more examples, more "think step by step." That helps with reasoning, but it does not help with consistency. An LLM can follow a rule ninety-nine times and interpret it differently on the hundredth, especially after a context window fills or a tool schema changes. Anthropic's agent guidance puts this clearly: agents need ground truth from the environment at each step, and clear tool documentation and guardrails matter more than clever prompt engineering.[^2]

A linter is ground truth from the environment.

The model still does the generative work. It proposes a new article, rewrites a stale paragraph, or cross-links related ideas. The linter checks whether the result satisfies the invariants. When it fails, the model gets a precise error and tries again, the same way a compiler tells a programmer where the syntax broke. The loop is not human-in-the-middle for every file; it is human-nearby while the deterministic check enforces the contract.

This is also why I prefer a small, custom linter over a heavy framework. I do not need a general-purpose semantic validator. I need the exact rules that keep *my* repo coherent. A script of a few hundred lines, run from a Git `pre-commit` hook, is enough.[^3]

## Declaring constraints instead of hoping

Most of the linter's rules are expressed as schemas and path checks rather than hand-written imperative code. Frontmatter is validated against a JSON Schema that says `pubDate` is a string matching a datetime pattern, `tags` is an array of non-empty strings, and `title` is required.[^4] The schema is the contract; the validator reports where the instance breaks it.

That declarative style matters because the contract is readable by both me and the agent. I can show the schema to the model as part of its context. It knows the shape of a valid note before it writes one. When it still gets it wrong, the validator gives us both the same error.

For task states and link targets, plain scripts are clearer than schemas. The important thing is not the technology; it is that the rule is deterministic, local, and fast. A linter that runs in under a second can be part of every commit. A linter that calls an API or runs a model would be another source of nondeterminism, which defeats the point.

## Why not just trust the diff?

I review the diffs. I recommend reviewing the diffs. But a diff shows what changed, not what broke. A renamed file looks like a tidy refactor until you notice three broken references two weeks later. A malformed date looks like a harmless edit until the site fails to build on publish.

The linter turns these latent fractures into immediate failures. It does not replace my judgment; it removes the boring judgment calls so I can spend my attention on the ones that matter. I still decide whether the model's new article is worth keeping. I do not have to decide whether its frontmatter is well-formed.

OpenAI's evals documentation makes a related point: if you want to improve a system, measure something concrete first.[^5] A linter is a tiny eval that runs on every commit. It does not grade creativity or insight. It grades whether the repository still satisfies the invariants I claimed it had.

## The real second brain is the contract

The phrase "second brain" gets used loosely. I am not claiming Karpathy invented it, and I am not claiming a Git repo is the only valid shape. I am claiming that once you let an agent write inside your knowledge base, the repository needs rules as much as it needs ideas.

Those rules should be small, explicit, and deterministic. They should fail loudly. They should produce error messages a model can read and act on. They should not be another prompt; they should be a check.

AI handles the generative drift. The linter handles the structural drift. Together they keep the second brain from turning into a beautifully written mess.

[^1]: Andrej Karpathy, `autoresearch` repository README, accessed July 2026. The README describes `program.md` as the human-edited agent instructions, `train.py` as the agent-edited training code, and the repo as the shared workspace for autonomous experiments. https://github.com/karpathy/autoresearch

[^2]: Anthropic, "Building effective agents," December 19, 2024. The post emphasizes environmental ground truth, clear tool interfaces, and guardrails in agent loops. https://www.anthropic.com/research/building-effective-agents

[^3]: Git project documentation, "Customizing Git - Git Hooks," accessed July 2026. Client-side hooks such as `pre-commit` can inspect the snapshot and abort the commit when checks fail. https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

[^4]: JSON Schema, "What is JSON Schema?," accessed July 2026. JSON Schema is described as a declarative language for defining structure and constraints, with validators that check conformance. https://json-schema.org/overview/what-is-jsonschema

[^5]: OpenAI Platform documentation, "Working with evals," accessed July 2026. The guide describes using evals and graders to measure model outputs against concrete criteria. https://platform.openai.com/docs/guides/evals
