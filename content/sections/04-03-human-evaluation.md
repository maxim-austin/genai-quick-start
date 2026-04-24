Human evaluation starts before launch and continues throughout the agent's lifetime. Some questions require domain judgment — industry-specific conventions, business terminology, and regulatory context — and SMEs are the only source of ground-truth labels for them. Their input also bootstraps the eval set built in Step 2 and keeps LLM judges aligned with business expectations as the agent evolves. Run human evaluation in two complementary modes.

## Mode A — "Vibe check" sessions for pre-production validation

Give SMEs a controlled chat environment where they can interact with a specific candidate version of the agent, explore multi-turn flows, and provide immediate feedback. Use vibe checks for qualitative validation of new capabilities or major changes before broader rollout — this is the right mode when you need an expert's gut reaction across a range of conversations rather than a single score.

## Mode B — Labeling campaigns on captured traces

For systematic improvement, have SMEs review selected traces (sampled from production traffic and/or offline-eval failures) and label both:

- **Feedback**: how good the agent's actual response was.
- **Expectation**: what the correct/ideal response should have been (ground truth).

Run labeling as time-boxed campaigns (e.g., "Top 50 failure patterns in Q4"), with:

- curated trace selection rules (edge cases, ambiguous outputs, disagreements between automatic metrics and intuition)
- a shared rubric (what "correct" means, required citations, acceptable uncertainty language)
- outputs synchronized into evaluation datasets for future offline evals and judge calibration.

## Calibrate LLM judges against human labels

Feed SME-labeled expectations back into the LLM judges from Step 2. This is the highest-value use of human annotation:

- calibrate judge thresholds
- refine judge prompts/guidelines for domain-specific correctness
- measure judge agreement with humans and reduce false positives/negatives over time.

Without this calibration loop, LLM judges slowly drift away from what the business actually considers a good answer. With it, every automated score in the system becomes more trustworthy.
