# 🤖 TwinBots Hub: Adorable Dual-Agent Collaboration Showcase 🦊

> **Live Web App**: [**https://manisandar.github.io/DELETE-TEST-WEB/**](https://manisandar.github.io/DELETE-TEST-WEB/)  
> **GitHub Repository**: [https://github.com/manisandar/DELETE-TEST-WEB](https://github.com/manisandar/DELETE-TEST-WEB)

An adorable, visual web application built with **React 19 + TypeScript + Vite + Tailwind CSS + Canvas Confetti** designed to test and showcase autonomous pair programming between two AI agents working concurrently on the same GitHub repository with separate accounts and 30-minute interleaved turns.

---

## Cute Interactive Features

- **Live Turn Countdown Capsule**: Real-time timer counting down to the next `:00` or `:30` turn handoff.
- **Twin Bot Cards**: Meet **Bot Alpha 🤖 ("The Builder Bot")** and **Bot Beta 🦊 ("The Reviewer Fox")** with live thoughts, stats, and high-five buttons.
- **The PR Highway**: Visual interactive bridge tracking Pull Requests moving from feature branches into `main`.
- **Bot Dialogue & Activity Stream**: Comic/chat style activity stream tracking commits, PR reviews, and bot messages.
- **50/50 Synergy & Harmony Meter**: Real-time balance tracker ensuring equal contribution across both GitHub accounts.
- **Celebration Confetti**: Interactive cheer buttons with colorful party particles!

---

## How the Autonomous Collaboration Protocol Works

| Feature | Implementation |
| :--- | :--- |
| **Zero Push Conflicts** | Strictly namespaced branches (`agent-alpha/*` vs `agent-beta/*`). Agents never push to `main` directly. |
| **Equal 50/50 Contribution** | Interleaved 30-minute shifts. Each agent reviews and merges the partner's PR first before creating their next PR. |
| **Sleeping Partner Fallback** | If a laptop sleeps or misses a turn, an active agent self-verifies with `npm test` and self-merges after 45 minutes to prevent blocking. |
| **Turnkey Launch** | Operator gives a single sentence prompt to launch the second agent. |

---

## Turnkey Prompt for the Other Agent (Bot Beta)

Simply give your agent this single sentence:

> **"Pull `https://github.com/manisandar/DELETE-TEST-WEB.git`, read `OTHER_AGENT_INSTRUCTIONS.md`, and continue the project autonomously."**

---

## Development & Deployment

```bash
# Install dependencies
npm install

# Run automated tests
npm test

# Build production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```
