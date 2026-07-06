# From hand-built to self-building: how data platforms evolve in the AI era

*Three horizons of the data & AI platform – and a blueprint for the next generation.*

I've spent the last 22 years building data and analytics platforms for dozens of customers – from architecture to production. Over those two decades the tools have been changing constantly – warehouses giving way to lakehouses, ETL to ELT, on-prem to cloud – but the way I actually worked stayed recognizably the same: humans design, humans build, humans consume.

Then came the last two years, and my way of working changed more dramatically than in the previous twenty combined. Today I leverage foundation models for almost every task I do – research, architecture, documentation, analysis, code. The productivity gain is hard to measure precisely, but it's significant. Even more important, the quality of my deliverables has improved substantially – and some of the work I do today I wouldn't even have attempted in the past. And the boundary of my role has moved: with coding agents like Claude Code, I'm no longer only architecting solutions – I'm implementing them too.

It's fair to assume that if the work of one architect can change this drastically in two years, the data and AI platforms I build are about to change just as drastically. This article is my reflection on how they're changing in the AI era – and on what stays the same.

## Three horizons of the data & AI platform

Trust is the one thing that survives every shift in the data platform. Around that constant, three horizons tell the story: what remains foundational from the past, what's changing right now, and the bet I'm making on the future – an arc that steadily moves humans from building the platform to directing and certifying it.

![The three horizons of the data & AI platform](content/images/articles/picture-1-three-horizons.jpg)
*Picture 1 – Three horizons of the data & AI platform, and the evolution of the human role: from build, to direct, to certify.*

### Horizon 1 – Still the foundation: the data product as the unit of trust

The data product remains the cornerstone of reliable analytics – a curated, domain-owned, governed asset with an explicit contract: defined inputs and outputs, quality guarantees, clear ownership, a discoverable interface. The AI shift doesn't retire it; it makes it more load-bearing.

The modern refinement is that a data product is defined by its contract, not its location. Most still live in the Lakehouse – it remains the center of gravity – but the asset can live anywhere: a well-curated API over a CRM that returns a customer's current state is as much a data product as a governed table. What makes it one is the guarantee, not where the bytes sit.

### Horizon 2 – New reality: conversation in front, context underneath

The interface is moving from the dashboard to the conversation: users get insight in real time by asking in plain language. Most questions never needed a dashboard – they needed an answer.

Making those answers trustworthy is a new discipline: the enterprise context layer – everything that describes your business and your data. The real constraint turned out to be grounding, not the model: pointed at raw schemas, even frontier models guess the statistically likely interpretation instead of the approved business definition. The context layer closes that gap with semantic models and metrics, ontology, a business glossary, verified queries, and lineage – the shared meaning that maps a human question to the right data product and returns an answer that's correct and auditable.

It stacks directly on Horizon 1: data products give trustworthy data, context gives trustworthy meaning, agents give trustworthy access. Engineering that layer becomes the new center of the delivery team's work.

### Horizon 3 – Future bet: a self-building mesh, built by agents, for agents, certified by humans

Today humans build the platform and humans consume it. My bet inverts that: the platform builds itself. A fleet of specialized agents handles construction and upkeep – ingestion, transformation, quality, governance, and the context layer itself – generating and maintaining the pipelines, semantic models, ontologies, and even the MCP servers and tools other agents depend on. Infrastructure built by agents, for agents.

Humans don't leave; they move to the top, as both the ultimate consumers and the ultimate authority – setting intent and certifying the agents' work at explicit governance gates. The job shifts from building to directing and certifying: from writing the pipeline to approving the data product an agent proposes. "Built by agents, certified by humans" is the operating principle, and the certification gate is where trust is enforced.

Even here the through-line holds – the data product stays the unit of trust, now the artifact agents produce and humans ratify.

## The blueprint I've been building for ages

Let's take a deeper look at how the data and AI platform architecture itself is changing. Below is a simplified, 30,000 ft architecture blueprint for data and analytics platforms – the one I've been developing throughout my career – and still the architecture relevant for most organizations today.

![The classic data & analytics platform blueprint](content/images/articles/picture-2-classic-platform-blueprint.png)
*Picture 2 – A simplified 30,000 ft blueprint of the classic data & analytics platform.*

The key idea behind the blueprint is simple. Skipping the tiny details of each platform capability, the main workflow was to ingest data from all enterprise source systems, cleanse it, transform it, and build reliable data products. Even before the term "data product" emerged, the idea was the same – build data marts: data ready to be presented to end users. On top of the data products layer, my teams and I built hundreds or even thousands of reports and dashboards of every type, to cover all the business use cases and requirements of the end users. Enterprises spent millions of dollars to implement and maintain all of this – data governance capabilities included.

## What the AI era changes

In the AI era, two trends are redrawing this picture. The first: more and more of the work is done by AI agents, not by humans. The second: those thousands of reports and dashboards are no longer needed. Users never needed the artifact – they needed the insight. The result is the emergence of conversational AI, where end users ask any question in plain language and get the insight they need, right when they need it.

After implementing many proof-of-concept projects, I found that one piece was missing – the piece that separates an impressive demo from an AI agent that builds trustworthy insights and can address any business question. That piece is the enterprise context layer: in a nutshell, metadata of different types, assembled to tell AI agents everything they need to know about the enterprise's data.

Together, these trends reshape the blueprint. The familiar consumption layer – that wall of reports and dashboards – gives way to an agentic layer, and a new enterprise context layer emerges between the agents and the data products, as depicted below. This is Horizon 2 arriving in the architecture.

![The transitional architecture: agentic layer and enterprise context layer](content/images/articles/picture-3-agentic-and-context-layers.png)
*Picture 3 – The consumption layer gives way to an agentic layer; the enterprise context layer emerges underneath it.*

## The next-gen Data & AI platform

Naturally, what interests me most is how the future data and AI platform will look – because that's what tells me where to focus and which gaps to address. The blueprint below gives a more detailed view of the key layers and components of the next-generation data and AI platform; the rest of this section walks through it.

![The next-gen Data & AI platform blueprint](content/images/articles/picture-4-data-ai-platform-blueprint.svg)
*Picture 4 – The next-gen Data & AI platform: built by agents, for agents, certified by humans.*

### Key principles

Five principles organize the blueprint. **Trust is manufactured, not assumed** – every artifact on the canvas exists to make an answer defensible, and the certification gate is where that trust is enforced. **The data product is the unit of trust** – a curated, domain-owned asset defined by its contract, not its location. **Meaning is engineered** – the enterprise context layer turns raw data into approved business language, so an agent answers with the company's definition of revenue, not a statistically likely guess. **Autonomy demands more governance, not less** – a platform that runs itself must be governed end to end, which is why a second governance discipline appears alongside the traditional one. And **humans hold ultimate authority** – machine speed for construction, human judgment for approval.

### The layers, step by step

**Humans – ultimate consumers, ultimate authority.** The top of the platform is people, in two roles. Business users ask questions in plain language and receive grounded, cited answers – no dashboards required. The platform team no longer writes pipelines; they direct the fleet, pair with agents on demand, and certify what the agents propose. Their authority is drawn as an amber thread that runs from this layer straight into the certification gate.

**Agentic infrastructure – the control plane.** Below the humans sits the workforce. At its core are foundation models – frontier or open, deliberately swappable – providing the reasoning that everything else runs on. Two kinds of agents draw on that core: interactive agents (conversational, coding, analyst) that converse with users and pair with engineers on demand, and autonomous agents (self-healing ops, quality watchdogs, context curators) that run continuously to evolve, maintain, and heal the platform. Underneath them lies the AI tooling strip – MCP servers, tools, skills, the agent harness, templates, and evals – the fleet's supply chain. The defining twist: agents run on this tooling *and* generate and maintain it themselves.

**Enterprise context layer – shared meaning for every answer.** The idea is simple: this layer is metadata of different types, assembled to tell AI agents everything they need to know about the enterprise's data –

* what data you have
* what semantics and meaning are hidden behind the raw data
* where this data is located
* and other meta information – quality, freshness, policies, and the profile and preferences of the person asking.

On the canvas it is composed of the ontology, knowledge graph, semantic layer, business glossary, verified queries, lineage, and system metadata, together with policy context and user profiles & preferences – all bound to the products themselves through the ontology ↔ product mappings. Once the foundation model knows everything about your data, it is capable enough to answer most questions of any complexity from business users. And the context layer serves two kinds of consumers, not one: conversational agents use it to retrieve the right data for an answer, and coding agents use the very same context to develop data pipelines and other platform capabilities – an agent can no more build the right pipeline than answer the right question without knowing what the data means.

**Data & AI products and access ports – the logical layer.** This is where garbage in, garbage out does its work. You will not get reliable insights by pointing AI agents at all of the enterprise's raw data with no governance on top; the products layer is the governance that stands between the two. Its unit is the data product:

> A curated, domain-oriented data asset that serves as a trusted data foundation for analytics and AI, with clearly assigned ownership and stewardship and embedded metrics for data quality, freshness, and other operational characteristics.

Ownership is the key word in that definition. Without an owner – a person and a domain responsible for the asset – a data product cannot be relied on for decision making; accountability is what turns a dataset into a foundation. The family spans data and AI alike – analytical, operational, streaming, and knowledge products, plus ML models – each carrying an explicit contract and the certified mark that only the gate can grant, following the lifecycle printed on the band: agent-proposed → auto-verified → human-certified.

The layer is called *logical* deliberately: it is a governance wrapper on top of existing physical data. Nothing moves to become a product – the data stays where it lives and gains a contract, an owner, and quality telemetry. The access ports beneath complete the idea: the same physical data can be reached in various ways – through SQL, an API, event streams, MCP, search, or an inference endpoint. Any product, any port; serving is a property of the platform, not of the product.

**Physical data layer – where the real data lives.** At the bottom, the systems of record: the Lakehouse (still the center of gravity), operational and SaaS systems, streams and queues, document stores, vector stores, graph stores, and external and shared data. The logical layer above deliberately hides this heterogeneity. And AI agents add a new kind of data virtualization on top of it: instead of pre-wiring every source into a federation engine, data can be retrieved from multiple sources at runtime – sub-agents each pull from their own system, and a supervisor agent combines and joins the results to answer user questions that require data from multiple sources at once.

**Platform capabilities – the data plane (left rail).** The machinery that moves and shapes data spans every layer: ingestion, transformation, streaming, modeling, data quality, master data management, knowledge management, orchestration, storage, data sharing, pixel perfect reporting, observability, ML & AI ops, DataOps. One thing here is deliberately unchanged: these capabilities implement deterministic data pipelines – the same kind that have moved enterprise data reliably for ages. The main work is still done deterministically; the AI era does not make ingestion probabilistic. What changes is who operates the machinery: agents build those deterministic pipelines, and manage and control them at run time. No human hands build it – but the pipelines themselves remain as predictable as they ever were.

**Governance – spanning every layer, every agent, every product (right rail).** Governance now comes in two tiers. Data governance is the familiar discipline: security, access control, privacy, compliance, data policies, audit trail. AI governance is the new one: agent identity, tool permissions, model risk, eval standards, cost guardrails, kill switches – the controls you need when your workforce is non-human. At the top of the rail sits the mechanism that makes the whole vision credible: the **certification gate**, where trust is enforced. It approves or rejects what agents propose – data products, context updates, pipelines, and tooling – and it is risk-tiered, so low-risk changes auto-certify against policy while human judgment concentrates where it matters.

**Catalog of catalogs – the data & AI marketplace.** The catalog deliberately belongs to two worlds at once. It is part of the enterprise context layer, because it describes the data products – their location, system metadata, data lineage, and the additional information an agent needs to find and use them. And it is at the same time a traditional data governance capability – the registry through which access is controlled and audited. In the form of a data marketplace it serves as the entry point where business users find the data products they need and request access to them – and where AI agents discover and request access in exactly the same way. The alternative front door is an AI agent on top of the marketplace itself: describe what you need in plain language, and the agent searches the catalog, finds the right products, and arranges access.

### How the data flows

Two flows animate the picture. The **answer path** runs top to bottom and back: a business user asks a question in plain language; an interactive agent grounds it in the context layer – resolving terms through the glossary and ontology, applying policy context and the user's preferences; the ontology ↔ product mappings resolve the question to certified products; the answer is served through the appropriate port and returns grounded and cited. Every answer grounded in approved meaning.

The **data preparation path** runs continuously underneath: data is ingested and transformed into data products through deterministic data pipelines – built, monitored, and managed by AI agents. This is the self-healing way of working: when something breaks at run time, agents diagnose and fix operational issues on their own; when a code change is required, they propose the fix, and a human approves it at the certification gate before it ships. Machine speed for the repair, human judgment for the change.

## Closing thoughts

I opened this article with a personal observation: two years of foundation models changed the way I work more than the previous twenty did. Writing this blueprint, I've come to see that experience as a preview of the platform's own trajectory. First the models made me faster at the work I already did. Then coding agents let me do work that used to belong to others. Now my scarcest contribution isn't building at all – it's judgment: deciding what should exist, and certifying what the agents produced. The platform is following the same arc. Horizon 1 made data trustworthy. Horizon 2 makes meaning trustworthy. Horizon 3 makes autonomy trustworthy.

The horizons also double as a roadmap. Keep investing in Horizon 1: data products with real owners and real contracts are what everything else stacks on, and no agent will rescue a platform built on ungoverned data. Start engineering Horizon 2 now: the enterprise context layer is the difference between an impressive demo and a system your CFO will trust, and every ingredient – semantic models, ontology, glossary, verified queries, lineage – can be built today. And prepare for Horizon 3 deliberately: design the certification gate and the AI governance discipline before the agent fleet arrives, because autonomy demands more governance, not less.

Through all of it, the constant holds. The tools change; the workers change – for the first time, they are not all human – but trust remains the product, the data product remains its unit, and a human remains accountable for every answer. The craft I've practiced for 22 years isn't disappearing; it's moving up a level: I spent those years building the platform, and now I'm teaching it to build itself – and making sure its work deserves my signature.

Built by agents, for agents, certified by humans. I'm betting the next decade of my career on it.
