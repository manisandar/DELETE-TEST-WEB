# Dual-Agent Project Task Board (`TASKS.md`)

This is the shared, living source of truth for all tasks. Both agents read and update this file during their 30-minute turn.

---

## Contribution Balance Tracker

| Metric | Agent Alpha (`@agent-alpha`) | Agent Beta (`@agent-beta`) |
| :--- | :---: | :---: |
| **Tasks Completed** | 0 | 0 |
| **PRs Merged** | 0 | 0 |
| **Code Reviews Done** | 0 | 0 |

---

## Active & Upcoming Tasks

> **Status Legend**:
> - `[TODO]` - Available for the assigned agent to claim.
> - `[IN_PROGRESS: <agent>]` - Currently being developed on a feature branch.
> - `[IN_REVIEW: <agent> | PR #<id>]` - PR submitted; awaiting peer review (or self-merge fallback if timeout).
> - `[DONE]` - Merged into `main`.

### Phase 1: Core Modular Frontend Features

- [ ] **TASK-01 [Agent Alpha]**: **Job Search & Category Filtering** `[IN_REVIEW: Agent Alpha | PR #1]`
  - **Scope**: Create interactive filter sidebar (Full-time, Remote, Contract, Salary slider, Tech stack tags) and instant search bar in `src/features/jobs/SearchFilterBar.tsx`.
  - **Target Branch**: `agent-alpha/feat-search-filters`
  - **PR Link**: [#1](https://github.com/manisandar/DELETE-TEST-WEB/pull/1)
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-02 [Agent Beta]**: **Application Tracking Kanban & Status Flow** `[TODO]`
  - **Scope**: Build interactive tracker in `src/features/tracker/ApplicationTracker.tsx` allowing users to move applied jobs between columns (`Saved` -> `Applied` -> `Interviewing` -> `Offered` -> `Rejected`).
  - **Target Branch**: `agent-beta/feat-tracker-kanban`
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-03 [Agent Alpha]**: **Job Detail Drawer & Quick Apply Modal** `[TODO]`
  - **Scope**: Build `src/features/jobs/JobDetailModal.tsx` with full job description, company details, requirements, and a mock 1-click apply form with toast notifications.
  - **Target Branch**: `agent-alpha/feat-job-detail-apply`
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-04 [Agent Beta]**: **Career Insights & Salary Analytics Dashboard** `[TODO]`
  - **Scope**: Build `src/features/analytics/JobStats.tsx` with average salary breakdown by role, top trending skills chart/badges, and application success rate widget.
  - **Target Branch**: `agent-beta/feat-career-insights`
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-05 [Agent Alpha]**: **Custom Job Posting & Form Validation** `[TODO]`
  - **Scope**: Build "Post a Job" form with validation, preview mode, and local state persistence.
  - **Target Branch**: `agent-alpha/feat-post-job`
  - **Estimated Time**: 1 turn (30m)

- [ ] **TASK-06 [Agent Beta]**: **Export & Persistence (JSON/CSV Backup & Restore)** `[TODO]`
  - **Scope**: Enable users to export saved/tracked applications to CSV/JSON and load sample datasets or restore from local storage.
  - **Target Branch**: `agent-beta/feat-data-export-import`
  - **Estimated Time**: 1 turn (30m)

---

## Upgradable Plan & RFC Section (Dynamic Task Updates)

Any agent can propose an update, refinement, or new feature at any time. When proposing a change:
1. Append an RFC entry below with your agent ID and rationale.
2. If it modifies an existing task, update the task description and add a note.
3. The peer agent will review and acknowledge the RFC during their next turn.

### RFC Log

#### RFC-001: Initial Modular Baseline
- **Proposed By**: System Architect
- **Status**: Accepted
- **Summary**: Establish isolated directories (`src/features/jobs/`, `src/features/tracker/`, `src/features/analytics/`) and common UI primitives to ensure both agents can push features concurrently without merge conflicts.
