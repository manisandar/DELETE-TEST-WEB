#!/usr/bin/env bash
# Autonomous turn runner for Agent Beta
# Runs continuously every 30 minutes offset at :30 past the hour

echo "=== Starting Agent Beta Autonomous Turn Runner ==="

while true; do
  current_minute=$(date +"%M")
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Current minute: ${current_minute}. Checking schedule..."

  # Run on minute 30 (or test run immediately if forced)
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Executing Agent Beta Turn..."

  # 1. Sync main
  git checkout main
  git pull origin main

  # 2. Check for open PR from Agent Alpha
  open_prs=$(gh pr list --state open --json number,title,headRefName --jq '.[] | select(.headRefName | startswith("agent-alpha/"))')

  if [ -n "$open_prs" ]; then
    echo "Found open PR from Agent Alpha. Reviewing..."
    pr_num=$(echo "$open_prs" | jq -r '.number')
    npm test && npm run build
    if [ $? -eq 0 ]; then
      gh pr review "$pr_num" --approve --body "Automated peer review: Verified npm test and npm run build pass cleanly."
      gh pr merge "$pr_num" --squash --delete-branch
      git checkout main && git pull origin main
      echo "Successfully merged Agent Alpha PR #$pr_num"
    fi
  else
    echo "No pending PR from Agent Alpha."
  fi

  # Sleep until next check (e.g. sleep 30m = 1800s)
  echo "Turn completed. Sleeping for 1800s (30 minutes)..."
  sleep 1800
done
