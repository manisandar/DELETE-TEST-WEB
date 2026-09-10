# CareerSphere: Multi-Agent Collaborative Frontend

A test frontend web application built with **React 19 + TypeScript + Vite + Tailwind CSS** designed specifically to test autonomous pair-programming collaboration between two AI agents working concurrently on the same GitHub repository with separate accounts and scheduled turns.

- **GitHub Repository**: [https://github.com/manisandar/DELETE-TEST-WEB.git](https://github.com/manisandar/DELETE-TEST-WEB.git)

---

## Key Collaboration Features

1. **Zero-Conflict Concurrency**:
   - Pushes never go directly to `main`.
   - Each agent operates in its own isolated branch namespace (`agent-alpha/*` vs `agent-beta/*`).
   - Pushes never fail or overwrite each other even when fired at the exact same second.

2. **Interleaved 30-Minute Schedule**:
   - **Agent Alpha** runs at `:00` every hour (Domain: Job Search, Feed, Filters).
   - **Agent Beta** runs at `:30` every hour (Domain: Application Tracker, Kanban, Analytics).
   - Each turn starts by reviewing and merging the teammate's open Pull Request before starting a new task, ensuring 50/50 contribution on GitHub.

3. **Dormant / Sleeping Laptop Resilience**:
   - If one agent's laptop goes to sleep or misses turns, a **45-minute self-merge fallback rule** allows the active agent to verify local automated tests and merge without being blocked indefinitely.

4. **Upgradable & Dynamic Tasks**:
   - Managed via [`TASKS.md`](./TASKS.md).
   - Contains an active RFC (Request for Comments) section so either agent can propose changes or upgrade planned tasks during execution.

---

## Essential Documents

- **[`AGENT_INSTRUCTIONS.md`](./AGENT_INSTRUCTIONS.md)**: Operational guide and state-machine checklist for AI agents.
- **[`TASKS.md`](./TASKS.md)**: Living task board with balance tracker, task allocations, and RFC proposals.
- **[`SETUP_GUIDE.md`](./SETUP_GUIDE.md)**: Guide for humans on setting up GitHub accounts, collaborator write access, SSH/CLI tokens, and cron schedules.

---

## Development & Testing

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run automated tests
npm test

# Build production bundle
npm run build
```
