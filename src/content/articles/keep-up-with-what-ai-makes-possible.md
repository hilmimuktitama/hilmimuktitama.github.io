---
title: "Keep Up With What AI Makes Possible"
description: "How TPMs can filter AI news, discover new uses, and decide when a better model or lower price makes a workflow worth trying."
pubDate: 2026-09-23T00:00:00+07:00
tags:
  - TPM
  - AI
  - workflow
  - judgment
---

A model release is useful news when it changes what I can do. Sometimes it removes the reason an old attempt failed. Sometimes it suggests work I had never thought to try. I want to keep up well enough to recognize both.

September has offered several reasons to pay attention. TypeSafe introduced Jev on September 15. Anthropic released Opus 5.5 on September 22. OpenAI released GPT-6 Sol and Luna the same day.[^1][^2][^3] These releases raise different possibilities: putting small judgments inside software, investigating delivery claims in code, or making repeated checks affordable.

AI is also helping produce further improvements. OpenAI reports that its researchers are contributing code faster and running more experiments as agent use increases. It also identifies compute growth and remaining bottlenecks.[^4] That is evidence from one organization, with limits. It gives me a reason to keep old assessments dated, while checking each new release against the work I actually need to do.

For a TPM, there is plenty of that work: preparing reviews, checking whether a deliverable meets its agreed requirements, finding dependencies, and getting owners to resolve uncertainty. We see where the same effort repeats across teams and where a missing technical detail can change the plan. That puts us in a useful position to spot an opportunity, even when the program itself ships no AI feature.

## Give the news a job

I would start with a weekly half-hour for reading and choosing what deserves a trial. Testing needs its own time. Follow the release notes, documentation, and pricing for tools you can use. Practitioner demos can reveal ideas, especially when they show inputs and failures. Before acting, open the original source and check access conditions.

Read with two questions in mind. **Which old constraint changed?** Keep a short record of failed attempts: the summarizer lost unresolved blockers; the comparison invented owners; connecting the data took too much effort. Those failures need different improvements. A larger context window does little for a workflow whose problem is missing permission to read the source.

Then ask **what could I do differently now?** Look at what the tool can read, return, connect to, or run cheaply. Jev suggests asking small questions about every update. A stronger coding agent could help trace a dependency through an unfamiliar repository. A connector might make a comparison practical because the source material can finally be retrieved. These ideas need no previous failed attempt. Start from work you understand and sketch where the capability could fit.

Put both kinds of opportunity on the same short list. Changes affecting a tool already in use, such as a retirement, need prompt attention. For optional trials, prioritize work where a small test could save recurring effort or resolve a consequential uncertainty. Finding an integration risk before teams commit can justify a trial even if it saves no preparation time. An impressive release with no connection to current work can wait.

AI can help prepare this reading. Ask for the primary link, release date, relevant change, and unresolved questions for each item. I would still check the source before committing time. The useful output of the half-hour is one decision about what to try, retry, or leave alone.

<figure class="ai-news-figure" aria-labelledby="ai-opportunities-title">
<figcaption id="ai-opportunities-title"><strong>What changed, and what could it unlock?</strong><span>A preview of the three opportunities below. Each still needs a trial.</span></figcaption>
<table class="ai-news-opportunities">
<thead><tr><th scope="col">Release signal</th><th scope="col">A useful TPM trial</th></tr></thead>
<tbody>
<tr><th scope="row">Small, typed decisions<span>Jev</span></th><td>Sort updates by whether they report a blocker.<span><strong>Check:</strong> missed blockers and preparation time, including corrections.</span></td></tr>
<tr><th scope="row">Stronger reasoning in code<span>Opus 5.5 / GPT-6 Sol</span></th><td>Trace a deliverable through code and tests to find integration dependencies.<span><strong>Check:</strong> code paths, revisions, and test evidence with the engineering owners.</span></td></tr>
<tr><th scope="row">Lower API prices<span>A change in cost</span></th><td>Compare more program records within a fixed token budget.<span><strong>Check:</strong> the bill for the intended workload, plus quality and human review effort.</span></td></tr>
</tbody>
</table>
</figure>

## Follow one opportunity into the work

Consider a hypothetical program where a TPM reads 250 short updates before a weekly dependency review. Assume preparation takes an hour. A previous AI summary dropped unresolved blockers, so checking it required rereading everything. That version saved little effort. These are assumptions for a worked example, not results from a program I have measured.

Jev offers a different approach to examine. TypeSafe calls it a System One model: it takes context and narrow questions, then returns typed answers such as choices or scores.[^5] Its announced input price is $0.042 per million tokens, with no output-token charge.[^1] Classification already existed. The attraction here is a cheap, bounded judgment that a small script can use repeatedly.

Instead of asking for a summary of the program, ask whether each update reports work blocked by another team. Return one of three categories: blocker stated, no blocker stated, or needs clarification. Show likely blockers and unclear cases first, with the original text and source links intact. The TPM still reads the evidence; the tool helps organize that reading.

Three invented updates make the expected behavior concrete. These are desired classifications, not outputs from a Jev test:

| Update | Expected handling |
| --- | --- |
| “Integration testing cannot start until Platform enables tenant permissions.” | Flag a stated blocker. The consuming team is waiting on Platform. |
| “Platform enabled tenant permissions; integration testing has started.” | No blocker is stated in this update. It says the earlier condition was met; it does not establish overall launch readiness. |
| “Waiting on Platform.” | Request clarification. The update does not say what is needed or what work cannot proceed. |

That middle case matters. A keyword search for “tenant permissions” finds both the blocker and its resolution. The judgment we want is whether the condition remains open. A valid category can still be the wrong answer, so type safety alone does not settle this.

A coding assistant could help build the script that calls Jev.[^6] Start with an approved export before wiring up a live integration. Jev supplies the judgment; retrieval, scheduling, and maintenance still need someone to own them. Its documented weaknesses include date comparisons and distracting context.[^7] Send the relevant update and definitions, and keep deadline arithmetic in code.

## Write down what would make the trial useful

A small record is enough to turn that idea into work. For this hypothetical classifier, I would fill it in before tuning the prompts:

- **Task and baseline:** prepare the dependency review from 250 updates; assumed manual preparation time is 60 minutes.
- **Proposed change:** prioritize stated blockers and unclear updates while retaining the original sources.
- **First test:** use an approved past review's updates, labeled by a person before running the classifier. Include resolved blockers, missing context, and cases beyond the three examples above. Hold some cases back for a final check after prompt changes.
- **Useful result:** preparation takes at most 40 minutes, including corrections and checks of unflagged updates. No known blocker in the labeled set disappears from the review queue. Unclear cases remain visible.
- **Time budget:** spend at most two hours on the initial offline trial. If access or setup consumes that time, record it as the remaining obstacle.
- **Next decision:** a pass earns two review cycles alongside the existing process. Routine use needs consistent results and an agreed maintainer.

These numbers are illustrative. If preparation took 35 minutes and every known blocker remained visible, the tool would qualify for the limited live trial. At 25 minutes with a missed blocker, it would fail. Inspect the miss and revise the question within the time budget, or shelve the tool with the failure recorded.

During the live trial, inspect some unflagged updates too. A clean shortlist can hide omissions. The TPM owns the preparation workflow; the relevant engineering owners still confirm dependencies and commitments. Before other people rely on the script, agree who fixes it when the integration breaks.

## Stronger models can take the review into code

A dependency review can go deeper than the updates. **Does the code support what the team says is ready?** Frontier reasoning models, working through coding agents with access to the relevant repositories and test tools, give a TPM a way to investigate that question. This includes validating deliverables against acceptance criteria and finding risks or dependencies that the status report never mentioned.

Anthropic reports improvements in codebase audits with Opus 5.5; OpenAI reports stronger performance on repository-based coding tasks with GPT-6 Sol.[^2][^3] There is also a useful earlier example. In an April postmortem, Anthropic reported that Opus 4.7 found a bug during a retrospective review, given the necessary repositories, while Opus 4.6 missed it.[^9] One case establishes no general success rate. It shows why model capability and access to the right code both belong in the assessment.

Extend our hypothetical program. Platform marks tenant permissions complete. The TPM asks an agent to trace the agreed integration behavior through the service, consuming client, and tests. The diagram shows a possible mismatch that reading the completion update alone would miss.

<figure class="ai-news-figure" aria-labelledby="integration-gap-title">
<figcaption id="integration-gap-title"><strong>What separate tests can miss</strong><span>A hypothetical tenant-permission integration. Both suites could pass while the connection remains untested.</span></figcaption>
<div class="ai-news-integration">
<div class="ai-news-component"><span class="ai-news-owner">Consuming team</span><strong>Client omits tenant ID</strong><span class="ai-news-test">Client tests use a mocked service.</span></div>
<div class="ai-news-request"><span aria-hidden="true">→</span><span>Request</span></div>
<div class="ai-news-component"><span class="ai-news-owner">Platform team</span><strong>Service requires tenant ID</strong><span class="ai-news-test">Service tests provide the ID directly.</span></div>
</div>
<p class="ai-news-figure-note"><strong>The missing evidence:</strong> a compatibility test using the client and service versions planned for the release.</p>
</figure>

I would ask for the relevant code paths, reviewed revisions, and test evidence, separating tests merely inspected from tests actually run. Then check which versions are planned for deployment. The missing client change is a candidate cross-team dependency; rolling out an incompatible service first is a risk. It becomes a blocker to the planned integration test when the incompatibility is confirmed for the versions that test will use.

That finding needs a program response. Platform owns the service contract, and the consuming team owns the client change. Their engineering owners confirm the fix, compatibility test, and release sequence. The TPM can investigate the evidence, challenge the completion claim, and make sure the agreed work and dates enter the plan. Engineering approval still belongs to the responsible owners. A code review alone cannot establish behavior in the deployed environment.

Technical investigation already existed in TPM work. Fullstory described TPMs searching codebases and building tools in 2020.[^10] My expectation is that AI assistance will make direct inspection a more routine part of the role where access and technical understanding support it. The change is the effort required to trace a question across unfamiliar code and arrive at a finding others can verify.

A new model release deserves a trial if the earlier assistant missed such connections or required too much correction. Use saved code revisions with known integration problems, plus held-out cases, and check missed dependencies, false alarms, and the effort to verify each finding. The useful result is a better-supported delivery decision. Time saved is one possible benefit.

## A price cut matters when it changes the decision

Cost needs its own threshold too. Suppose the same program considers comparing 1,000 updates against its decision history over four weeks. Assume each check uses 5,000 uncached input tokens and 1,000 billed output tokens. Give this separate experiment a $30 monthly token budget, with human review and setup assessed separately.

OpenAI's launch comparison lists GPT-5.6 Sol's promotional input and output rates at $4 and $20 per million tokens. GPT-6 Sol's standard rates are $2 and $10 for prompts up to 272,000 input tokens.[^3][^8] Under our assumptions, the token bill falls from $40 to $20. That crosses the stated budget and leaves $10 for extra calls. The price change now supplies a concrete reason to retry the idea. Quality and review effort still have to pass their own tests.

<figure class="ai-news-figure" aria-labelledby="token-budget-title">
<figcaption id="token-budget-title"><strong>When a price cut opens room for a trial</strong><span>Calculated token cost for the same illustrative workload over four weeks.</span></figcaption>
<div class="ai-news-budget-key"><span aria-hidden="true"></span>$30 token budget</div>
<dl class="ai-news-costs">
<div class="ai-news-cost-row"><dt>GPT-5.6 Sol <span>Promotional rates</span></dt><dd><strong>$40 · $10 over budget</strong><span class="ai-news-cost-track" aria-hidden="true"><span class="ai-news-cost-bar" style="width: 80%"></span></span></dd></div>
<div class="ai-news-cost-row"><dt>GPT-6 Sol <span>Standard rates</span></dt><dd><strong>$20 · $10 under budget</strong><span class="ai-news-cost-track" aria-hidden="true"><span class="ai-news-cost-bar" style="width: 40%"></span></span></dd></div>
</dl>
<div class="ai-news-cost-axis" aria-hidden="true"><span>$0</span><span>$10</span><span>$20</span><span>$30</span><span>$40</span><span>$50</span></div>
<p class="ai-news-figure-note">1,000 checks × (5,000 uncached input + 1,000 billed output tokens). Excludes setup and human review. Fitting the token budget earns a quality trial; it does not establish that the workflow is useful.</p>
</figure>

Opus 5.5 illustrates why the headline needs reading carefully. Its input and output rates are 20% below Opus 5, while cache reads are 60% cheaper. Anthropic's estimate of 40% lower cost on typical workloads depends on how the model is used.[^2] Apply the rates to your expected work rather than assuming that percentage will appear on your bill. API reductions also do not directly reduce a subscription fee.

Where token cost was the blocker, a reduction could support checking every changed record instead of a sample. Where correction or maintenance dominates, it may change very little. The news becomes useful once I know which situation I am in.

## Keep the decision, not just the announcement

After a trial, save the model version, examples, review effort, and reason for continuing or stopping. For code investigations, include repository revisions and test results. A failed case helps identify which future release deserves attention. A successful case becomes something to check before changing the model again.

Keep space for new capabilities to suggest work you have never tried. The reading earns its time when it helps me improve the work or resolve a question before the program commits to an answer.

[^1]: TypeSafe AI, [Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), September 15, 2026. Pricing is provider-reported; the post discusses limits of its comparisons.

[^2]: Anthropic, [Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5), September 22, 2026. Capability and typical-workload savings are Anthropic's reported results, not measurements of the scenarios in this article.

[^3]: OpenAI, [Introducing GPT-6 Sol and Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/), September 22, 2026. Reports coding evaluations and pricing changes; these do not establish performance on a particular TPM workflow.

[^4]: OpenAI, [Research acceleration: The view inside OpenAI](https://openai.com/index/research-acceleration-view-inside-openai/), September 6, 2026. Internal observations; the report identifies compute growth and remaining research bottlenecks as limits on interpretation.

[^5]: TypeSafe AI, [Introduction](https://docs.typesafe.ai/introduction). Defines state, typed questions, structured answers, and the intended scope of individual judgments. Checked September 23, 2026.

[^6]: TypeSafe AI, [Jev with coding agents](https://docs.typesafe.ai/introduction/coding-agents). Describes using a coding assistant to build software that calls Jev. Checked September 23, 2026.

[^7]: TypeSafe AI, [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13), last reviewed September 17, 2026. Documents limitations including date comparison, numeric precision, indirection, and irrelevant context.

[^8]: OpenAI, [API changelog](https://developers.openai.com/api/docs/changelog), September 22, 2026 entry. Specifies standard Sol pricing for prompts up to 272,000 input tokens; other context lengths and processing tiers differ. All pricing in this article was checked September 23, 2026.

[^9]: Anthropic, [An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem), April 23, 2026. Describes a retrospective code-review comparison on a known bug, with access to the repositories needed for context.

[^10]: Ian Stainbrook, Fullstory, [Technical program management: Why we started a TPM team at Fullstory](https://www.fullstory.com/blog/technical-program-management-why-we-started-a-tpm-team/), September 29, 2020. Describes technical investigation and tool building as part of that company's TPM role before the recent AI releases.
