Offline evals and SME review together still can't cover the full diversity of real user behavior. Once the agent is live, collect lightweight end-user feedback directly in the chat UI to capture high-value ground truth at scale, and feed the most valuable examples back into the tracks that came before.

## Add chat-UI feedback controls

Let users tag each response inline:

- Correct
- Hallucination (unsupported / invented / ungrounded)
- Error (wrong data, wrong interpretation, tool failure, permission issue, etc.)
- Optional comment and "what I expected" free-text.

## Store feedback as structured trace annotations

Persist each piece of feedback as a structured annotation attached to its trace, capturing:

- trace_id / conversation_id
- feedback label + optional comment
- timestamp
- username (or hashed identifier) + user role
- agent version
- semantic layer / ontology version
- retrieved sources identifiers
- tool execution metadata (e.g., SQL executed, error codes)

Structured annotations let you slice feedback systematically (by user, agent version, data product, ontology concept) and set up the next step.

## Promote high-signal feedback into the eval set

Run a continuous triage process:

- Bucket "Hallucination" and "Error" tags by root cause — retrieval, tool routing, data quality, ontology mismatch, prompt policy, model behavior.
- Promote high-signal examples into the offline eval set:
  - convert the user comment into an expectation ("correct answer should include X")
  - pin the relevant data snapshot if needed
  - add as a regression test so the same failure cannot reappear unnoticed
- Route ambiguous or high-stakes traces to SMEs for labeling (feeding back into Step 3).

This is the feedback loop that keeps both the offline eval set *and* the SME review queue from going stale. Without it, offline evals drift away from how users actually use the product.

## Closing the loop

With all three tracks in place and joined on the trace foundation, the continuous improvement loop starts to compound rather than plateau. Offline evals catch regressions before they ship. SMEs anchor ground truth and calibrate the LLM judges those offline evals depend on. Online feedback ensures the eval set and the SME review queue both keep pace with how real users actually use the product. Remove any one of these and quality drifts; keep all three running together and every release gets measurably closer to the quality targets you agreed with stakeholders up front.
