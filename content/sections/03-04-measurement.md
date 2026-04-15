# 3.4 You can't improve what you don't measure

You can't systematically improve AI-generated insight quality without measurement. To increase accuracy and trust over time, GenAI solutions must combine automated evaluation with real user feedback and use both to drive iterative improvements.

## Recommendations (minimum required)

- **Implement an automated benchmark/evaluation framework based on test cases:** a curated set of user questions with expected results. Include a meaningful portion of real stakeholder questions and run this benchmark continuously whenever you change any solution component (system prompts, metadata, retrieval strategy, agent parameters, model settings, or foundational models). Treat the benchmark as a regression suite: test cases passing today may fail tomorrow due to upstream model changes by the LLM provider, so repeat evaluation regularly. Use an "AI as a Judge" approach (with clear scoring rules) to assess answers and flag regressions.
- **Collect business-user feedback in the application UI:** at minimum, allow users to mark answers as Correct or Incorrect (ideally with optional tags like "Hallucination," "Missing data," "Wrong metric definition," etc.). This enables measurement of real-world accuracy and highlights what matters most to users. Use feedback to prioritize context improvements (prompts, metadata, examples, and guardrails) and to continuously update your benchmark with high-value real cases.
