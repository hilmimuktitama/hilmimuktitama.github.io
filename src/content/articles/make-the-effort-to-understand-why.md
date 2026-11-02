---
title: "Make the Effort to Understand Why"
description: "Understanding root causes takes curiosity and effort. For PMs and TPMs, AI makes learning more accessible and stopping at 'I am not technical' harder to justify."
pubDate: 2026-11-02T00:00:00+07:00
tags:
  - TPM
  - product
  - AI
  - learning
---

When a problem affects the work you are responsible for, you owe it your best effort to understand why it is happening. Read about it. Ask questions. Learn the unfamiliar terms. Follow the explanation until you can describe what is happening and what remains unclear. That effort is part of the job, including when someone else is responsible for fixing the problem.

“I am not technical” can become a comfortable place to stop. It may accurately describe your background. It also tells you where some learning needs to begin. I want to hold myself to that expectation too, especially when I am asking other people to do work I do not fully understand.

AI gives us another way into that learning: ask a basic question, work through an example, and ask again when the answer is unclear. That makes me less willing to accept unfamiliarity as a reason to disengage. **Be curious enough to keep asking why, and willing to spend time understanding the answer.**

## Stay with the question

There is a difference between hearing an explanation and understanding it. Someone says the import failed because of a timeout. You now have a term for what happened. But what was taking too long? What was the system doing while it waited? Why did this file encounter the problem while a smaller one worked?

Recognizing the vocabulary can hide that gap. In one study, Leonid Rozenblit and Frank Keil asked 16 Yale graduate students to rate their understanding of everyday devices, then explain how those devices worked. Their ratings fell after the attempt. The authors called this an “illusion of explanatory depth.”[^1] The study examined perceived understanding of devices, not competence at work. It gives me a useful question to carry into a technical discussion: can I explain what happened beyond repeating its name?

Understanding a root cause means following the chain far enough to explain how the problem arose. Google's *Site Reliability Engineering* book describes troubleshooting through observations, possible explanations, and tests against evidence.[^2] That last part matters. An explanation can make sense and still be wrong. I need to understand what supports it and what would change it.

You might need to learn what the server does after receiving a file, how it checks the records, or why an operation repeats thousands of times. That can be uncomfortable when everyone else seems to know the terms. Ask for an example. Read the explanation again. A conversation that exposes a specific gap gives you something to work on, provided you follow it up.

## A role boundary should not end the learning

Consider a hypothetical discussion about a slow, unreliable import. The request is: “I want this to be very fast, and users should be able to upload unlimited data.” The customer has a large amount of work to get through. That is worth advocating for. So is understanding what makes it difficult.

Where does the time go? Why is there a limit? Does it protect the service from running out of memory, restrict how much processing one customer can consume, or reflect an old implementation choice? We do not know yet. Learning which explanation applies is part of taking the problem seriously. Repeating the desired outcome more forcefully does nothing to answer those questions.

Before conversational AI, getting started could mean searching documentation without knowing the right terms, taking a course, or asking an engineer to explain several layers of concepts. I understand that hesitation. Those routes still matter, and so does the responsibility to learn. Technical program management already carried that expectation; AI did not introduce it. A PM can leave implementation to engineering while making the effort to understand how the product behaves.

The “PM versus engineering” joke can make permanent misunderstanding seem normal. Product should explain the customer's need, and engineering should explain the constraints. Both should learn from the explanation. A limit might be essential, or it might be an old choice nobody has revisited. Understanding why it exists helps us question it intelligently.

## Use AI to do the work of learning

An AI conversation gives you room to work through introductory questions at your own pace. If an answer introduces a term you do not know, ask how it relates to the problem. Keep going until you can explain the connection yourself, then check it against the system you actually use.

In a Procter & Gamble field experiment, people using AI produced proposals with a more balanced mix of technical and commercial perspectives.[^3] I take that as encouragement to explore beyond my specialty. Understanding the answer remains a separate task; the study assessed proposals, not lasting expertise.

For the import problem, a useful starting question might be:

> I do not understand why a larger import can fail when a smaller one succeeds. Walk me through what might happen from selecting a file to seeing its records in the product. Explain the unfamiliar terms as we go, and distinguish possible causes from things we would need evidence to confirm.

Suppose the answer mentions a queue. Ask what waits in that queue, what takes work out of it, and how waiting differs from processing. Then find out whether your product actually uses one. Relevant documentation, approved code access, or a conversation with the engineering owner can establish that. An assistant's generic explanation is a starting point you still need to connect to the real system.

Research on self-explanation gives me a reason to go beyond reading the answer. In a small study by Michelene Chi and colleagues, 14 eighth-grade students prompted to explain a passage about the circulatory system gained more on a knowledge test than 10 students who read it twice without those prompts.[^4] This was a classroom task, not a test of AI or workplace learning. I would treat it as a reason to try explaining the material, rather than assuming that reading a clear answer means I have learned it.

Close the answer and try it. What happens first? What causes the delay? What evidence supports the explanation? Where you get stuck is where you need to go back. Check your account against the documentation or with someone who knows the system. A second AI response agreeing with you is still something to verify.

## Follow the explanation beyond the label

Return to our hypothetical import. Suppose engineering finds that the file reaches the server promptly. Most of the delay happens afterward, while the importer checks its contents. For every row, it separately asks the database for reference information, repeating many of the same requests. As the number of rows grows, that repeated work accumulates until processing exceeds the request's time limit.

“Upload” is the customer's name for the whole experience. Transferring the file and processing it are different stages. The timeout tells us the request reached a time limit; the repeated database work explains the delay in this example. A PM or TPM should make the effort to understand that connection even if they will never edit the importer.

Check that explanation against the evidence. Where does the timing show the delay, and how do we know the repeated lookups account for it? Suppose a controlled test fetches the needed reference records together, keeps the input and validation rules the same, and substantially reduces processing time while preserving correct results. That would support the explanation for the tested case. These are invented conditions for the example, not findings from a real incident.

Then ask why the behavior remained unnoticed. Perhaps earlier tests used small files, or the workload changed. Those are further possibilities to investigate. Finding a slow operation does not explain how the problem reached the customer, and learning about that history can reveal something the code alone cannot.

The PM or TPM now has an explanation they can reason with: why this failure happened, what supports that account, and what remains open. Next time, they can ask whether the same mechanism is present instead of assuming every failed import has the same cause. This extends the habit in [Bug Reports Build Technical Instinct](/articles/bug-reports-build-technical-instinct/): follow what your observations reveal.

## Be curious about explanations that suit you

The same responsibility applies when the problem appears to be organizational. Suppose several integration milestones slip. “We do not have enough engineers” might fit what you already believe. “The other team is slow” might be easier to say than examining your own request. Both explanations deserve scrutiny.

Look at the sequence of events. What work was ready? What was waiting? Which information or decision was missing, and who knew it was needed? If integration testing waited for a tenant-access decision shared by Platform and Security, understand that wait. The problem could involve unclear decision ownership, insufficient review capacity, incomplete requests, or several conditions together. Read the records and ask the people involved what happened before treating any of those possibilities as the explanation.

AI can help compare the records or explain an unfamiliar approval process. Check what it finds, especially when it supports the story you already preferred. You may discover a gap in the request you helped write. That is part of the learning too.

Curiosity is easier when the subject interests you. The obligation includes the document you have not read and the basic question you would rather not admit you need to ask. It also includes accepting an answer that weakens your argument.

## Keep learning after the immediate pressure passes

Making your best effort does not guarantee that you will establish every cause. Several conditions can interact, and some evidence may be unavailable. Google's troubleshooting guidance recognizes this and puts restoring service ahead of a complete diagnosis during an outage.[^2] Urgency changes when investigation happens. Once the situation is stable, return to the unanswered questions.

That is why a resolved problem can still be worth returning to. Read the incident notes. Ask what the investigation established and what remains uncertain. Write down what you learned in language you understand. If you could not get access to the relevant evidence, say so and identify who might help. Be honest about where your understanding stops, while remaining willing to extend it.

**Always make your best effort to understand why.** I want that to remain a habit after the ticket closes and someone else has done the repair. AI gives us another way to learn; we still have to be willing to spend the effort.

[^1]: Leonid Rozenblit and Frank Keil, [The misunderstood limits of folk science: an illusion of explanatory depth](https://cogdevlab.yale.edu/sites/default/files/files/rozenblit%20%26%20keil%20%202002.pdf), *Cognitive Science* 26 (2002), 521–562. Study 1 used 16 Yale graduate students; later studies tested other groups and knowledge domains. The finding concerns judgments of one's own understanding, not a measure of PM competence.

[^2]: Chris Jones, [Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/), in Google's *Site Reliability Engineering*. Describes hypothesis testing, interacting causes, and restoring service during major outages. Accessed November 1, 2026.

[^3]: Fabrizio Dell'Acqua et al., [The Cybernetic Teammate: A Field Experiment on Generative AI and Teamwork](https://pubsonline.informs.org/doi/10.1287/orsc.2025.20702), *Organization Science*, published online June 12, 2026. The experiment assessed product innovation proposals by commercial and R&D professionals at P&G; it did not evaluate software incident diagnosis or lasting technical learning.

[^4]: Michelene T. H. Chi, Nicholas de Leeuw, Mei-Hung Chiu, and Christian LaVancher, [Eliciting self-explanations improves understanding](https://asu.elsevierpure.com/en/publications/eliciting-self-explanations-improves-understanding/), *Cognitive Science* 18 (1994), 439–477. A study of 24 eighth-grade students learning about the circulatory system. Applying the practice to an AI-assisted technical explanation is a suggested use, not an outcome measured in the study.
