---
title: "How the AI Boom Is Changing TPM Work"
description: "What Anthropic and OpenAI openings, historical TPM accounts, and research on AI at work suggest about the role's evolution."
pubDate: 2026-09-06T00:00:00+07:00
tags:
  - TPM
  - AI
  - judgment
---

An assistant can help me assemble a weekly update. I still have to decide whether the program is in trouble. That gap is where I want to examine the TPM role: what changes when producing an account of the work becomes easier than resolving the problems inside it?

In [A Bridge Is the Wrong Job Description](/articles/a-bridge-is-the-wrong-job-description/), I wrote about the anxiety behind this change. Engineers and product managers can use AI to do more of each other's work. A TPM who earns a seat through translation has reason to reconsider that contribution.

In an ordinary week, a TPM running a billing migration can face this without shipping an AI feature. Engineers use agents to implement changes. Product arrives with a prototype. The TPM uses an assistant to reconcile notes and tickets. The product stays familiar while the work around it changes.

My working thesis is that **AI shifts the balance of TPM work toward examining evidence, designing workflows, and resolving decisions.** Less manual assembly could make room for that work. It also puts pressure on a role built around being the person everyone asks for context.

Anthropic and OpenAI's openings give me a way to examine the thesis. What do these companies still want TPMs to own when AI is close at hand?

## The job already went beyond tracking dates

It is tempting to give this evolution a tidy starting point: TPMs used to track dates, and now they need technical judgment. The older accounts complicate that story.

In Dropbox's 2019 launch retrospective, TPM Sheila Wakida identified four workstreams. One depended on 17 other teams. She mapped the dependencies and introduced separate product, engineering, and go-to-market readiness checklists.[^1]

Fullstory's 2020 account gave TPMs ownership of programs and their business outcomes. The team read code, built tools, and helped move roughly 100 services to independent deployment.[^2]

Technical depth and readiness were already part of the work. So was building something to make a program run better. The evolution has to be more specific than adding these duties to a job description. I want to understand which tasks become easier, who can perform them, and where the TPM's attention goes next.

## Why the AI labs are useful evidence

Anthropic has published evidence of substantial internal AI use. Its December 2025 study surveyed 132 engineers and researchers, conducted 53 interviews, and examined Claude Code usage. Respondents reported using Claude in about 60% of their work. Most said they could fully delegate only 0–20%. Supervision and validation remained part of using it.[^8] Those figures describe surveyed technical staff, not TPMs. They give us context for reading the openings.

Anthropic's **Launches** posting still asks for dependency sequencing, status communication, decision logs, and tradeoffs between speed, quality, and scope.[^9] Much of that would be recognizable to the TPM in Dropbox's earlier account. A company reporting extensive AI use still hires for coordination across teams. The posting leaves open how much supporting paperwork is automated.

OpenAI's **Applied API & Product** opening makes tool use explicit. It asks the TPM to use AI-powered internal tooling to track progress and surface gaps.[^7] Put beside Fullstory's earlier tool-building work, the new element is explicit AI use within program execution. The posting asks for both automation and program ownership. It gives us a concrete expectation to examine.

I read these labs as places to look for early signals. Their resources and research needs differ from other organizations. Still, their expectations let us examine what persists alongside AI adoption and what could travel beyond the labs.

The distinction I want to keep is between a new tool, a change in the balance of work, and a domain specialization. OpenAI explicitly naming AI tooling is evidence of the first. Whether it frees TPM time for decisions needs observation. Evaluation infrastructure and training resources describe the domain. Reading the postings this way lets me learn from them without assuming every AI-lab duty is the future of every TPM.

## The status update needs a dependable workflow

My [meeting-notes experiment](/articles/turning-meeting-notes-into-program-memory/) is a small example. I used Codex to turn a cross-team kickoff note into context for planning and testing. Preserving assumptions and marking what needed review were part of making it useful.

Once an assistant helps assemble the record, I have to examine the assembly itself. A note and a ticket may disagree. A proposed date may look like a commitment once its original wording disappears into a summary. The workflow needs to preserve these distinctions, with enough source context for a reviewer to resolve them.

Consider a hypothetical migration. A ticket says an endpoint is complete. The kickoff note says integration testing depends on tenant permissions being supported. An assistant could summarize the ticket accurately and still imply that testing can begin. The unresolved question is whether the endpoint satisfies that dependency.

I would want the tool to flag the condition and link both sources. Then I can get the engineering owner to confirm it. The receiving team needs that answer before committing its time. The useful outcome is an accepted dependency with clear conditions; the summary helps us reach it. That gives the preparation hour a different purpose and gives me a concrete failure to fix in the workflow.

## The plan must follow the bottleneck

DORA's March 2026 analysis describes time saved in generation being reallocated to auditing and verification. It also reports higher AI adoption associated with both greater delivery throughput and greater instability.[^3] I draw a planning implication from that research: check which stage actually became faster before changing the program's commitments.

Imagine the migration team finishes three adapters early. The engineer who must review compatibility is still handling an incident. Work has reached the review queue sooner, but the reviewer is unavailable. The launch date needs its own justification. I would make review capacity explicit and agree manageable batches with engineering. These are familiar practices whose priority can change when one stage accelerates.

There is no universal AI speedup to put into the schedule. METR's early-2025 randomized study found that 16 experienced open-source developers took 19% longer with AI on the tasks studied.[^4] Its February 2026 follow-up suggested newer tools were likely helping more. Selection effects, however, made the size of that improvement unreliable to estimate.[^5]

For a commitment, I would use the team's observed results with its current tools. Adoption is a reason to revisit an estimate. It does not supply the replacement.

Anthropic's **Research** TPM opening adds another planning problem. It asks the TPM to identify gaps, build programs without established playbooks, shape evaluation plans early, and recommend technical decisions.[^10] The remit starts before a settled plan exists. Program ownership is familiar; the research setting makes defining the work especially explicit. My inference is that TPM development should include deciding what a program must learn before anyone can commit to delivery.

## Cheaper work creates more choices

Speed is only part of the change. In Anthropic's internal study, respondents reported that 27% of Claude-assisted work consisted of tasks they would not otherwise have done.[^8] That included exploratory work and useful tools that previously would not have justified the effort. This suggests another possibility for programs: AI can expand the work people attempt instead of simply shortening the existing plan.

Imagine that the migration team can now prototype two rollout approaches and build an extra diagnostic dashboard. Both could be valuable. They also create choices about which approach to test, which tool to maintain, and how much attention to spend before committing. The cost of producing an option has fallen. Its downstream demands still need examination.

I would bring those choices into planning with product and engineering. Which uncertainty would each experiment resolve? What result would justify adopting the extra tool? Who would maintain it? That makes exploration an explicit investment. The TPM can help the team use its new capacity without letting every inexpensive prototype become an unexamined commitment.

## A prototype changes the handoff

DORA's research on builder intent describes a loosening relationship between titles and the tasks people can perform with AI.[^6] That helps explain the pressure on the translator role.

Suppose a product manager prototypes the migration's admin screen with AI. The prototype answers a product question earlier. Someone still has to accept responsibility for production implementation, permissions, and support. The author of the prototype may own none of those things. For the TPM, the task is to make those commitments clear. The author, reviewer, and eventual operator can be different people. A job title tells us less about what an artifact has already covered.

Technical learning has a purpose here. I need enough understanding of the permissions model to recognize an unresolved handoff. An AI explanation can help me prepare for the conversation with its engineering owner. I should leave that conversation able to explain the unresolved condition and its consequences. The same access makes reading unfamiliar code or drafting a small tool more approachable for TPMs. Technical depth grows through checking those contributions and understanding where they fail.

<figure class="tpm-comparison" aria-labelledby="tpm-comparison-title">
<figcaption id="tpm-comparison-title"><strong>How I expect the work to shift</strong><span>A practical interpretation of the evidence, not a claim that every TPM followed the same historical path.</span></figcaption>
<dl>
<div class="tpm-comparison-row">
<dt>Program status</dt>
<dd><span class="tpm-era">Established work</span>Gather updates and reconcile the program story.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Automate a first pass; resolve conflicting sources and unsupported claims.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Delivery planning</dt>
<dd><span class="tpm-era">Established work</span>Sequence work around dependencies and available capacity.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Recheck which stages are faster and where review or integration still limits delivery.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Scope and capacity</dt>
<dd><span class="tpm-era">Established work</span>Make commitments within the team's available capacity.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Evaluate newly affordable experiments alongside their review, integration, and maintenance costs.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Cross-team ownership</dt>
<dd><span class="tpm-era">Established work</span>Agree responsibilities and acceptance at handoffs.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Clarify who accepts and operates work that people can now produce beyond their usual role.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Program tooling</dt>
<dd><span class="tpm-era">Established work</span>Build or commission tools that reduce recurring coordination effort.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Prototype more directly; define sources, checks, and limits for delegated work.</dd>
</div>
</dl>
<p class="tpm-comparison-takeaway">The responsibility survives. The balance between doing the task, designing its workflow, and reviewing its result changes.</p>
</figure>

## Delegation becomes part of the craft

I would start with a recurring task whose result I can inspect. For the migration, an assistant could compare this week's scope with the last agreed version. I would ask for the changes, links to both versions, and affected dependencies. Missing sources should remain visible. The relevant owners still decide what the changes mean for the launch.

The TPM's work includes defining the assignment and checking it against known cases. It also includes deciding how the result enters the program record. A proposed change must remain a proposal until someone accepts it.

For that comparison tool, I would try a revision that changes only wording, another that changes a dependency, and one whose source is missing. The results would show whether it can distinguish those situations. I would also review missed changes in actual use. An assistant that flags everything simply moves the reading burden into another queue; its usefulness depends on helping a reviewer find consequential changes.

I explored structural checks in [A Deterministic Linter for My AI Second Brain](/articles/a-deterministic-linter-for-my-ai-second-brain/). A script can check file structure and links. Assessing whether the content supports a decision needs a different kind of review.

This gives substance to OpenAI's expectation that TPMs use AI tooling. Fullstory's TPMs were already building tools in 2020. The newer posting explicitly brings AI into that practice. The skill I would develop is specifying delegated work and knowing how to check it. That applies to a small status workflow as much as a larger program tool.

## Readiness has to survive the launch

The safety openings make another part of the work visible. OpenAI's **AI Safety & Safeguards** posting connects deployment readiness to evaluations, mitigations, monitoring, escalation paths, and operational controls.[^11] Its remit spans problem definition through operational follow-through. It also includes improving outcomes with AI assistance.

Anthropic's **Safeguards (Infrastructure & Evals)** role names the recurring work: service-level objectives, incident follow-through, current runbooks, and completed post-mortem actions.[^12] It asks for enough production-ML understanding to triage effectively. The TPM does not need to write the code, but must follow what is failing.

Fullstory already described operational programs in its earlier account. The AI roles apply that ownership to the systems used to evaluate and constrain model behavior. That gives technical learning a direction: understanding whether the checks are ready, what they cover, and whether they continue to work as the system changes.

I would carry that question into a program using AI to produce ordinary software. An agent changing the migration's shared interface might require compatibility review again. Someone needs to identify the affected consumers, arrange the review, and update the rollout decision. That is my application of the pattern. The postings do not establish that AI adoption caused every responsibility they list.

These checks also need a route to a decision. The TPM may maintain the readiness record while engineering assesses compatibility and product decides whether to narrow the rollout. If those owners disagree, there must be an escalation path. Faster evidence gathering helps prepare that conversation. It does not give the TPM authority to accept a risk on someone else's behalf.

## Where I would put the next hour

Taken together, the openings suggest an evolution with several parts. Anthropic's Launches role preserves familiar coordination work. OpenAI explicitly brings AI into the TPM's tools. Research and safety roles make problem definition, technical evidence, and operational ownership concrete. The broader research helps explain why that combination deserves attention: people can produce more, cross familiar role boundaries, and still need to supervise the results.

My expectation is that information handling alone becomes a weaker basis for the role wherever it can be automated reliably. The opportunity is to improve how the program makes commitments: what evidence it needs, which experiments it funds, and who resolves a disagreement. That work should leave something others can use, such as an accepted dependency or a rollout decision whose conditions are clear.

There is no guarantee the TPM gets that larger mandate. Product and engineering leaders can absorb some of the work, and organizations will divide it differently. These sources cannot tell us whether TPM headcount will grow or shrink. They give me a direction for developing the role without pretending its future is settled.

I would start with one recurring status workflow and use any saved preparation time on an ambiguity that matters. Perhaps a dependency nobody has accepted, or a scope change without an owner. Did we resolve it before another team committed? Did the decision hold when the work reached integration? Those are the improvements I would look for as routine tasks become easier to delegate.

**Source note.** Sources checked September 6, 2026. Dropbox and Fullstory provide historical company examples. DORA and METR examine software work. Anthropic's internal study describes AI use among surveyed engineers and researchers. The five openings describe employer expectations, not measured changes in TPM time allocation. None of these sources isolates AI adoption as the cause of a hiring requirement. The implications for TPM work are my interpretation. The migration scenarios are hypothetical; the linked personal experiments describe their own limits.

[^1]: Dropbox Team, [Behind the scenes with the teams who built the new Dropbox](https://blog.dropbox.com/topics/inside-dbx/behind-the-scenes-with-the-teams-who-built-the-new-dropbox), September 5, 2019.

[^2]: Ian Stainbrook, Fullstory, [Technical program management: Why we started a TPM team at Fullstory](https://www.fullstory.com/blog/technical-program-management-why-we-started-a-tpm-team/), September 29, 2020.

[^3]: Jessica Baolin and Nathen Harvey, DORA, [Balancing AI tensions: Moving from AI adoption to effective SDLC use](https://dora.dev/insights/balancing-ai-tensions/), March 10, 2026. Includes qualitative analysis of 1,110 open-ended responses from Google software engineers and findings from the 2025 DORA report.

[^4]: METR, [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), July 10, 2025. Randomized study of 16 developers across 246 tasks; a bounded historical result.

[^5]: METR, [We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/), February 24, 2026. Follow-up explaining selection effects and measurement limitations.

[^6]: DORA, [Understanding builder intent in the AI era](https://dora.dev/insights/builder-mindset/), October 17, 2025.

[^7]: OpenAI, [Technical Program Manager, Applied API & Product](https://openai.com/careers/technical-program-manager-applied-api-and-product-san-francisco/). Description checked September 6, 2026; postings can change or close.

[^8]: Anthropic, [How AI is transforming work at Anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic), December 2, 2025. Internal research conducted in August 2025; reported usage and delegation figures are self-reported and are not TPM-specific.

[^9]: Anthropic, [Technical Program Manager, Launches](https://job-boards.greenhouse.io/anthropic/jobs/5208193008). Description checked September 6, 2026.

[^10]: Anthropic, [Technical Program Manager, Research](https://job-boards.greenhouse.io/anthropic/jobs/5203545008). Description checked September 6, 2026.

[^11]: OpenAI, [Technical Program Manager, AI Safety & Safeguards](https://openai.com/careers/technical-program-manager-ai-safety-and-safeguards-san-francisco/). Description checked September 6, 2026.

[^12]: Anthropic, [Technical Program Manager, Safeguards (Infrastructure & Evals)](https://job-boards.greenhouse.io/anthropic/jobs/5108695008). Description checked September 6, 2026. All cited postings may change or close.
