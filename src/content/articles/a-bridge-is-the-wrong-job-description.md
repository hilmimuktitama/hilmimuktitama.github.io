---
title: "A Bridge Is the Wrong Job Description"
description: "Engineers and product managers are expanding toward each other with AI, so what is left for the TPM who used to be the translator? A working theory: the bridge was the wrong job description, and the real job is owning coherence across a faster, partly-agentic delivery system."
pubDate: 2026-08-11T00:00:00+07:00
tags:
  - TPM
  - AI
  - judgment
---

I spent a few weeks convinced that my job was shrinking.

The logic was easy to build. A developer with AI gets faster, and then more product-aware. A product manager with AI gets more technical. The two edges of the delivery org are growing toward each other. The TPM who earned a seat by translating between them now wonders what the translation is worth. Both sides can read the source themselves.

I am a TPM. I felt this one directly. The anxiety is real, and I suspect other TPMs feel the same way.

But the more I worked through it, the more I think I was asking the wrong question. AI did not take my job. The easiest-to-describe part of it shrank. The coordination and judgment that keep a program coherent never depended on reading both sides alone.

## The Four Lanes I Kept Landing On

Every conversation about "TPM in the AI era" eventually reaches a four-item menu:

- **Go deeper technically.** Learn to review code, read architecture, and tell a real risk from a nervous habit. The cost is years of credibility, and the skills AI cheapened first are exactly the mid-level coding tasks.
- **Shift toward product.** Own outcomes instead of process. The cost is a crowded field: product managers are already there, and they have their own AI leverage.
- **Become the neutral third point of view.** Stay close enough to both sides to challenge either one. The cost is that a challenger without deliverables can read as friction.
- **Stay the orchestrator, and use AI to capture the pace of the SDLC.** Keep running the program, but stop chasing the SDLC and start recording it. The cost is that it carries little glamour: it sounds like the same job.

People I respect have picked each lane, and each leads somewhere real. The menu left something out: program work that belongs to no lane, like cross-team sequencing and dependency dates. I kept asking which lane to pick. The choice did nothing for that work.

## What the Evidence Says

The speed half of the story is well documented. DORA reports that 90% of technology professionals use AI at work, and over 80% believe it improved their productivity. [^1] The report also finds higher adoption associated with both increased delivery throughput and increased instability. Thirty percent of developers report little or no trust in AI-generated code. The time saved on generation is moving into verification instead. More generated code means more review burden. The report describes a prototype appearing almost instantly, then requiring more effort in the final stretch than a manual build.

The Stack Overflow survey offers the developer-side view. [^2] 50.6% of professional developers use AI tools daily. Yet the survey's trust numbers are much lower: 46% distrust the accuracy of the output, 33% trust it, and only 3% trust it highly. People are using the tools and not believing the results. For a TPM, that gap is where the work sits. Every AI-produced artifact still needs a review gate. The gate needs a person who knows what the artifact should do.

The famous 2023 Copilot experiment adds an early data point. The treated group completed one controlled HTTP-server task 55.8% faster. [^3] The study was narrow and early. The industry has since learned that task speed and system stability are different things. Reprioritization is a good example: AI makes switching feel cheap, but the realized cost is still real. I wrote about why it [does not disappear just because the decision was reasonable](/articles/reprioritization-has-a-realized-cost/).

## Translation Gets Cheaper

I used to describe my job as standing between engineering and product. That description loses value when both groups can do more of the other's work. An engineer with AI can draft a product brief. A product manager with AI can read a technical design. The role's remaining value sits in the coordination around those outputs.

GitHub Research interviewed 22 advanced AI users about how their work changed. They described themselves as becoming the "creative director of code." Delegation and verification are now the primary work. Three skill layers sit underneath: understanding, directing, verifying. [^4] The sample is small, and I would not generalize from it. It matches what I see in my own programs. The delivery system increasingly runs on agentic tooling.

DORA states the underlying shift plainly: AI separates roles from the tasks that used to define them. [^5] When a role stops being a fixed set of tasks, translation between roles stops being the scarce skill. What remains is the system those roles swim in. Does one team's output arrive as evidence for the next team's plan? That question matters more than role titles.

DORA keeps finding that AI is an amplifier. It improves throughput, often at the cost of stability when the foundations are weak. [^6] Strong review practices and shared context absorb that speed into the system. In a struggling one, the speed lands as rework and review backlogs instead. Plans change faster than anyone accounts for their cost.

## Owning Coherence

Translation was the visible part of the job. The durable part is coherence. It means keeping intent, evidence, and review gates aligned across streams that move at different speeds.

Someone has to own the system-level properties that no individual role covers:

- **Intent.** What the program is for, and when that changed.
- **Evidence.** What we know, what we assume, and what nobody checked yet.
- **Verification.** What passed a review gate, and what did not.
- **Tradeoffs.** What a faster path costs downstream.
- **Cross-system effects.** How one stream's change moves another stream's dates.
- **Program memory.** The context that survives the pace.

AI accelerates every item on the list: evidence arrives faster, plans change faster, and review queues fill faster. Someone still has to own the list itself.

The practical work is less glamorous than the identity crisis. I have been writing about the mechanical parts. Meeting notes become [program memory we can retrieve, trust, and reuse](/articles/turning-meeting-notes-into-program-memory/). A [deterministic linter](/articles/a-deterministic-linter-for-my-ai-second-brain/) catches silent agent edits before review. Use AI to capture and verify the system. Keep the judgment with the person who signs off on the gate.

The discipline shows up in small habits as well. When a summary is one click away, I [read the whole thing](/articles/read-the-whole-thing/). The useful part sits one paragraph past the summary.

## Where I Have Landed

Let me be careful about what I am not claiming. I do not have evidence that companies are eliminating TPM roles, and I will not argue that from headlines. Some companies still need the classic orchestrator. If yours is one of them, that lane stays open: use AI to capture a faster-moving SDLC instead of chasing it.

My claim is narrower. The identity crisis is real because the job description was too small: it ended at the translator seat and ignored the coherence work around it. Engineers are becoming orchestrators while product managers are becoming more technical. The program still needs an owner for its intent, evidence, review gates, and program memory. The streams move faster than any human can track.

Parts of this will age badly. I have been wrong about this role before. I started from the fear that AI would dissolve the role as a thin coordination layer. After mapping the work, I found more coordination, judgment, and review gates than the title suggested.

[^1]: DORA, "[Balancing AI tensions: Moving from AI adoption to effective SDLC use](https://dora.dev/insights/balancing-ai-tensions/)", March 10, 2026.

[^2]: Stack Overflow, "[Developer Survey 2025, AI section](https://survey.stackoverflow.co/2025/ai)", July 2025.

[^3]: Sida Peng et al., "[The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590)", arXiv, February 2023.

[^4]: Eirini Kalliamvakou, GitHub Research, "[The new identity of a developer: What changes and what doesn't in the AI era](https://github.blog/news-insights/octoverse/the-new-identity-of-a-developer-what-changes-and-what-doesnt-in-the-ai-era/)", December 8, 2025.

[^5]: DORA, "[Understanding builder intent in the AI era](https://dora.dev/insights/builder-mindset/)", October 17, 2025.

[^6]: DORA, "[DORA 2025: Year in review](https://dora.dev/insights/dora-2025-year-in-review/)" (January 7, 2026) and the [DORA 2025 landing page](https://cloud.google.com/dora) (September 2025).
