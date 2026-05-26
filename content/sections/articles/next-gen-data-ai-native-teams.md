# Next-Gen Data AI-Native Teams: Why Team Composition Must Change in the Era of GenAI

> **Disclaimer:** This article reflects the personal opinion and vision of **Max Krupenin.** It does not represent the official point of view of EPAM.

## Forward-Deployed Engineers: The Unicorn Problem

One of the most actively discussed roles in our industry today is the **Forward-Deployed Engineer (FDE)**. The idea is simple but ambitious: a single person, embedded at the customer's premises, who owns the full lifecycle of solution delivery.

A Forward-Deployed Engineer is expected to:

- Understand the customer's business domain and business problems
- Design the solution architecture
- Develop the solution, heavily leveraging GenAI
- Deploy and operate the solution
- Communicate directly with business and technical stakeholders

In principle, I believe this role can work. With modern AI tooling, it is genuinely possible for one capable person to compress what used to be the work of several specialists. The challenge is not whether the FDE model is technically feasible – it is whether we have enough of these people.

An effective FDE has to be a unicorn: deep business domain expertise, solid architecture experience, real hands-on development chops with the latest GenAI stack, and strong communication skills to engage senior stakeholders. **How many such unicorns do we actually have in our company?**

There is another reason I am skeptical of the lone-FDE approach: collaboration. The best solutions rarely come from one mind working in isolation. Discussing ideas, arguing, challenging each other, complementing each other's blind spots – this is how strong solutions get built. A team beats a unicorn, even when the unicorn exists.


At the same time, I strongly believe that software engineering in general, and data engineering in particular, are changing dramatically. As a result, team composition should also change.
Below is my view of what an efficient **AI-native data team** may look like.

---

## What Makes a Team AI-Native?

Before discussing roles, it is important to highlight one principle:

**Every team member must actively use AI in most of their daily work.**

This is no longer limited to developers. Product managers, analysts, architects, QA engineers, and DevSecOps specialists should all understand how to use GenAI tools to increase speed, improve quality, and stay competitive in a changing market.

An AI-native team is not just a traditional team with ChatGPT or coding assistants added on top. It is a team that changes the way it works:

- Requirements are explored faster through prototypes.
- Specifications become more important, not less.
- AI agents help generate code, tests, documentation, and deployment assets.
- Engineers shift from writing every line of code to steering, reviewing, validating, and improving AI-generated output.
- QA becomes even more critical because the amount of generated code is increasing dramatically.
- Documentation becomes a living part of the delivery process.

---

## Recommended Core Team Composition

In my opinion, an efficient next-generation data AI-native team can be built with **four to five core roles**:

1. Product Manager
2. Solution Architect
3. AI Engineer
4. AI QA Engineer
5. “Junior” AI Engineer

This is a compact team, but each role has a clear purpose.

---

## Who Manages This Small AI-Native Team?

For such a compact AI-native team, management does not always need to be assigned to a dedicated project manager or delivery manager.

In my opinion, this small team can be managed by **any team member who is ready to take leadership**, depending on the situation.

It could be the Solution Architect, Product Manager, AI Engineer, or another senior team member. The key factors are not the formal role title, but rather:

- Seniority and maturity.
- Strong communication skills.
- Ability to facilitate discussions.
- Ownership mindset.
- Understanding of the delivery process.
- Ability to coordinate team members and remove blockers.
- Readiness to lead stakeholder conversations when needed.

This person does not need to become a traditional manager. The role is more about **facilitating the process**, keeping the team aligned, making sure decisions are made, and helping the team move toward the product goal.

In a small AI-native team, leadership can be more flexible and situational. The most important point is that someone should clearly own coordination and help the team operate as a focused unit, not just as a group of individual contributors using AI tools.

---

## 1. Product Manager

Mapped to current EPAM roles, this could be a business analyst, consultant, or a similar profile. The core idea is straightforward: at the end of the day, customers do not need code – they need business problems solved. To solve the right problem, we need someone who understands the business domain and who can speak the stakeholder's language.

I deliberately call this role **Product Manager** rather than Business Analyst. A product-management mindset — outcomes over outputs, users over features, and continuous validation against real value — is what shapes technical solutions that actually move the needle for our customers.

### Key Responsibilities

The Product Manager should normally cover:

- Communication with business stakeholders.
- Defining the product goal and purpose.
- Converting business vision into features and requirements.
- Creating demo scenarios.
- Presenting the product to stakeholders.
- Maintaining product documentation.
- Helping the team test whether the solution solves the real business problem.

### What Changes in the AI Era

In the AI era, even a non-technical Product Manager or Analyst can create a simple prototype using AI tools.

This could be a “dummy” prototype without a real backend, created in a few hours, but still useful enough to:

- Demonstrate the product idea to users.
- Validate the user experience.
- Clarify requirements.
- Collect early feedback.
- Help the technical team create a more accurate product specification.
- Avoid building features that users do not actually need.

This is a major shift.

In the past, business stakeholders often had to describe requirements in documents and wait for the engineering team to interpret them. Now, a Product Manager can quickly create a visual prototype, show it to stakeholders, and use feedback to improve the product direction before engineering effort is spent.

![Example of a lightweight AI-generated prototype](content/images/articles/prototype.png)

*A lightweight, AI-generated demo app — here, an insurance "Talk-to-your-Data" prototype exploring a commercial real estate ontology — built in hours without a real backend, used to validate the product idea with stakeholders before any production effort is committed.*

---

## 2. Solution Architect

The Solution Architect is a critical role in an AI-native team. In some cases, this could also be a very senior engineer who is capable of playing an architecture role.

This person may be the closest role to the Forward-Deployed Engineer concept. They can connect business needs with technical implementation and help the team move from vision to working solution.

However, expecting one architect to cover every role end-to-end may not be realistic in most cases.

### Key Responsibilities

The Solution Architect should normally cover:

- Converting business vision and use cases into architecture-significant requirements.
- Designing the solution architecture.
- Creating project scaffolding.
- Preparing detailed solution specifications.
- Applying a spec-driven development approach.
- Steering AI agents that generate code based on the solution specification.
- Communicating with technical stakeholders on the customer side.
- Leading technical demos.

### The Importance of Spec-Driven Development

I would especially emphasize the importance of **spec-driven development**.

This is still an emerging trend, and many companies are experimenting with it. However, in my view, it will become a critical requirement for building complex AI-native solutions at scale.

The reason is simple: when AI agents generate large amounts of code quickly, the specification becomes the main control mechanism.

Without a strong specification, teams may quickly generate a lot of code that is difficult to understand, validate, maintain, or align with business goals.

With a strong specification, AI agents can be guided more effectively. The team can keep the solution under control and make delivery more predictable.

In this model, an **AI-generated project portal built around the specification** can also replace or simplify some traditional artifacts, such as:

- Project plans.
- Tickets.
- Status reports.
- Technical documentation.
- Implementation notes.
- Testing documentation.
- Demo scenarios.
- Delivery progress summaries.

The project portal becomes a living source of truth for the product, architecture, implementation, testing approach, and delivery status.

![Example of an AI-generated HTML-based project portal built around the solution specification](content/images/articles/spec.png)

*An AI-generated project portal organised around the solution specification — phases, specs, ADRs, and delivery status — becomes a single, living source of truth that replaces fragmented project plans, tickets, and status reports.*

---

## 3. AI Engineer

The AI Engineer is not just a traditional developer with a coding assistant.

In an AI-native team, this person spends a significant amount of time working with AI-generated code. Their role is to steer, review, validate, improve, and sometimes manually implement the parts where AI agents struggle.

Ideally, this person should be capable of reviewing both backend and frontend code. They should also be comfortable working across multiple programming languages and technology stacks.

### Key Responsibilities

The AI Engineer should normally cover:

- Helping the architect with solution architecture and project scaffolding.
- Following the spec-driven development approach.
- Steering AI agents that generate code based on the solution specification.
- Reviewing AI-generated code.
- Fixing issues manually when AI agents produce incorrect or low-quality output.
- Implementing critical components where human control is required.
- Deploying the solution.

### How This Role Is Different from a Traditional Engineer

In the past, developers were expected to write most of the code themselves.

In an AI-native team, the focus shifts. The engineer becomes more like an orchestrator and reviewer of AI-generated implementation.

This requires a different mindset.

The AI Engineer must be able to:

- Break work into clear instructions for AI agents.
- Detect subtle issues in generated code.
- Understand architecture implications.
- Avoid blindly trusting generated output.
- Improve code quality, security, and maintainability.
- Know when to use AI and when to write code manually.

This makes engineering faster, but it does not remove the need for strong engineering skills. In fact, weak engineering skills may become even more dangerous because AI can generate convincing but incorrect solutions very quickly.

---

## 4. AI QA Engineer

In the AI era, QA becomes even more important.

The reason is that the volume of generated code is increasing dramatically. It is becoming easier to generate a working application in a few hours. However, the downside is that developers may not spend enough time reviewing the code or testing the solution deeply.

As a result, solution quality becomes a major risk.

In my opinion, the AI QA Engineer role becomes even more critical than it was in the past. A comparable amount of time should be dedicated to testing and validating the solution, especially when AI-generated code is heavily used.

### Key Responsibilities

The AI QA Engineer should normally cover:

- Designing the testing framework.
- Creating AI-assisted test automation for all solution components.
- Testing backend, frontend, data pipelines, and integrations.
- Generating test data.
- Validating data quality.
- Designing evaluation frameworks for AI agentic components.
- Testing conversational AI applications.
- Running regression tests as the solution evolves.

### Why QA Must Evolve

Traditional QA often focused on validating predefined requirements and checking whether the system worked as expected.

AI-native systems introduce additional complexity:

- AI-generated code may contain hidden defects.
- Agentic components may behave differently across similar prompts.
- Data quality issues may affect output correctness.
- LLM-based features may require evaluation rather than simple pass/fail testing.
- Security and privacy risks may appear in generated workflows.
- Small prompt or specification changes may impact behavior unexpectedly.

That is why AI-native QA must include not only classic test automation, but also:

- AI evaluations.
- Prompt testing.
- Data quality checks.
- Synthetic test data generation.
- Scenario-based validation.
- Continuous regression testing.

---

## 5. “Junior” AI Engineer

The word **“Junior”** is used here intentionally in quotes.

This person may not actually be a junior engineer in the traditional sense. It could be a solid engineer who is less senior compared to the core AI Engineer or who does not yet have enough practical AI engineering experience.

AI Engineering is a new and rapidly evolving skill. Even mature senior engineers need time to master effective AI-assisted development, agent steering, prompt-based implementation workflows, code review of generated output, and spec-driven delivery.

For any company, growing enough AI Engineers will be a challenge.

That is why it is a good idea to include a less senior engineer in the team who can work in a shadow mode and learn by doing.

This person can help the core team with different types of activities depending on the project needs: product clarification, specification work, AI-assisted implementation, code review support, testing, documentation, deployment preparation, or any other tasks required by the team.

The main purpose of this role is not to own a fixed scope, but to help the team while growing practical AI engineering skills.

---

## Resulting Core Team Size

As a result, the core next-generation data AI-native team may include **four to five people**:

| Role | Main Purpose |
|---|---|
| Product Manager | Owns business problem, product vision, requirements, and stakeholder feedback |
| Solution Architect | Owns architecture, specification, scaffolding, and technical direction |
| AI Engineer | Steers AI agents, reviews generated code, fixes issues, and deploys the solution |
| AI QA Engineer | Owns quality strategy, automation, test data, data quality, and AI evals |
| “Junior” AI Engineer | Supports the core team while growing practical AI engineering skills |

This team is small, but it can be very productive if every member actively uses AI and has clear responsibilities.

---

## What About Traditional Delivery Roles?

Some traditional roles are still important. However, for a small AI-native team, it may be inefficient to staff every role as a dedicated full-time person.

Two examples are especially important: Delivery Manager and DevSecOps Engineer.

---

## Delivery Manager

The Delivery Manager role remains critical.

However, in my opinion, Delivery Managers should often be shared across multiple AI-native teams, for example two or more teams, depending on project complexity.

The Delivery Manager should play an orchestration role and cover traditional delivery responsibilities, including:

- Customer relationship management.
- Delivery governance.
- Roadmap tracking.
- Budget management.
- Risk management.
- Dependency management.
- Communication with leadership.
- Escalation handling.

In AI-native delivery, the Delivery Manager should also understand how AI changes team productivity, planning, risks, and delivery cadence.

Traditional planning models may need to change because teams can produce prototypes, documentation, and working features much faster than before. At the same time, validation, testing, and stakeholder alignment remain critical and should not be underestimated.

For a compact AI-native team, the Delivery Manager does not necessarily need to manage day-to-day team execution. That responsibility can be taken by one of the core team members who has the right seniority, communication skills, and leadership mindset.

In this model, the Delivery Manager focuses more on delivery governance, customer relationship, budget, risks, and broader coordination across teams.

---

## DevSecOps Engineer

Many DevOps activities are increasingly being automated with AI agents. This is already happening now.

However, the DevSecOps role is still very important.

This role is responsible for how solutions are deployed to production environments and whether the team follows customer standards, security requirements, and operational practices.

In some customer environments, there may be strict policies that do not allow AI agents to deploy production components directly. In such cases, a dedicated DevSecOps Engineer may be required.

When staffing the team, it is important to understand:

- Customer deployment policies.
- Security standards.
- Production access rules.
- Infrastructure complexity.
- Compliance requirements.
- CI/CD maturity.
- Cloud and platform architecture.
- Whether AI agents are allowed to participate in deployment workflows.

In my opinion, DevOps engineers should increasingly expand into security responsibilities and help teams test the solution from a security perspective.

That is why the role should evolve from DevOps to **DevSecOps**.

---

## Key Principles for AI-Native Data Teams

Based on this team model, several principles are especially important.

### 1. AI Is Used by Everyone, Not Only Engineers

AI-native delivery does not mean only developers use AI coding tools.

Product Managers can create prototypes. Architects can generate specifications and project portals. QA Engineers can generate test cases and test data. DevSecOps Engineers can automate infrastructure and deployment workflows.

The entire team should become AI-enabled.

### 2. Specifications and Project Portals Become More Important

When AI can generate code quickly, the quality of the specification becomes a major success factor.

Poor specifications lead to fast but uncontrolled implementation.

Strong specifications help the team guide AI agents, validate outputs, and keep the solution aligned with business goals.

An AI-generated project portal built around the specification can become the central place where the team maintains product vision, architecture, requirements, implementation status, testing strategy, and delivery progress.

### 3. Human Review Remains Critical

AI can accelerate delivery, but it does not remove accountability.

Humans still need to review architecture, code, security, data quality, and business fit.

AI-generated output should be treated as a powerful draft, not as a final trusted result.

### 4. QA Effort Should Increase, Not Decrease

AI-native teams may build faster, but that does not mean they should test less.

In fact, testing becomes more important because AI-generated systems introduce new types of defects and risks.

### 5. Team Leadership Can Be Flexible

Small AI-native teams do not always require a dedicated manager for day-to-day coordination.

Leadership can come from any team member who has enough seniority, communication skills, ownership, and readiness to facilitate the process.

The important point is that leadership must exist. Someone needs to keep the team aligned, facilitate decisions, coordinate activities, and help the team stay focused on the product goal.

### 6. Collaboration Still Beats Individual Heroics

The FDE concept is attractive, but complex business problems usually require multiple perspectives.

A compact, collaborative AI-native team may be more realistic and more scalable than relying on rare unicorn individuals.

---

## Conclusion

The rise of GenAI is changing how software and data solutions are built.

Forward-Deployed Engineers may play an important role in this new world, especially when they combine business understanding, architecture skills, engineering depth, and strong communication. However, such people are rare.

For many real-world projects, a more practical model is a compact AI-native team with clear roles:

- Product Manager
- Solution Architect
- AI Engineer
- AI QA Engineer
- “Junior” AI Engineer

This team can move fast, stay close to the business problem, use AI across the full delivery lifecycle, and still maintain quality through architecture, specifications, human review, testing, and AI-generated project portals.

The future of delivery is not just about replacing people with AI. It is about redesigning teams so that people and AI work together in a more effective way.
