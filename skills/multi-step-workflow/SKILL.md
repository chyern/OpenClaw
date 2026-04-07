---
name: multi-step-workflow
version: 1.11.0
description: "MUST USE for any complex task, multi-step task, research, deep debugging, refactoring, large-scale code changes, system configuration, migration, or analysis. Tracks progress with a state machine so work survives interruptions. Supports Auto-Pilot and Manual Approval modes."
metadata:
  openclaw:
    always: true
  clawdbot:
    name: multi-step-workflow
    version: 1.11.0
    environment:
      bins:
        - node
---
# Agent Workflow — Your Task Operating System

> **When to use this skill:** Any task that involves more than 3 steps, deep research, debugging, refactoring, multi-file changes, or complex analysis. If in doubt, use it — it's lightweight and recoverable.

## Quick Start (30 seconds)

When you receive a complex task, immediately run these two commands:

```bash
# 1. Register the task in the state machine
node scripts/state-machine.js init "<task_id>" "<task_name>"

# 2. Break it into trackable steps
node scripts/task-tracker.js new "<task_name>" "<step1|step2|step3|...>"

# 3. Advance to PLANNING state
node scripts/state-machine.js next "<task_id>"
```

Then, on **every subsequent turn**, run:

```bash
# Check what to do next
node scripts/workflow-status.js --auto
```

The script will tell you exactly what to do via `NEXT_ACTION` and `GUIDE`.

## Autonomous Loop (SOP)

> [!IMPORTANT]
> **Follow this loop for every turn when a task is active:**
> 1. **Check Status & Mode**: Run `node scripts/workflow-status.js --auto`.
> 2. **Follow the GUIDE output**:
>    - `GUIDE: Mode is Auto-Pilot...` → Briefly inform user, then **IMMEDIATELY PROCEED**.
>    - `GUIDE: Mode is Manual Approval...` → Briefly inform user, then **WAIT for confirmation**.
> 3. **Execute NEXT_ACTION**: Do exactly what the script says.
> 4. **Mark step done**: Run `node scripts/task-tracker.js done "<task_name>" <step_number>`.
> 5. **Repeat** from step 1.

## User Configuration

Users control the execution mode:

```bash
node scripts/set-mode.js auto     # AI proceeds without asking (Default)
node scripts/set-mode.js manual   # AI waits for approval at each step
node scripts/set-mode.js status   # Show current mode
```

## State Machine

```
IDLE → PLANNING → DELEGATING → EXECUTING → VERIFYING → MEMORYING → DONE
```

Branching states: `WAITING_SUBAGENT`, `BLOCKED`, `FAILED`.

| State | Meaning |
|-------|---------|
| `IDLE` | No active task |
| `PLANNING` | Analyzing task, breaking into steps |
| `DELEGATING` | Routing decided |
| `EXECUTING` | Running steps |
| `VERIFYING` | Checking results. Fail → retry EXECUTING |
| `MEMORYING` | Recording learned patterns |
| `BLOCKED` | Waiting for user confirmation |
| `DONE` | Task completed |
| `FAILED` | Can retry → PLANNING |

## Script Reference

### workflow-status.js (Start here)

```bash
node scripts/workflow-status.js          # Human-readable dashboard
node scripts/workflow-status.js --auto   # AI-optimized: returns NEXT_ACTION + GUIDE
```

### state-machine.js

```bash
node scripts/state-machine.js init "<id>" "<name>"        # Create task
node scripts/state-machine.js next "<id>"                  # Advance to next state
node scripts/state-machine.js get "<id>"                   # Check current state
node scripts/state-machine.js transition "<id>" "<from>" "<to>"  # Manual transition
node scripts/state-machine.js list                         # List all tasks
```

### task-tracker.js

```bash
node scripts/task-tracker.js new "<name>" "<s1|s2|s3>"     # Create steps
node scripts/task-tracker.js done "<name>" <step_number>   # Mark step done
node scripts/task-tracker.js list                          # Show all tasks
```

### context-snapshot.js

```bash
node scripts/context-snapshot.js save "<task>" "<findings>" "<pending>"  # Save before compaction
node scripts/context-snapshot.js load                                    # Restore after compaction
node scripts/context-snapshot.js clear                                   # Clean up
```
