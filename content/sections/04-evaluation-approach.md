LLM-powered AI products that fail to make it past the demo stage often share a single root cause: the absence of a robust evaluation system. Teams invest heavily in *changing* the behavior of the system — tweaking prompts, fine-tuning semantic models, writing more code — while under-investing in the ability to *measure* whether those changes actually improve quality. Without evaluation, iteration becomes guesswork and the product rarely progresses beyond a convincing demo.

The approach described in this guide applies to any LLM-powered AI product, but the focus is on **Talk-to-your-Data AI agents** — systems that translate natural-language questions into SQL or analytical queries against enterprise data. These agents have more moving parts than a typical chatbot: LLM, prompts, tool routing, retrieval over data products / semantic layer / knowledge graph, and downstream database execution. Quality can regress even when the underlying model is unchanged, so evaluation must run continuously — not just once before launch.

## Before you start — set realistic expectations

Large language models are not deterministic, and in most cases it's unrealistic to guarantee 100% accuracy for your GenAI solution. In GenAI projects, users typically range from skeptics to over-enthusiasts — some expect "magic" from AI agents, while others dismiss them as "autocomplete on steroids" that constantly hallucinate. To build trust and drive adoption, teams must clearly communicate the solution's capabilities, limitations, and intended usage.

Agree on acceptable quality targets with your stakeholders. Set expectations that you won't reach 100% accuracy, but you can define an acceptable target (e.g., 80–90% depending on the use case) and improve toward it through iteration, governance, and better context. All the evals described below should be based on quality metrics you define with your stakeholders before the project starts.

This guide is intentionally technology-agnostic. It describes the principles that apply across stacks; the specific tools used to implement them — eval frameworks, tracing platforms, judge models — will depend on your platform and frameworks of choice.

## The three tracks

The approach is built on three complementary tracks — **offline evals** (pre-deployment regression testing), **human evaluation** (domain-expert annotation), and **online evals** (in-product signal from real users) — all supported by a shared tracing foundation and woven into a continuous *evaluate → deploy → monitor → learn → improve* loop. All three tracks reuse the same scoring logic across environments and join on the same trace data.

![Three evaluation tracks for Talk-to-your-Data AI agents — offline evals, human evaluation, and online evals — supported by a tracing and observability foundation, with a continuous evaluate–deploy–monitor–learn–improve loop above](content/images/talk_to_your_data_eval_framework.svg)

The sections that follow walk through the approach in implementation order: start with the tracing foundation, add offline evals as a CI/CD quality gate, bring SMEs in to anchor ground truth and calibrate automated judges, and layer in online feedback once the agent is in front of real users.
