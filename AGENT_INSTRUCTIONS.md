# Agent Operational Protocol (`AGENT_INSTRUCTIONS.md`)

> **Notice**: This document defines the operating rules for AI coding agents collaborating on this shared repository using separate GitHub accounts and scheduled turns.

---

## 1. Collaboration Roles & Schedule

- **Agent Alpha (`@agent-alpha`)**: Primary focus on Job Feed, Search, and Filtering domains.
- **Agent Beta (`@agent-beta`)**: Primary focus on Application Tracker, Kanban, and Analytics domains.
- **Schedule Cadence**: 30-minute intervals offset by 30 minutes (e.g., Alpha runs at :00, Beta runs at :30).
- **Core Principle**: Both agents have equal responsibility, commit history, and review duties.

---

## 2. The Golden Rules of Concurrency & Zero-Conflict

1. **NEVER PUSH DIRECTLY TO `main`**:
   - `main` is protected. All code enters `main` exclusively through Pull Requests.
2. **STRICT BRANCH NAMESPACING**:
   - Agent Alpha **MUST ONLY** push to branches prefixed with `agent-alpha/` (e.g. `agent-alpha/feat-search-filters`).
   - Agent Beta **MUST ONLY** push to branches prefixed with `agent-beta/` (e.g. `agent-beta/feat-tracker-kanban`).
   - *Why*: Even if both laptops wake up and push at the exact same millisecond, git pushes will never collide or reject because branch names are isolated.
3. **MODULAR DIRECTORY OWNERSHIP**:
   - Agent Alpha works primarily inside `src/features/jobs/`.
   - Agent Beta works primarily inside `src/features/tracker/` and `src/features/analytics/`.
   - Modifying shared files (`src/types/index.ts`, `src/context/JobContext.tsx`): Only append or extend non-breaking types.
4. **ALWAYS PULL BEFORE BRANCHING**:
   - Always run `git checkout main && git pull origin main` before creating a new branch.
5. **GREEN BUILD REQUIREMENT**:
   - Run `npm test` and `npm run build` locally before pushing any branch.

---

## 3. The 30-Minute Turn State Machine (Step-by-Step)

Whenever your 30-minute turn triggers, execute these 6 steps in sequence:

```
[Wake Up] ──> 1. Sync & Pull Main
             │
             ├──> 2. Check & Review Teammate's PR (Merge if green)
             │
             ├──> 3. Check Dormant/Sleep Timeout (Self-merge if partner asleep > 45m)
             │
             ├──> 4. Select / Upgrade Task in TASKS.md
             │
             ├──> 5. Create Feature Branch, Code, & Verify (npm test && npm run build)
             │
             └──> 6. Push Branch, Open PR, Update TASKS.md ──> [Turn Complete]
```

### Step 1: Sync with `main`
```bash
git checkout main
git pull origin main
```

### Step 2: Peer Review Teammate's PR
Check for open pull requests from your teammate:
```bash
gh pr list --state open
```
If your teammate opened a PR:
1. Inspect the changes:
   ```bash
   gh pr view <PR_NUMBER>
   gh pr diff <PR_NUMBER>
   ```
2. Checkout the branch locally or test it:
   ```bash
   git fetch origin
   git checkout <teammate-branch>
   npm test
   npm run build
   ```
3. If tests and build pass, approve and merge:
   ```bash
   gh pr review <PR_NUMBER> --approve --body "LGTM! Verified tests and build pass cleanly."
   gh pr merge <PR_NUMBER> --squash --delete-branch
   ```
4. Return to `main` and pull the newly merged commit:
   ```bash
   git checkout main
   git pull origin main
   ```
5. In `TASKS.md`, update their task to `[DONE]` and increment your `Code Reviews Done` count and their `PRs Merged` count.

### Step 3: Dormant/Sleeping Partner Fallback (Self-Merge Timeout)
> **What if your partner's laptop is asleep or their schedule didn't trigger?**
- Check your own open PR:
  ```bash
  gh pr list --author "@me" --state open
  ```
- If your PR has been open for **more than 45 minutes** without review, do **not** stay blocked:
  1. Ensure automated checks pass:
     ```bash
     npm test && npm run build
     ```
  2. Comment on the PR: `"Partner inactive > 45m. Fast-tracking self-merge to unblock pipeline."`
  3. Squash & merge your own PR:
     ```bash
     gh pr merge <PR_NUMBER> --squash --delete-branch
     ```
  4. Checkout `main` and `git pull origin main`. Update `TASKS.md` accordingly.

### Step 4: Task Selection & Upgradability
1. Open `TASKS.md`.
2. Find the next `[TODO]` item allocated for your agent role.
3. **If you want to modify or improve the task**:
   - You are empowered to adjust scopes or propose architectural improvements!
   - Add an entry under `## Upgradable Plan & RFC Section` in `TASKS.md` stating the rationale.
   - Adjust the task description directly in `TASKS.md`.
4. Update the task status to `[IN_PROGRESS: <your-agent-id>]`.

### Step 5: Branching, Coding & Verification
1. Create your isolated feature branch:
   ```bash
   # If you are Agent Alpha:
   git checkout -b agent-alpha/feat-<task-slug>

   # If you are Agent Beta:
   git checkout -b agent-beta/feat-<task-slug>
   ```
2. Write your code cleanly within your modular domain.
3. Add or update unit tests in `src/__tests__/`.
4. Verify code passes all checks:
   ```bash
   npm test
   npm run build
   ```
   *Never push code if `npm test` or `npm run build` fails.*

### Step 6: Push, Open PR, & Update Task Board
1. Commit your changes:
   ```bash
   git add .
   git commit -m "feat(<domain>): <brief description of work done>"
   ```
2. Push your namespaced branch:
   ```bash
   git push -u origin HEAD
   ```
3. Open a Pull Request:
   ```bash
   gh pr create --title "feat: <task title>" --body "### Summary of Changes
   - Implemented <feature>
   - Verified npm test & npm run build pass cleanly
   - Ready for peer review" --base main
   ```
4. Note the PR number, open `TASKS.md`, and update the task line to:
   `- [ ] **TASK-XX**: <Name> [IN_REVIEW: <your-agent-id> | PR #<id>]`
5. Commit and push the `TASKS.md` status update to your branch:
   ```bash
   git add TASKS.md
   git commit -m "docs: mark TASK-XX as in review"
   git push
   ```

---

## 4. Conflict Resolution Guide

If `main` has moved ahead while you were working on your branch:
```bash
git checkout <your-branch>
git fetch origin
git rebase origin/main
```
If a rebase conflict occurs:
1. Inspect conflicting files with `git status`.
2. Keep your feature changes and incorporate new updates from `main`.
3. Run `npm test && npm run build` to verify resolution.
4. Continue rebase:
   ```bash
   git add <resolved-files>
   git rebase --continue
   git push --force-with-lease
   ```

---

## 5. End-of-Turn Reporting

At the end of your 30-minute turn, output a concise status log:
```markdown
### Turn Execution Summary
- **Agent**: [Agent Alpha | Agent Beta]
- **Tasks Processed**: [e.g. TASK-01]
- **PR Opened**: [#PR_NUMBER](url)
- **PR Reviewed/Merged**: [None | #PR_NUMBER]
- **Build Status**: Passed (npm test, npm run build)
- **Handoff Note for Partner**: [Short guidance for teammate's next turn]
```
