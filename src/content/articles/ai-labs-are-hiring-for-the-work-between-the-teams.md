---
title: "How the AI Boom Is Changing TPM Work"
description: "What Anthropic and OpenAI openings, historical TPM accounts, and research on AI at work suggest about the role's evolution."
pubDate: 2026-09-06T00:00:00+07:00
tags:
  - TPM
  - AI
  - judgment
---

An assistant can help me assemble a weekly update. I still have to decide whether the program is in trouble. That gap raises a broader question for TPMs: how should we change our work when AI helps people produce both program information and software, while the program still needs reliable commitments across teams?

In [A Bridge Is the Wrong Job Description](/articles/a-bridge-is-the-wrong-job-description/), I wrote about the anxiety behind this change. Engineers and product managers can use AI to do more of each other's work. A TPM who earns a seat through translation has reason to reconsider that contribution.

Consider a hypothetical billing migration. Engineers use agents to implement changes. Product arrives with a prototype. The TPM uses an assistant to reconcile notes and tickets. AI affects both how the TPM manages the program and how the teams do the work being managed. The migration itself does not need to ship an AI feature for either change to matter.

My working thesis is that **AI can shift the balance of TPM work toward examining evidence, designing workflows, and resolving decisions.** When drafts and code become easier to produce, more of the unresolved work may sit in assessing them and agreeing what happens next. Whether this frees TPM time depends on how much supervision and rework the tools require.

Anthropic and OpenAI's openings give me a way to examine the thesis. What do these companies still want TPMs to own when AI is close at hand?

## The job already went beyond tracking dates

It is tempting to give this evolution a tidy starting point: TPMs used to track dates, and now they need technical judgment. The older accounts complicate that story.

In Dropbox's 2019 launch retrospective, TPM Sheila Wakida identified four workstreams. One depended on 17 other teams. She mapped the dependencies and introduced separate product, engineering, and go-to-market readiness checklists.[^1]

Fullstory's 2020 account gave TPMs ownership of programs and their business outcomes. The team read code, built tools, and helped move roughly 100 services to independent deployment.[^2]

Technical depth and readiness were already part of the work. So was building something to make a program run better. The evolution has to be more specific than adding these duties to a job description. I want to understand which tasks become easier, who can perform them, and where the TPM's attention goes next.

## Why the AI labs are useful evidence

Anthropic has published evidence of substantial internal AI use. Its December 2025 study surveyed 132 engineers and researchers, conducted 53 interviews, and examined Claude Code usage. Respondents reported using Claude in about 60% of their work. Most said they could fully delegate only 0–20% of their work. Supervision and validation remained part of using it.[^8] Those figures describe surveyed technical staff, not TPMs. They give us context for reading the openings.

Anthropic's **Launches** posting still asks for dependency sequencing, status communication, decision logs, and tradeoffs between speed, quality, and scope.[^9] Much of that would be recognizable to the TPM in Dropbox's earlier account. A company reporting extensive AI use still hires for coordination across teams. The posting leaves open how much supporting paperwork is automated.

OpenAI's **Applied API & Product** opening makes tool use explicit. It asks the TPM to use AI-powered internal tooling to track progress and surface gaps.[^7] Put beside Fullstory's earlier tool-building work, the new element is explicit AI use within program execution. The posting asks for both automation and program ownership. It gives us a concrete expectation to examine.

Anthropic's **Research** TPM opening asks for problem definition as well as execution. The TPM identifies gaps, builds programs without established playbooks, shapes evaluation plans early, and recommends technical decisions.[^10] That shows what technical judgment means in this research setting: helping establish what needs to be learned and how the results will inform a decision. The posting supports the continued importance of that judgment. It does not show that AI introduced the responsibility.

The labs' resources and research needs differ from other organizations. I want to distinguish a new tool, a change in the balance of work, and a domain specialization. OpenAI explicitly naming AI tooling is evidence of the first. Whether it frees TPM time for decisions needs observation. Evaluation infrastructure and training resources describe the domain. The openings establish employer expectations; the workflow examples below explore how changes in producing information and software could affect a familiar program.

## The status update needs a dependable workflow

My [meeting-notes experiment](/articles/turning-meeting-notes-into-program-memory/) is a small example. I used Codex to turn a cross-team kickoff note into context for planning and testing. Preserving assumptions and marking what needed review were part of making it useful.

Once an assistant helps assemble the record, I have to examine the assembly itself. A note and a ticket may disagree. A proposed date may look like a commitment once its original wording disappears into a summary. The workflow needs to preserve these distinctions, with enough source context for a reviewer to resolve them.

Consider a hypothetical migration. A ticket says an endpoint is complete. The kickoff note says integration testing depends on tenant permissions being supported. An assistant could summarize the ticket accurately and still imply that testing can begin. The unresolved question is whether the endpoint satisfies that dependency.

I would want the tool to flag the condition and link both sources. Then I can get the engineering owner to confirm whether the endpoint supports tenant permissions. If it does, the teams can agree that integration testing can begin; if it does not, the plan needs to show the remaining work. That is the decision the update should help us reach. I can also improve the workflow so future drafts preserve the condition instead of treating a completed ticket as sufficient evidence.

## The plan must follow the bottleneck

DORA's March 2026 analysis of 1,110 open-ended responses from Google software engineers describes time saved in generation being reallocated to auditing and verification. The article also cites the 2025 DORA report's association between higher AI adoption, greater delivery throughput, and greater instability.[^3] I draw a planning implication from that research: check which stage actually became faster before changing the program's commitments.

Imagine the migration team finishes three adapters early. The engineer who must review compatibility is still handling an incident. Work has reached the review queue sooner, but the reviewer is unavailable. The launch date needs its own justification. I would make review capacity explicit and agree manageable batches with engineering. These are familiar practices whose priority can change when one stage accelerates.

There is no universal AI speedup to put into the schedule. METR's early-2025 randomized study found that 16 experienced open-source developers took 19% longer with AI on the tasks studied.[^4] Its February 2026 follow-up suggested newer tools were likely helping more. Selection effects, however, made the size of that improvement unreliable to estimate.[^5]

For a commitment, I would use the team's observed results with its current tools. Adoption is a reason to revisit an estimate. It does not supply the replacement.

## Cheaper work creates more choices

Speed is only part of the change. In Anthropic's internal study, respondents reported that 27% of Claude-assisted work consisted of tasks they would not otherwise have done.[^8] That included exploratory work and useful tools that previously would not have justified the effort. This suggests another possibility for programs: AI can expand the work people attempt instead of simply shortening the existing plan.

Imagine that the migration team can now build a trial dashboard to spot accounts that failed to migrate. Previously, building it might have taken too much time away from the migration itself. AI makes a first version practical. Before adopting it, the team still needs to check that it detects failures correctly, connect it to the operating workflow, and assign someone to maintain it. Those activities belong in the capacity discussion too.

I would bring that choice into planning with product and engineering. Does the dashboard help us catch failures earlier? Can the team support it alongside the agreed migration scope? If AI saves implementation time, we might use the gain to finish earlier, reduce pressure on the team, or take on additional work. Expanding scope is one option. It needs capacity across review, testing, integration, and support, not just time to produce the first version.

## A working demo can arrive before a delivery plan

DORA's research on builder intent describes a loosening relationship between titles and the tasks people can perform with AI.[^6] That helps explain the pressure on the translator role.

Suppose a product manager uses AI to build a working version of the migration's admin screen. Stakeholders can try the flow before engineering has assessed permissions, integrations, or reliability. That can improve the product discussion. It can also make the work look closer to delivery than it is. The demo demonstrates a flow; it leaves production questions unanswered.

If AI helps someone build the demo before feasibility is assessed, the TPM needs to make the remaining assessment and implementation work visible before anyone promises a launch date. Product can explain which parts of the flow stakeholders tried and what feedback they gave. Engineering can identify which permissions, integration, and reliability checks remain. The plan needs owners and estimates for that work. Prototypes have always left such questions open; the possible change is how early someone can produce a convincing one.

Technical learning has a purpose here. I need enough understanding of the permissions model to ask whether the demo restricts each user's access correctly. An AI explanation can help me prepare for that conversation with engineering. I should leave able to explain what still needs checking and how it affects delivery.

## Cross-team ownership needs an agreement behind the code

Cross-team ownership concerns what each team agrees to deliver and support. Google engineers in DORA's analysis described using AI to navigate unfamiliar codebases.[^3] That makes contributions across team boundaries a possibility worth examining. It does not tell us how those teams divided responsibility.

Consider a hypothetical extension of the migration: it needs tenant-permission support in an endpoint owned by the platform team. If AI reduces the effort of understanding that service, the migration team might offer to implement the change itself. This could save platform engineering time and change the original division of work. The teams still need to agree whether the platform team will accept the proposed behavior and take responsibility for the release and ongoing support.

I would bring the two engineering owners together to settle that agreement before either team commits its time. They might agree that the migration team authors the patch, updates its client, and runs the integration tests, while the platform team reviews and releases the endpoint change and maintains it afterward. The platform owner decides whether to accept the service change and commits to when it will be available for testing. The TPM makes sure both teams' plans reflect those responsibilities and dates. Contributions across teams already happen; my inference is that if AI makes them practical for more work, TPMs should revisit who will implement each dependency while securing the receiving team's agreement to review and support it.

## AI program tools need checks for meaning

AI can also help TPMs build and operate their own program tools. I would start with a recurring task whose result I can inspect. For the migration, an assistant could compare this week's scope with the last agreed version. I would ask for the changes, links to both versions, and affected dependencies. Missing sources should remain visible. The relevant owners still decide what the changes mean for the launch.

A text diff can show which words changed. Asking an assistant to identify affected dependencies adds interpretation: it must connect the revised wording to work elsewhere in the program. That changes what I need to check in the tool. I need to test those interpretations against known cases and decide how reviewed results enter the program record. A proposed change must remain a proposal until someone accepts it.

For that comparison tool, I would try a revision that changes only wording, another that changes a dependency, and one whose source is missing. The results would show whether it can distinguish those situations. I would also review missed changes in actual use. An assistant that flags everything simply moves the reading burden into another queue; its usefulness depends on helping a reviewer find consequential changes.

I explored structural checks in [A Deterministic Linter for My AI Second Brain](/articles/a-deterministic-linter-for-my-ai-second-brain/). A script can check file structure and links. Assessing whether the content supports a decision needs a different kind of review.

This gives substance to OpenAI's expectation that TPMs use AI tooling. Fullstory's TPMs were already building tools in 2020. The newer posting explicitly brings AI into that practice. The skill I would develop is specifying delegated work and knowing how to check it. That applies to a small status workflow as much as a larger program tool.

## Readiness has to survive the launch

The safety openings make another part of the work visible. OpenAI's **AI Safety & Safeguards** posting connects deployment readiness to evaluations, mitigations, monitoring, escalation paths, and operational controls.[^11] Its remit spans problem definition through operational follow-through. It also includes improving outcomes with AI assistance.

Anthropic's **Safeguards (Infrastructure & Evals)** role names the recurring work: service-level objectives, incident follow-through, current runbooks, and completed post-mortem actions.[^12] It asks for enough production-ML understanding to triage effectively. The TPM does not need to write the code, but must follow what is failing.

Fullstory already described operational programs in its earlier account. These safety roles apply that ownership to the systems used to evaluate and constrain model behavior. They concern managing AI systems; the connection to our ordinary migration is the continuing responsibility for checks and operations after launch. To understand what AI use might change there, we need to examine the migration's workflow separately.

Consider the migration after its first rollout. The team uses AI to change a shared interface before extending the rollout to more accounts. Earlier compatibility results cover the previous version. The TPM coordinates renewed checks with affected teams and makes sure the expansion decision uses results for the version that will actually run. The service owner also checks that monitoring will catch failures in the updated interface and that the runbook names the right response. Readiness now includes both compatibility and the ability to operate the changed service.

A human-written change would need the same care. If AI allows the team to attempt more changes between rollout stages, there is more work to connect each change to the checks and decisions it affects. My inference is that review planning and keeping those records current deserve more TPM attention in that situation. The safety openings illustrate ongoing ownership; they do not establish that AI adoption caused every responsibility they list.

These checks also need a route to a decision. The TPM may maintain the readiness record while engineering assesses compatibility and product decides whether to narrow the rollout. If those owners disagree, there must be an escalation path. Faster evidence gathering helps prepare that conversation. It does not give the TPM authority to accept a risk on someone else's behalf.

<figure class="tpm-comparison" aria-labelledby="tpm-comparison-title">
<figcaption id="tpm-comparison-title"><strong>Where I would reassess TPM work</strong><span>Established responsibilities, with possible adjustments where AI changes the work.</span></figcaption>
<dl>
<div class="tpm-comparison-row">
<dt>Program status</dt>
<dd><span class="tpm-era">Established work</span>Gather and verify updates to establish which commitments are on track.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Use AI to draft updates, then verify the claims and unresolved conditions before reporting progress.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Delivery planning</dt>
<dd><span class="tpm-era">Established work</span>Sequence work around dependencies and available capacity.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Recheck which stages are faster and where review or integration still limits delivery.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Scope and capacity</dt>
<dd><span class="tpm-era">Established work</span>Agree the scope the team can realistically deliver with its available capacity.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Reassess capacity as AI changes the effort required. Expand scope only when review, testing, integration, and support can accommodate the additional work.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Cross-team ownership</dt>
<dd><span class="tpm-era">Established work</span>Agree what each team will deliver, who accepts it, and who supports it after handoff.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>If AI makes it practical to contribute to another team's service, revisit who implements the change and secure agreement on review, release, and ongoing support.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Program tooling</dt>
<dd><span class="tpm-era">Established work</span>Build or commission tools that reduce recurring coordination effort, and check that they work correctly.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>Use AI to help build tools and interpret program records. Check those interpretations against known cases before relying on them for decisions.</dd>
</div>
<div class="tpm-comparison-row">
<dt>Postlaunch readiness</dt>
<dd><span class="tpm-era">Established work</span>Keep compatibility checks, monitoring, and response procedures current as the live service changes.</dd>
<dd><span class="tpm-era">With AI in the workflow</span>If AI enables more changes between rollout stages, plan the checks and operational updates needed for each version before expanding the rollout.</dd>
</div>
</dl>
<p class="tpm-comparison-takeaway">Start with the workflow that actually changed, then decide which evidence, capacity, or ownership agreement the program needs.</p>
</figure>

## Where I would put the next hour

Taken together, the openings suggest an evolution with several parts. Anthropic's Launches role preserves familiar coordination work. OpenAI explicitly brings AI into the TPM's tools. Research and safety roles make problem definition, technical evidence, and operational ownership concrete. The broader research helps explain why that combination deserves attention: people can produce more, cross familiar role boundaries, and still need to supervise the results.

My expectation is that information handling alone becomes a weaker basis for the role wherever it can be automated reliably. AI may also change what teams can offer to build, so the opportunity extends to improving how the program makes commitments: what evidence it needs, which additional work the teams can support, and who owns each contribution. In the migration, that could mean the platform team agrees to review, release, and maintain the endpoint change while the migration team implements and tests it. Or the rollout owners agree to expand after compatibility and operational checks pass. Those are decisions the program can act on.

There is no guarantee the TPM gets that larger mandate. Product and engineering leaders can absorb some of the work, and organizations will divide it differently. These sources cannot tell us whether TPM headcount will grow or shrink. They give me a direction for developing the role without pretending its future is settled.

I would start with one recurring status workflow and check whether it saves time after review and corrections. Any saving should go toward an ambiguity that matters: whether the platform team has agreed to support the endpoint change, or whether the migration team can maintain the new dashboard within its capacity. Did we resolve that question before another team committed its time? Did the decision hold when the work reached integration? Those are the improvements I would look for as routine tasks become easier to delegate.

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
