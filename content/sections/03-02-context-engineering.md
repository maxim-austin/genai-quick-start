# 3.2 Mastering Context Engineering – The Path to Reliable AI Results

Context engineering is a fundamental shift in how we build with LLMs. As models become more capable, success depends less on writing "smart code" and more on curating what information the model sees within its limited context window at each step. With modern Data & AI platforms offering low/no-code agent frameworks, the key quality attributes (accuracy, trustworthiness, explainability) increasingly depend on context design rather than application logic.

## Typical context engineering methods for Talk-to-your-Data solutions

- **System prompts for agents:** Clear instructions, constraints, and guardrails (what the agent must and must not do).
- **System and business metadata:**
  - System metadata may be captured automatically (object names, data types, column descriptions).
  - Business metadata is often curated with SMEs (business terms, synonyms, edge cases, sample questions, calculation rules).
  - A semantic model is one possible way to structure and manage this metadata.
- **Ontology:** A more advanced approach to describing business domains and relationships.
- **Vector indexes for unstructured data:** Semantic search to enable traditional RAG.
- **GraphRAG:** An advanced approach for managing and retrieving structured business context and relationships.

## Recommendations

- Ensure you have customer-side SMEs and at least one strong Business Analyst in EPAM delivery team – these roles are critical drivers of context engineering.
- **Put yourself in AI agent's shoes.** A useful analogy: if you hire a new analyst and ask them to write SQL for a business question, they won't succeed without understanding the data meaning, business terminology, synonyms, and edge cases. They need metadata and clarification. An AI agent is similar – without precise context, it will struggle; with strong context, results improve significantly.
- Use real business questions collected from stakeholders and treat context engineering as an iterative refinement loop. Have a Business Analyst (or SME) review incorrect or low-confidence AI outputs, diagnose what context was missing or ambiguous (e.g., unclear terminology, missing definitions, incomplete metadata, hidden assumptions, edge cases), and then update the context artifacts accordingly (system prompts, semantic/business metadata, examples, rules, and retrieval scope). Skipping this step is a common issue on GenAI projects because context engineering is still an emerging discipline and many teams lack experienced analysts/engineers to run this iteration effectively.
