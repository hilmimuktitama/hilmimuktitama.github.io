---
title: "AI Is Non-Deterministic"
description: "A personal essay on why AI output changes, why that matters for builders and TPMs, and how to work with uncertainty instead of pretending it is a bug."
pubDate: 2026-05-19
tags:
  - AI
  - building
  - judgment
---

People keep asking AI for certainty.

I understand why. Software has trained us to expect repeatability. If we put the same input into the same system, we expect the same output. A function returns `0` or `1`. A test passes or fails. A deployment succeeds or breaks. A database query returns the rows that match the condition.

That habit is useful. It is also incomplete.

AI does not behave like a normal deterministic function. Ask the same question twice and it may answer differently. Ask it again with one extra sentence of context and it may change the structure, the emphasis, the examples, or the conclusion. Sometimes the second answer is better. Sometimes it is worse. Sometimes it is just different.

That makes people nervous because different feels like unreliable.

But different is not automatically wrong.

> Non-determinism is not a bug by itself; it is a property you have to design around.

The mistake is treating AI like a calculator while asking it to do judgment-shaped work.

## The Software-Shaped Expectation

Most builders inherit a binary instinct.

We want the system to resolve into `0 or 1`. Valid or invalid. Done or not done. Approved or rejected. Green or red. The habit is especially strong when we work around code, tickets, deployments, reporting, and automated checks.

That instinct protects us from sloppy systems. It gives us tests, schemas, contracts, alerts, and release discipline. I do not want to lose it.

But AI often enters before the work has become binary.

It helps when the requirement is still vague. It helps when the status update is scattered across notes, tickets, and memory. It helps when the first version of code exists but nobody has fully reviewed the consequences. It helps when the question itself is not yet sharp enough.

Those are not `0 or 1` moments. They are interpretation moments.

If we expect deterministic behavior there, we start calling the wrong thing failure. The model gave two different drafts, so we say it is inconsistent. The model suggested another implementation path, so we say it changed its mind. The model rewrote the summary with different emphasis, so we say it cannot be trusted.

Sometimes that is true. Sometimes the output is bad.

But sometimes the variation is exactly the signal: there are multiple plausible ways to read the input.

## Where It Matters

Non-determinism is harmless when the stakes are low.

It does not matter much if AI gives me three different titles for a personal note. It matters more when the answer becomes part of execution.

Requirements are one risk area. If the source material is ambiguous, AI can produce a clean requirement that sounds more settled than the team actually is. A polished sentence can hide an unresolved decision.

Program status is another. AI can summarize scattered updates into a confident narrative, but confidence in tone is not confidence in truth. A status report needs evidence, dates, owners, and caveats. Otherwise the summary becomes theater.

Code changes carry their own risk. AI may produce a working patch that passes the obvious case while missing the contract around it. It may optimize for the local prompt instead of the larger system. It may remove friction that was there for a reason.

Factual claims are dangerous because fluent writing feels like knowledge. A model can state something with the same rhythm whether it is grounded, outdated, incomplete, or invented.

Downstream decisions are where the risk compounds. One unchecked AI summary can shape prioritization. One vague requirement can become engineering work. One assumed fact can enter a roadmap, a customer message, or an escalation thread.

That is the part I care about in real work. A model can turn messy meeting notes into a clean program update, but the update still needs ticket links, dates, owners, and caveats before it becomes execution context.

That is why I do not treat variation as the failure. In a program update, the failure is sending the AI-compressed summary before I have checked the ticket links, dates, owners, and caveats that make it true enough to act on.

## Use It Like A Collaborator

The better posture is to treat AI as a collaborator that can move quickly through ambiguity.

That means I do not ask it to be certain when I have not supplied enough ground for certainty. I ask it to expose options, name assumptions, compare tradeoffs, and make uncertainty visible.

For builders, this changes the workflow. The first answer is not the artifact. It is a candidate. The second answer may reveal another path. The third may expose a missing constraint. The value is not only in receiving output. The value is in seeing the problem from more than one angle before committing.

For TPMs, this matters even more. A TPM often works in the space between incomplete signals: Jira tickets, Slack threads, meeting notes, release plans, QA windows, dependencies, and the version of reality each team is carrying. AI can help compress that mess into structure, but the TPM still owns the synthesis.

That ownership cannot be delegated.

The person using the tool has to decide what is evidence, what is inference, what is still unknown, and what should not be said yet.

## Constrain The Work

The answer is not to avoid AI because it can vary.

The answer is to constrain the work enough that variation becomes useful instead of dangerous.

Start with the input. Give the model the actual context, not just the feeling of the problem. Include the goal, the audience, the source material, the constraints, and the decision you are trying to support.

Preserve context. Do not make the model reconstruct program history from memory if the repo, note, ticket, or decision log already exists. Bring the relevant material into the task and keep the important assumptions attached to the output.

Verify the output. Check claims against source material. Run tests. Read the diff. Compare dates. Confirm owners. Separate facts from interpretation. Ask what would have to be true for the answer to be valid.

Then own the final claim.

That last part is the operating habit I keep coming back to. AI can draft, compare, rewrite, summarize, inspect, and suggest. In my own writing and TPM work, I use it to turn source notes into candidate structure while keeping files, decisions, and unresolved questions beside the draft. It can make the blank page less blank and the messy middle less slow.

But once I publish the article, send the status update, merge the code, or make the recommendation, the claim is mine.

Non-determinism does not remove responsibility.

It makes responsibility more visible.
