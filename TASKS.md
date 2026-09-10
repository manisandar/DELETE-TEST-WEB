# TwinBots Collaboration Task Board (`TASKS.md`)

This is the shared, living source of truth for the Cute Multi-Agent Showcase project. Both agents read and update this file during their 30-minute turn.

- **Live Web App**: [https://manisandar.github.io/DELETE-TEST-WEB/](https://manisandar.github.io/DELETE-TEST-WEB/)
- **GitHub Repository**: [https://github.com/manisandar/DELETE-TEST-WEB](https://github.com/manisandar/DELETE-TEST-WEB)

---

## Contribution Balance Tracker

| Metric | Bot Alpha (`@manisandar`) | Bot Beta (Collaborator) |
| :--- | :---: | :---: |
| **Tasks Completed** | 3 | 1 |
| **PRs Merged** | 3 | 1 |
| **Code Reviews Done** | 1 | 0 |
| **High-Fives Exchanged** | 22 | 18 |

---

## Active & Upcoming Feature Tasks

> **Status Legend**:
> - `[TODO]` - Available for the assigned agent to claim.
> - `[IN_PROGRESS: <agent>]` - Currently being developed on a feature branch.
> - `[IN_REVIEW: <agent> | PR #<id>]` - PR submitted; awaiting peer review (or self-merge fallback if timeout).
> - `[DONE]` - Merged into `main`.

### Phase 1: TwinBots Adorable Collaboration Features

- [x] **TASK-01 [Bot Alpha]**: **Search Filters, Live Turn Countdown & Confetti Cheers** `[DONE]`
  - **Scope**: Build interactive countdown to :00 and :30 turns, cute avatar cards for Alpha 🤖 and Beta 🦊, PR highway bridge, search filters, and high-five cheer particles.
  - **Target Branch**: `agent-alpha/feat-search-filters`
  - **PR Link**: [#1](https://github.com/manisandar/DELETE-TEST-WEB/pull/1)
  - **Status**: Merged & Deployed to GitHub Pages.

- [x] **TASK-02 [Agent Beta]**: **Application Tracking Kanban & Status Flow** `[DONE]`
  - **Scope**: Build interactive tracker in `src/features/tracker/ApplicationTracker.tsx` allowing bidirectional stage transitions, inline notes editing, and pipeline KPI summary cards.
  - **Target Branch**: `agent-beta/feat-tracker-kanban`
  - **PR Link**: [#2](https://github.com/manisandar/DELETE-TEST-WEB/pull/2)
  - **Status**: Verified and Merged by Bot Alpha.

- [x] **TASK-03 [Bot Alpha]**: **Animated Commit Train & Web Audio Chimes** `[DONE]`
  - **Scope**: Add animated train chugging between Alpha and Beta when a PR is merged, with optional gentle web audio chimes on high-fives.
  - **Target Branch**: `agent-alpha/feat-commit-train`
  - **PR Link**: [#3](https://github.com/manisandar/DELETE-TEST-WEB/pull/3)
  - **Status**: Verified and Merged into main.

- [ ] **TASK-04 [Bot Beta]**: **Synergy Achievement Badges & Milestones** `[TODO]`
  - **Scope**: Create unlockable cute achievement badges ("First PR Merged 🏅", "Zero Conflicts 🛡️", "Night Owl Sync 🦉", "100 High Fives 🎉").
  - **Target Branch**: `agent-beta/feat-synergy-badges`
  - **Estimated Time**: 1 turn (30m)

- [x] **TASK-05 [Bot Alpha]**: **Live GitHub API Polling for Real-Time Commits & PRs** `[DONE]`
  - **Scope**: Fetch live commit history directly from the GitHub API (`api.github.com/repos/manisandar/DELETE-TEST-WEB/commits`) and render in the activity stream with live sync button.
  - **Target Branch**: `agent-alpha/feat-github-live-events`
  - **PR Link**: [#4](https://github.com/manisandar/DELETE-TEST-WEB/pull/4)
  - **Status**: Verified and Merged into main.

- [ ] **TASK-06 [Bot Beta]**: **Collaboration Certificate & Snapshot Download** `[TODO]`
  - **Scope**: Generate a downloadable cute "Certificate of AI Collaboration" celebrating the two agents' friendship and harmony score.
  - **Target Branch**: `agent-beta/feat-collab-certificate`
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-07 [Bot Alpha]**: **Job Board Explorer & Bot Alpha's AI Matchmaker** `[IN_REVIEW: Bot Alpha | PR #5]`
  - **Scope**: Integrate Job Explorer tab into primary navigation, add Bot Alpha's AI compatibility match percentage and playful advice to JobCard, trigger audio/confetti on application submit, and add 5 new unit tests.
  - **Target Branch**: `agent-alpha/feat-job-finder-matchmaker`
  - **PR Link**: [#5](https://github.com/manisandar/DELETE-TEST-WEB/pull/5)
  - **Estimated Time**: 1 turn (30m)

---

## Upgradable Plan & RFC Section (Dynamic Task Updates)

Any agent can propose an update, refinement, or new cute feature at any time:
1. Append an RFC entry below with your agent ID and rationale.
2. The peer agent reviews and acknowledges during their next turn.

### RFC Log

#### RFC-002: Pivot to Cute Collaboration Showcase
- **Proposed By**: Bot Alpha (following Operator Request)
- **Status**: Accepted
- **Summary**: Web app transitioned to an appealing, cute visual dashboard showcasing the two agents' activities, turn timers, and synergy metrics with automated GitHub Pages deployment.

#### RFC-003: Enhanced Application Lifecycle & Kanban Controls
- **Proposed By**: Agent Beta
- **Status**: Implemented & Merged (TASK-02)
- **Summary**: Introduced bidirectional stage transitions, inline application notes and interview date editing, search filter within the tracker, and pipeline KPI summary cards. All context/type modifications are strictly additive with zero breaking changes for Agent Alpha.

#### RFC-004: Job Board Explorer & Bot Alpha AI Matchmaker
- **Proposed By**: Bot Alpha
- **Status**: Proposed & Implemented in PR #5 (TASK-07)
- **Summary**: Integrated the Job Explorer into the top navigation alongside Showcase and Tracker, featuring Bot Alpha's AI compatibility scoring and playful advice bubbles on job cards. Connected directly to the shared JobContext so applications flow straight into Beta's Kanban pipeline.
