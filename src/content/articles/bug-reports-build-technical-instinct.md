---
title: "Bug Reports Build Technical Instinct"
description: "A personal essay on how TPMs, PMs, and other non-engineering roles can build better technical judgment by capturing bugs with context, evidence, and lightweight debugging habits."
pubDate: 2026-06-01T00:00:00+07:00
tags:
  - TPM
  - product
  - debugging
---

Non-technical roles should learn how bugs behave. Not because every TPM, PM, analyst, designer, or operator needs to become an engineer. That is not the point. The point is simpler: if you work close to software, your value increases when you can observe the system with more precision.

A lot of technical instinct starts there. It does not start with architecture diagrams, or with knowing every service, database table, queue, cache, or deployment pipeline. Those things matter, but they can come later. It often starts with noticing that something is wrong and describing it well enough that another person can move faster.

> A useful bug report is not a complaint. It is preserved debugging context.

That sounds small. It is not.

## Start With The Shape Of The Bug

The weakest bug report says, "This is broken." Sometimes that is all someone has time to say. Production is burning. A customer is blocked. A flow is failing and everyone needs to know quickly. There is nothing wrong with raising the alarm.

But if that is where the report stops, the technical team still has to reconstruct the scene:

- What did you click?
- Which account was used?
- Was it a new session or an old one?
- Did it happen after refresh?
- Did it happen only after approval, payment, upload, login, export, sync, or retry?
- Did it happen in the morning, after a release, after data migration, or after a permission change?

Those details feel boring until they save an engineer thirty minutes.

The better habit is to describe the shape of the bug:

- "This happens after I submit the form, refresh the page, then open the same record again."
- "This happens only on my account. I asked another teammate to try and their account works."
- "This started around 09:30 Jakarta time, after the scheduled maintenance window."
- "The value appears correctly on the details page, but not on the list page."
- "The error disappears after logout and login, but returns after I switch workspace."

None of that requires deep technical knowledge. It requires attention.

## Evidence Is A Team Gift

Bug capture is one of the easiest ways for non-engineering roles to give real value to an engineering team. Not by assigning blame, saying "this should be easy," or turning every observation into urgency.

**The value is in reducing ambiguity.**

When a TPM reports a bug with steps, screenshots, timestamps, affected account, expected behavior, actual behavior, and whether the issue is repeatable, they are not just forwarding a problem. They are packaging evidence.

That evidence changes the conversation.

Instead of asking whether the bug is real, the team can ask where it is likely coming from. Instead of spending the first part of triage reproducing the issue blindly, they can test a smaller set of conditions. Instead of debating whether this is a frontend issue, backend issue, permission issue, stale data issue, or environment issue, they have clues.

Good bug capture respects engineering time. It also improves product judgment.

The more bugs you describe carefully, the more patterns you start to see. You notice which flows are fragile. You notice which user roles behave differently. You notice when a problem smells like cached state, missing permission, bad payload, validation mismatch, or inconsistent data.

At first those are guesses. That is fine. Technical instinct is often a better guess, earned through repeated observation.

## Learn Just Enough Of The System

There is a practical expectation that feels more reasonable now than it did a few years ago: if you work around a product, you should understand its high-level system shape. You do not need to know everything, but you should know enough to ask better questions.

- Is the product web-based?
- Does the frontend call REST APIs?
- Is there a separate backend service?
- Does the page read from one endpoint and submit to another?
- Are there roles, sessions, workspaces, or organizations that change what data a user can see?
- Is the product event-driven in some parts?
- Does data appear immediately, or does it depend on an async job?

Before, learning this could feel expensive. You had to ask an engineer, wait for a diagram, read old docs, or piece together context from tickets.

Now you can ask AI to help you build a mental model:

- "Explain how a typical web app frontend talks to a backend API."
- "What could cause one user to see data that another user cannot?"
- "What is the difference between the API returning wrong data and the UI rendering the right data incorrectly?"
- "If a page works after refresh but not after navigation, what categories of issues should I consider?"

The answer will not always match your actual system. But it gives you vocabulary, and vocabulary matters because it lets you have a better conversation with the people who do know the system.

## Use The Browser Like A Notebook

For web-based products, the browser already gives you a small debugging surface. You do not have to become a frontend engineer to use it.

Open the browser's developer tools. Look at the Console. Look at the Network tab. Repeat the action that triggers the bug. You are not trying to fix the code. You are trying to capture better evidence.

If the Console shows an error after you click submit, copy the error message. If the Network tab shows a failed request, note the endpoint, status code, and timing. If an API response returns the right value but the page shows the wrong one, that is a different clue from an API response that already contains the wrong value.

That distinction is useful:

- "The backend returned `status: approved`, but the UI still shows Pending."
- "The request to `/api/orders/123` returned 500 after I changed the filter."
- "The payload includes the new email, but the profile header still shows the old email."
- "The request succeeds on workspace A and fails with 403 on workspace B."

These are not final diagnoses. They are sharper observations.

Sometimes you will be wrong. You may think the issue is frontend rendering, but the engineer may find a backend caching problem. You may think the endpoint is failing, but the real problem is an expired session. That is normal.

The goal is not to be correct every time. The goal is to make the next investigation cheaper.

## The Point Is Not To Become The Engineer

There is a bad version of this habit. It happens when non-engineering roles overreach. They see one console error and declare root cause. They inspect one request and tell the engineer exactly what to change. They learn a few technical words and start using them as authority.

That does not help.

The useful version is quieter:

- "Here is what I observed."
- "Here is how I reproduced it."
- "Here is the account, timestamp, request, response, screenshot, and the behavior I expected."
- "This may be frontend rendering because the response looks correct, but please verify."

That last part matters. Good technical instinct does not remove humility. It needs humility because software has layers, and most bugs are more specific than they look from the outside.

But humility is not the same as helplessness.

A TPM can preserve context. A PM can identify impact. A designer can notice inconsistent state. A support person can capture account conditions. An operator can spot timing patterns. A QA can turn all of that into a repeatable scenario.

Each role can help the system become easier to debug. That is real value.

## A Small Practice

The next time you see a bug, try not to stop at "this is broken." Capture the scene:

- What did you do before it happened?
- What changed?
- Who was affected?
- Which account, browser, and workspace were involved?
- What time did it happen?
- Could you repeat it?
- Did refresh or logout change anything?
- Did another user see the same issue?

If it is a web app, open developer tools once. Check whether the console says anything useful. Check whether a network request failed. Check whether the response looks different from what the screen shows.

Then share the report with humility. Not as a verdict. As evidence.

Over time, this changes how you see software. You stop treating bugs as random interruptions. You start seeing them as signals from a system with shape, state, boundaries, and failure modes.

That is where technical instinct begins.
