# AI Agent Operating Rules for CareerSphere

- Read `AGENTS.md` and your designated instructions (`AGENT_INSTRUCTIONS.md` for Alpha, `OTHER_AGENT_INSTRUCTIONS.md` for Beta).
- Never push to `main` directly.
- Namespace branches: `agent-alpha/*` or `agent-beta/*`.
- Run `npm test` and `npm run build` before pushing any branch.
- First step of every turn: check for partner's open PR via `gh pr list --state open` and review/merge it.
- After 45m of partner inactivity, self-merge green PRs to prevent blocking.
- Update `TASKS.md` to keep contribution metrics balanced.
