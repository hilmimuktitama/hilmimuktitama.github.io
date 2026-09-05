---
title: "The Rupiah Is Now Part Of My AI Bill"
description: "Notes from Indonesia on paying for AI tools in dollars while the rupiah weakens, and how that changes what ‘affordable’ means."
pubDate: 2026-06-09T00:00:00+07:00
tags:
  - AI
  - Indonesia
  - building
---

AI was supposed to be the great equalizer. That was the pitch. Anyone, anywhere, suddenly able to write, build, reason, and ship at a level that used to require a team and a budget. The cost of doing more collapsed.

It collapsed for everyone priced in dollars.

I am not. I earn in rupiah, and the frontier comes with an exchange rate I do not control. Lately that rate has moved hard against me. The equalizer is still there. It has just started, quietly, to tilt back.

## A Record That Hurts to Read

On June 8, 2026, the rupiah hit a record low against the dollar. Bank Indonesia's JISDOR fixed USD/IDR at Rp18,171, while market quotes pushed even higher.[^1] This was not a one-day shock. It was the latest step in a slide that has lasted all year.

The numbers are blunt. USD/IDR is up about 11.6 percent over the past twelve months. Expressed the other way, the rupiah's value against the dollar is down roughly 10.4 percent. In 2026 alone, the rupiah has fallen about 8 percent, placing it among the worst-performing currencies against the dollar this year.[^2]

Hold one price still and watch what happens. A year ago, USD 100 of API credit cost me around Rp1.63 million. Today, the same USD 100 costs closer to Rp1.82 million. Same model. Same context window. Same output. I did not buy a worse tool. I just hold a weaker currency.

Nobody raised the price. The price came to me through the exchange rate, in a language the invoice does not print.

## The Rate Is Not Weather

It is tempting to treat an exchange rate like weather. Something that simply happens, that you cannot argue with, that you only learn to dress for.

But a currency does not drift on its own the way a cloud does.

Some of this pressure is external: a firmer dollar, high U.S. yields, delayed expectations of rate cuts, global risk, and the energy shock from the Middle East conflict.[^4] That part matters. Pretending Indonesia controls the whole storm would be dishonest.

But domestic choices can amplify the storm. Reporting around the slide keeps pointing to market unease over fiscal credibility, government spending, governance, capital-market transparency, and the central bank's independence.[^2] Those are not weather. Those are decisions, budgets, institutions, and trust.

Foreign exchange reserves fell to US$144.9 billion at the end of May 2026, down from US$146.2 billion in April. Bank Indonesia attributed the movement to government global bond issuance and tax and service receipts on one side, and government external debt payments plus rupiah-stabilization policy on the other, amid high global uncertainty and seasonal domestic demand for foreign currency.[^3]

Then came the rate hike. On May 20, 2026, Bank Indonesia raised the BI-Rate by 50 basis points to 5.25 percent, a bigger move than economists had expected and the first hike in two years.[^4] It was framed as a stability measure for the rupiah against global turmoil.

Read that list again. Dollar strength, reserves, fiscal credibility, institutional trust, intervention, rate hikes. Some of it is outside the country. Some of it is domestic. None of it stays abstract.

Most of us in tech keep politics in a separate tab. We tune prompts, ship features, debug pipelines, and let the large arguments happen somewhere far from the editor. The exchange rate is proof that the tab was never really closed. Policy does not stay on the news. It travels down the wire and lands as a number on my statement, as a pause before I run an expensive call, as a side project that no longer pencils out.

So I pay closer attention now. Not because I suddenly became a macroeconomist, but because my monthly bill turned out to track decisions made far above my desk. You can leave politics alone for years. It does not leave you alone for any of them.

## The Cheaper Model Is a Quieter Demotion

The obvious response is to use a smaller model. Most providers sell cheaper tiers, and the temptation is to call the switch clever optimization.

Sometimes it is. Most of the time, it is rationing with better branding.

Cheaper models are cheaper because they are optimized for lower cost, lower latency, or simpler workloads. The strongest frontier models are built for more complex, multi-step work.[^5] That difference shows up when the task stops being trivial. A smaller model can trim a doc, rewrite a message, or summarize a short thread. It can also lose the plot in long context, miss the actual constraint, or produce something that sounds right enough to waste your time.

And the rationing has its own tax.

Choosing which model gets which task. Switching between them. Re-reading output I would have trusted from the stronger one. Redoing the parts the cheap one quietly got wrong. None of that was on my plate when the better model was simply affordable. Now a slice of every day goes to being a budget-conscious dispatcher instead of a person doing the actual job.

There are honest ways to stretch a dollar, and I use them:

- Send routine work to the cheaper tier, and accept the rework when the bet goes wrong.
- Cache context so I stop paying twice for the same words.
- Batch requests when the work can wait.
- Keep prompts lean, because padding is tokens and tokens are dollars at a worse rate.

Those tactics are real. Cached inputs and batch processing can cut cost significantly on supported APIs.[^5] But none of it is free. It is productivity, traded away in small pieces, to keep the bill survivable.

## Owning the Machine Is Just Prepaying the Tax

The other escape sounds like freedom: run the model yourself.

Open-weight models have grown genuinely useful. Qwen3 and Gemma 4 are obvious names for local experimentation now, with both families available under Apache 2.0.[^6][^7] DeepSeek remains the louder name for heavier reasoning work. You download the weights, run them through something like Ollama, LM Studio, llama.cpp, MLX, or vLLM, and suddenly there is no dollar-denominated API invoice staring back at you.

That sounds clean until the hardware shows up.

The tiny models that run comfortably on almost any laptop are not the ones that replace a frontier API. The serious local range starts getting expensive quickly. A 30B-class model can run below 24GB of VRAM if you accept heavier quantization, CPU offload, shorter context, slower speed, or quality tradeoffs. But for more comfortable single-GPU use, especially around Q5 quantization and real context overhead, 24GB is a realistic floor rather than a luxury.[^8]

That means the choice is not really API versus free. It is monthly spend versus capital spend.

A 24GB GPU, a higher-memory Mac, or a proper local inference box is not an escape from the dollar. It is the dollar prepaid as hardware, purchased with the same currency that just lost ground. Maybe it pays off. Maybe you use it enough to justify the receipt. But it is still a receipt.

So both doors cost. Spend heavily on hardware now, or bleed rupiah every month to an API that reprices each time the rate twitches. Neither door is the frictionless abundance the launch videos promised. And the local model I can actually afford is usually a step below the hosted one I am trying to replace.

I still run a mix. Cheap and local where I can stomach the quality. Paid frontier calls where I cannot. I just refuse to dress it up as strategy. It is damage control. The exchange rate now decides more of my setup than my judgment does, and I dislike that more than I can say politely.

## The Asterisk on the Promise

What gets to me is not only the size of the bill. It is the shape of it.

The same global tools sit in front of all of us, wearing the same dollar price tag. Then the rupiah reads that tag and decides my access costs more than someone else's. A developer earning in a stronger currency pays the sticker and moves on. I pay the sticker plus a tariff I never agreed to, set by forces that float far above my keyboard.

That is the asterisk nobody printed on the great equalizer.

AI equalizes the interface. It does not equalize the wallet.

It flattens the cost of ambition beautifully for people whose ambition is denominated in dollars. For the rest of us, the leveler slowly turns back into a sorter, and the currency we earn in decides which side we land on.

I will keep using AI, because falling behind costs more than the markup. But I am tired of doing it with one eye on the exchange rate, and I am done pretending that is fine.

We were handed the same tools.

We were not handed the same money. 

HIDUP JOK...

---

## Source notes

[^1]: Bank Indonesia, JISDOR rate table, 8 June 2026: Rp18,171 per USD. https://www.bi.go.id/en/statistik/informasi-kurs/jisdor/default.aspx

[^2]: Reuters, “Prabowo's populist policies propel a 'doom-loop' in Indonesian markets,” 8 June 2026. Reuters reported the rupiah at around Rp18,190 per USD, a record low, and down about 8 percent in 2026. https://www.reuters.com/world/asia-pacific/prabowos-populist-policies-propel-doom-loop-indonesian-markets-2026-06-08/

[^3]: Bank Indonesia, “Cadangan Devisa Mei 2026 Tetap Kuat,” 8 June 2026. The release reports reserves of US$144.9 billion at end-May 2026 and explains the factors behind the movement. https://www.bi.go.id/id/publikasi/ruang-media/news-release/Pages/sp_2811626.aspx

[^4]: Bank Indonesia, “BI-Rate Increased by 50 bps to 5.25%: Strengthening Stability, Supporting Economic Growth,” 20 May 2026; Reuters also described the move as larger than expected and the first hike in two years. https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2810726.aspx and https://www.reuters.com/world/asia-pacific/indonesia-central-bank-raises-interest-rates-by-more-than-expected-2026-05-20/

[^5]: OpenAI API pricing page, accessed 8 June 2026. The page lists flagship, smaller, cached-input, and Batch API pricing, including the 50 percent Batch API discount for supported workloads. https://openai.com/api/pricing/

[^6]: Qwen3 GitHub repository. The repository states that Qwen3 open-weight models are licensed under Apache 2.0. https://github.com/QwenLM/Qwen3

[^7]: Google AI for Developers, Gemma 4 model card, and Google Open Source Blog. Gemma 4 is listed as Apache 2.0 licensed. https://ai.google.dev/gemma/docs/core/model_card_4 and https://opensource.googleblog.com/2026/03/gemma-4-expanding-the-gemmaverse-with-apache-20.html

[^8]: LocalAI Computer, Qwen3 32B VRAM requirements. The page lists roughly 16GB VRAM for Q4_K_M, 24GB for Q5_K_M, 32GB for Q8, and 64GB for FP16. https://localai.computer/models/qwen-qwen3-32b
