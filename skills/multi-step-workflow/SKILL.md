---
name: multi-step-workflow
version: 2.1.4
description: "Standard Operating Procedure (SOP) for complex tasks. This skill is always available to ensure the agent follows a structured Analyze → Confirm → Decompose → Execute → Validate → Review → Complete workflow for tasks requiring multiple steps, research, or code review."
metadata:
  openclaw:
    always: true
  clawdbot:
    name: multi-step-workflow
    version: 2.1.4
    environment:
      bins:
        - node
---
# Standard Task SOP

For any task involving research, debugging, refactoring, or more than 3 steps, follow this workflow strictly.

## Phase 1: Analyze (分析)
Perform a detailed analysis of the task *within the workspace scope*. Read only files related to the task and research context relevant to the objective. Identify the scope and boundaries.

## Phase 2: Confirm (核对)
Summarize your understanding back to the user. Ask clarifying questions. Do NOT proceed until alignment is confirmed.

## Phase 3: Decompose (拆解)
Break the task into concrete steps, then register them in the task-tracker:

```bash
# Internal state is saved to ~/.openclaw/workspace/project/ for engine tracking
node scripts/task-tracker.js new "<task>" "<step1|step2|step3|...>"
```

## Phase 4: Execute (执行)
Work through steps **one at a time**. For each step:

1. Execute the current step
2. Mark it done: `node scripts/task-tracker.js done "<task>" <step_number>`
3. Briefly report what was done
4. Then proceed to the next step

**Do NOT batch multiple steps together. Complete one, report, then move to the next.**

## Phase 5: Validate (验收)
Verify the results match expectations. Run tests, check outputs, and confirm with the user.

**If validation fails:** Go back to Phase 4 — fix the issues, then re-validate. Repeat until all checks pass. Do NOT proceed to Phase 6 with known failures.

## Phase 6: Review (复盘)
Briefly summarize everything: what was done, what was learned, and any follow-up items.
**LIFECYCLE:** While script-based state is stored in `~/.openclaw/workspace/project/`, this human-readable summary **MUST** be written into your long-term memory files (e.g., `memory/YYYY-MM-DD.md` or `MEMORY.md`) to preserve the lesson across sessions.

## Phase 7: Complete (结束)
Task is done. Clean up tracker state if needed.
