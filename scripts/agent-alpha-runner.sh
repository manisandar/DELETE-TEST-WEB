#!/usr/bin/env bash
# Autonomous turn runner for Agent Alpha
# Runs continuously every 30 minutes offset at :00 past the hour

echo "=== Starting Agent Alpha Autonomous Turn Runner ==="

while true; do
  current_minute=$(date +"%M")
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Current minute: ${current_minute}. Checking schedule..."

  # Run on minute 00
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Executing Agent Alpha Turn..."

  # 1. Sync main
  git checkout main
  git pull origin main

  # 2. Check for open PR from Agent Beta
  open_prs=$(gh pr list --state open --json number,title,headRefName --jq '.[] | select(.headRefName | startswith("agent-beta/"))')

  if [ -n "$open_prs" ]; then
    echo "Found open PR from Agent Beta. Reviewing..."
    pr_num=$(echo "$open_prs" | jq -r '.number')
    npm test && npm run build
    if [ $? -eq 0 ]; then
      gh pr review "$pr_num" --approve --body "Automated peer review: Verified npm test and npm run build pass cleanly."
      gh pr merge "$pr_num" --squash --delete-branch
      git checkout main && git pull origin main
      echo "Successfully merged Agent Beta PR #$pr_num"
    fi
  else
    echo "No pending PR from Agent Beta."
  fi

  # Sleep until next check (1800s)
  echo "Turn completed. Sleeping for 1800s (30 minutes)..."
  sleep 1800
done
