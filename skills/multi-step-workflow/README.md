# Agent Workflow

**Universal agent workflow engine with state machine.** Use for any complex multi-step task: research, debugging, configuration, building, analysis, documentation. Fully self-managing.

## Mode Choice: Adaptive Execution

> [!IMPORTANT]
> This skill supports both **Auto-Pilot** (Autonomous) and **Manual Approval** modes.
> - **Auto-Pilot**: AI proceeds automatically (Default).
> - **Manual Approval**: AI waits for your confirmation at every step.
>
> Switch mode: `node scripts/set-mode.js <auto|manual>`

## Architecture

```
Task Input → [State Machine] → Completion
                 ↑
           ┌─────┴─────┐
           │           │
        Scripts      Loop
        Advance      Next
        task-tracker Steps
        state-machine
        workflow-status (Unified View)
```

The workflow is driven by multiple scripts coordinated through a state machine. The state machine tracks the stage of each task; scripts communicate via files, maintaining independence and testability.

## Design

### Why a State Machine?

Agents are often interrupted mid-task, need to spawn sub-agents, or re-plan halfway. The state machine makes every stage clear and recoverable—if the agent crashes mid-task, the state is saved, and the next session can resume directly.

### Script Responsibilities

- **task-tracker.js** — Step tracking. Automatically triggers state transition suggestions.
- **state-machine.js** — Lifecycle management.
- **context-snapshot.js** — Task context snapshot to prevent information loss from context compaction.
- **workflow-status.js** — Unified view and **intelligence provider** (NEXT_ACTION).
- **set-mode.js** — Toggle between Auto-Pilot and Manual modes.

### State Machine

```
IDLE → PLANNING → DELEGATING → EXECUTING → VERIFYING → MEMORYING → DONE
                            ↓
                     WAITING_SUBAGENT → EXECUTING
                            ↓
                       BLOCKED → EXECUTING (or DONE if cancelled)
```

| State | Entrance Condition |
|-------|---------|
| IDLE | No active task |
| PLANNING | New task received, scope analyzed |
| DELEGATING | Plan ready, routing decided |
| EXECUTING | Steps in execution |
| VERIFYING | Results checked against expectations. Fail → retry EXECUTING |
| WAITING_SUBAGENT | Sub-agent launched, waiting for result |
| MEMORYING | All steps done, patterns recorded |
| BLOCKED | Waiting for user confirmation |
| DONE | Task complete |
| FAILED | Unrecoverable error, retry possible |

## Script API

#### workflow-status.js (Recommended)

```bash
# Get a unified view/recommendation
node workflow-status.js [--auto]
```

#### task-tracker.js

```bash
# Create a task with steps
node task-tracker.js new "<task>" "<step1|step2|step3>"

# Mark step as done (automatically moves state to VERIFYING if done)
node task-tracker.js done "<task>" 1
```

#### state-machine.js

```bash
# Initialize a new task
node state-machine.js init "<task_id>" "<task_name>"

# Transition state (use next for sequential flow)
node state-machine.js next "<task_id>"
```

#### context-snapshot.js

```bash
# Save key findings before context compaction
node context-snapshot.js save "<task>" "<findings>" "<pending>"
```

## Dependencies

- `node` (version >= 18)

**Zero-config**: Scripts automatically create the `~/.openclaw/workspace/project/` storage directory.

## External Endpoints

None. This skill is self-contained and operates on the local filesystem only.

## Security & Privacy

This skill stores state in `~/.openclaw/workspace/project/`. It never transmits user data or code to any external servers.

## Trust Statement

Standard OpenClaw skill workflow management. No destructive actions on user source code unless explicitly part of the task (e.g. refactoring).

## License

MIT
