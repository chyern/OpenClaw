# Multi-Step Workflow (Adaptive SOP)

Lightweight task tracking for AI agents. Break complex tasks into steps, track progress, and preserve context across compaction. This skill uses an **Adaptive Workflow** to handle both simple and complex tasks efficiently.

## Adaptive Workflow Logic

To prevent over-engineering simple tasks, the agent follows a branching logic:

1. **Simple Path (<= 3 steps)**: For straightforward tasks (reading a file, explaining code). The agent proceeds directly without formal tracking.
2. **Standard Path (> 3 steps)**: For engineering tasks (refactoring, debugging, research). The agent follows the full 7-phase SOP and uses `task-tracker.js`.

## Why

AI agents often lose track of progress on complex tasks — especially when context gets compacted mid-work. This skill gives the agent two simple tools to stay organized while remaining agile for small requests.

## Security & ClawHub Notice

> [!IMPORTANT]
> **Why `always: true`?**
> This skill provides a Standard Operating Procedure (SOP) for the agent. By setting `always: true`, the agent is always aware that it *should* follow a structured workflow for any complex task. It does not run background processes but remains in the agent's eligible skillset list.
>
> **Data Storage & Path Clarity**
> - **Operational State**: Scripts (e.g., `task-tracker.js`) save technical JSON data to `~/.openclaw/workspace/project/` for internal engine tracking.
> - **Session Review**: At the end of a complex task (Standard Path), a human-readable summary is written into `memory/YYYY-MM-DD.md` or `MEMORY.md`. This is skipped for Simple Path tasks.

## Scripts

| Script | Purpose |
|--------|---------|
| `task-tracker.js` | Break tasks into steps, mark done, see progress |
| `context-snapshot.js` | Save findings before context compaction |

## Usage

### Task Tracker (Standard Path)

```bash
# Create a task with steps
node scripts/task-tracker.js new "refactor auth" "analyze|design|implement|test"

# Mark step 1 done
node scripts/task-tracker.js done "refactor auth" 1

# See all tasks
node scripts/task-tracker.js list
```

### Context Snapshot

```bash
# Save before compaction
node scripts/context-snapshot.js save "refactor auth" "found 3 patterns" "implement remaining"

# Restore after compaction
node scripts/context-snapshot.js load
```

## Storage

Technical state data stored in `~/.openclaw/workspace/project/`. Auto-created on first use.

## Dependencies

- Node.js >= 18

## License

MIT
