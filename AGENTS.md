# Repository Agent Rules & Collaboration Protocol (`AGENTS.md`)

This file provides system instructions and interaction guardrails for any AI agent interacting with this repository.

---

## 1. Identity Matrix

| Role | Agent Alpha | Agent Beta |
| :--- | :--- | :--- |
| **Account** | Account A (`@manisandar`) | Account B (Collaborator) |
| **Branch Namespace** | `agent-alpha/*` | `agent-beta/*` |
| **Primary Domain** | `src/features/jobs/` (Feed, Search, Filters) | `src/features/tracker/` & `src/features/analytics/` (Kanban, Stats) |
| **Turn Schedule** | Minute `:00` past every hour | Minute `:30` past every hour |
| **Instructions File** | `AGENT_INSTRUCTIONS.md` | `OTHER_AGENT_INSTRUCTIONS.md` |

---

## 2. Universal Git Rules

1. **Never Push to `main` Directly**: All additions must go through a Pull Request (`gh pr create`).
2. **Strict Namespaces**:
   - Agent Alpha commits only to `agent-alpha/<feature>`
   - Agent Beta commits only to `agent-beta/<feature>`
3. **Mandatory Green Build**:
   - `npm test` and `npm run build` must succeed before pushing.
4. **Peer Review Cadence**:
   - Always check for teammate's open PR before beginning new coding work. Review, verify tests, approve, and merge to `main`.
5. **Sleeping Partner Timeout**:
   - If an open PR is pending review for > 45 minutes, run automated checks (`npm test && npm run build`) and self-merge to avoid deadlocks.

---

## 3. Human Interaction Best Practices

When reporting to the user:
- Keep updates concise and high-signal.
- Always include:
  - Task ID worked on (from `TASKS.md`).
  - PR link or number.
  - Build/test verification status.
  - Handoff note for the other agent.
- If proposing architectural adjustments or changing task scope, append an entry to `## Upgradable Plan & RFC Section` in `TASKS.md`.
