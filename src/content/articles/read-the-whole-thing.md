---
title: "Read The Whole Thing"
description: "AI can produce a lot of work quickly. I still think someone needs to read it carefully, review it, and test the uncomfortable parts before sharing it with a group."
pubDate: 2026-06-25T00:00:00+07:00
tags:
  - AI
  - workflow
  - engineering
---

You ask the AI to build something good. A clean workflow, a reusable skill, a procedure your whole team can follow. It works for a while, then it comes back and says everything is done, exactly the way you described, and here is what it produced. That last sentence is where most people stop reading.

I understand the temptation. The model already did the heavy lifting. It wrote the files, structured the steps, filled in the edge cases you would have skipped, and summarized the result in a confident paragraph. When the summary sounds right, your brain quietly accepts that the artifact under it must be right too.

But the summary is not the artifact. The gap between them is where problems hide.

So read the whole thing. All of it, from the first instruction to the last line, the same way you would read something a junior teammate handed you before you put your name on it.

## The summary is a claim, not a receipt

When the AI says "everything is great, we did it just like you asked," that is a claim about the work. It is not proof of the work. The two feel identical when you are tired, and that feeling is the trap.

A model that generated a skill file will describe that file in the most favorable terms it can. It is not lying. It genuinely cannot see the parts it got subtly wrong, because if it could, it would have fixed them. This is not a hunch: a controlled study found that without external feedback, models struggle to self-correct their reasoning and sometimes get worse after trying.[^1]

The confident tone is a property of the writing, not a measurement of the output. Treat the summary as a receipt and you end up auditing the description instead of the thing being described.

So open the actual file. Read the actual steps. Compare what it claims against what is sitting on disk.

## Reading is the cheap half of the deal

Here is the trade that is actually on the table. The AI absorbed the expensive, tedious work: drafting, structuring, enumerating, and producing real artifacts you can run. That used to cost you hours. It now costs you a prompt and some patience.

Reading the result is the cheap half. Reviewing it is slightly less cheap. Testing it is the part that actually earns trust.

Skip all three and you have not saved time. You have moved the cost downstream to whoever runs the thing next, and that person is often you in two weeks with less context than you have now.

After something else did the heavy work, the light work of checking it is the least you can do.

## Test it, do not just read it

Reading catches the things that look wrong. Testing catches the things that look perfectly fine and still fail. Those are different categories, and the second one is the dangerous category.

A skill can read beautifully and still assume a tool you have not installed. A workflow can be internally consistent and still depend on a path that only exists on the machine where it was born. A procedure can be flawless prose and produce nothing when a real command runs.

You do not catch any of that by re-reading. You catch it by running the thing and watching what happens. So run it once, end to end, before you believe it.

## The best environment lies to you

This is the part people miss most. They test the artifact exactly once, in the most forgiving conditions possible, and call it verified.

The "best environment" is the one where everything quietly cooperates. Same model that wrote it. Same repository it was generated against. The clean, well-shaped input you happened to have open. Of course it passes. It was effectively fit to those conditions, the way an answer can be correct for exactly one example and nothing else. The evaluation field learned this the hard way: when test conditions leak into what a model was shaped on, scores inflate and stop predicting real performance.[^3]

That is not a test. That is a rehearsal.

Real use is messier than that, so your testing should be messier too:

- Run the same skill on a **different LLM**. A prompt tuned to one model's habits often falls apart on another. Researchers measured swings of up to 76 accuracy points from prompt formatting changes alone, the kind of detail that quietly differs between you and the teammate using a different tool.[^2]
- Run it against a **different repository**. Assumptions about folder layout, naming, and existing files reveal themselves the moment the ground changes.
- Feed it **different input**, including the ugly, incomplete, slightly-wrong kind that real users actually paste in.
- Hand it to **someone who was not in the room** when it was built, and watch where they get stuck without your narration.

Each of those is a not-so-great environment on purpose. The point is not to be unfair to the artifact. The point is that the not-so-great environment is where your team actually lives, and that is the environment the thing has to survive.

## Group scale raises the stakes

A skill you keep to yourself can be half-broken and still survive, because you carry the missing context in your head. You know which step to skip, which input to avoid, which warning to ignore. The artifact and your private knowledge form a working pair.

You are the missing half of your own tool.

Share it at a group level and that pairing breaks. Other people do not have your head. They have the file, the instructions, and whatever environment they happen to be standing in.

Every assumption you never wrote down becomes a silent failure for someone else, multiplied by the size of the group. A flaw that costs you nothing can cost a team a whole afternoon, repeated across everyone who trusted the label instead of the contents.

So the reading and the rough testing matter more right before you publish to other people, not less. You are not just checking your own work anymore. You are vouching for it.

## The habit is small

None of this requires distrusting the AI. It requires treating its output the way you would treat any draft that is about to carry your name: read it fully, review it honestly, and test it somewhere it might actually break.

The model lifted the heavy work. Reading what it produced, running it once in an unfriendly setting, and fixing what falls over is the small, unglamorous part that is still yours.

Do that part. Especially before you tell everyone it works.

[^1]: Jie Huang, Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, and Denny Zhou, "Large Language Models Cannot Self-Correct Reasoning Yet," ICLR 2024. The paper finds that without external feedback, LLMs struggle to self-correct their responses and sometimes perform worse after attempting it. https://arxiv.org/abs/2310.01798

[^2]: Melanie Sclar, Yejin Choi, Yulia Tsvetkov, and Alane Suhr, "Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design," ICLR 2024. The authors report performance differences of up to 76 accuracy points from prompt formatting changes alone, with sensitivity persisting across model size and few-shot examples. https://openreview.net/forum?id=RIu5lyNXjT

[^3]: Simin Chen et al., "Recent Advances in Large Language Model Benchmarks against Data Contamination: From Static to Dynamic Evaluation," arXiv, February 2025. The survey describes how contaminated test data artificially inflates LLM performance metrics and motivates dynamic benchmarks that resist this leakage. https://arxiv.org/abs/2502.17521
