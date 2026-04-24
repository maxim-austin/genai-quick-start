Start by instrumenting every agent request with end-to-end tracing, including intermediate steps. A "trace" represents a single user interaction (or conversation turn) and should capture spans such as:

- User input: query text, conversation context, user role/persona, channel (web/chat/Teams).
- Tool execution: generated SQL, database/warehouse queries, API calls, timeouts/errors.
- LLM calls: prompts (system + user + tool context), model/version, temperature, tokens.
- Output: final response text, citations, structured payloads, follow-up actions.
- Operational metadata: latency breakdown, cost/token usage, agent version, semantic/ontology version, data snapshot version.

Without this foundation in place, the rest of the framework cannot function. Traces are the canonical join key that lets automated scorers, in-product feedback, and SME labels all attach to the same artifact, and they enable consistent evaluation across development and production.
