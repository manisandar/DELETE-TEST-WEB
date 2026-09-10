# Multi-Agent Collaboration Setup Guide (`SETUP_GUIDE.md`)

This guide explains how to set up the repository, permissions, and scheduling so two AI agents (on separate machines with separate GitHub accounts) can collaborate seamlessly.

---

## 1. What You Need

1. **Two GitHub Accounts**:
   - **Account A** (e.g. repo owner or collaborator)
   - **Account B** (collaborator)
2. **Two Development Machines**:
   - Machine A (running Agent Alpha)
   - Machine B (running Agent Beta)
3. **Software Installed on Both Machines**:
   - Node.js (v18+ or v20+) and npm
   - Git (v2.30+)
   - GitHub CLI (`gh`) (install via `brew install gh` or OS package manager)

---

## 2. GitHub Repository Setup (One-time)

### Step 2.1: Create & Push the Repository
On Machine A (Account A):
```bash
cd "/path/to/job finding"
git init
git add .
git commit -m "chore: initial commit of collaborative job finding app"
git branch -M main
gh repo create job-finding-app --public --source=. --remote=origin --push
```

### Step 2.2: Invite Account B as Collaborator
1. On GitHub, navigate to **Settings > Collaborators > Add people**.
2. Search for Account B's username and invite them with **Write** (or Admin) access.
3. Account B accepts the email invitation or accepts at `https://github.com/<owner>/job-finding-app/invitations`.

### Step 2.3: Recommended GitHub Settings
1. Go to **Settings > Branches** > **Add branch protection rule** for `main`:
   - Check **Require a pull request before merging**.
   - (Optional) Uncheck "Require approvals" if you want to allow self-merging when partner is asleep, OR set required approvals to `1`.
   - Check **Allow force pushes**: Leave unchecked (protects `main`).

---

## 3. Machine Authentication Setup

### On Machine A (Agent Alpha):
```bash
# Set git identity
git config --global user.name "Agent Alpha"
git config --global user.email "account-a@example.com"

# Authenticate GitHub CLI
gh auth login
# Choose GitHub.com -> HTTPS/SSH -> follow web login
```

### On Machine B (Agent Beta):
```bash
# Clone the repository
git clone https://github.com/<owner>/job-finding-app.git
cd job-finding-app
npm install

# Set git identity
git config --global user.name "Agent Beta"
git config --global user.email "account-b@example.com"

# Authenticate GitHub CLI
gh auth login
# Choose GitHub.com -> HTTPS/SSH -> authenticate with Account B
```

---

## 4. Scheduling the Agents (30-min offset)

To ensure the agents run in alternating 30-minute turns without clashing:

### Option A: Using Cron on Mac/Linux

**On Machine A (Agent Alpha)**:
Schedule Agent Alpha to run at the top of the hour (:00) every hour:
```bash
crontab -e
# Runs at minute 0 every hour:
0 * * * * cd "/path/to/job finding" && <agent-command-or-script>
```

**On Machine B (Agent Beta)**:
Schedule Agent Beta to run at minute 30 (:30) every hour:
```bash
crontab -e
# Runs at minute 30 every hour:
30 * * * * cd "/path/to/job-finding-app" && <agent-command-or-script>
```

### Option B: Using Antigravity / AI Agent Prompt
When triggering the agent, feed it the following kickoff instruction:
> *"You are Agent Alpha (or Agent Beta). Read `AGENT_INSTRUCTIONS.md` and `TASKS.md`. Follow the 30-minute turn state machine: pull main, review any open PR from your partner, claim your next task, implement, run tests, and open a PR."*

---

## 5. Summary of Built-in Protections

| Problem | How It Is Handled |
| :--- | :--- |
| **Simultaneous Pushes** | Branch names are namespaced (`agent-alpha/*` vs `agent-beta/*`). Pushes never collide remotely. |
| **Partner Laptop Sleep** | Self-merge fallback rule triggers if partner PR review is idle for > 45 minutes. |
| **Task Conflicts** | Tasks are pre-allocated by domain and tracked atomically in `TASKS.md`. |
| **Code Regression** | Both agents must run `npm test && npm run build` before pushing and before merging peer PRs. |
| **Changing Requirements** | RFC section in `TASKS.md` allows on-the-fly task upgrades with partner notification. |
