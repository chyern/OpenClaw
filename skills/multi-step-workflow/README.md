# Multi-Step Workflow

Lightweight task tracking for AI agents. Break complex tasks into steps, track progress, and preserve context across compaction.

## Why

AI agents often lose track of progress on complex tasks — especially when context gets compacted mid-work. This skill gives the agent two simple tools to stay organized.

## Security & ClawHub Notice

> [!IMPORTANT]
> **Why `always: true`?**
> This skill provides a Standard Operating Procedure (SOP) for the agent. By setting `always: true`, the agent is always aware that it *should* follow a structured workflow for any complex task. It does not run background processes but remains in the agent's eligible skillset list.
>
> **Data Storage & Path Clarity**
> - **Operational State**: Scripts (e.g., `task-tracker.js`) save technical JSON data to `~/.openclaw/workspace/project/` for internal engine tracking.
> - **Session Review**: At the end of a task (Phase 6), the agent is instructed to write a human-readable summary into its long-term memory at `memory/YYYY-MM-DD.md` or `MEMORY.md`. This captures lessons, not state.
>
> **Scope & Boundaries**
> The instructions for "reading relevant files" (Phase 1) are strictly limited to the current workspace scope. The agent is responsible for following your system's file access policies.

## Scripts

| Script | Purpose |
|--------|---------|
| `task-tracker.js` | Break tasks into steps, mark done, see progress |
| `context-snapshot.js` | Save findings before context compaction |

## Usage

### Task Tracker

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

# Clean up
node scripts/context-snapshot.js clear
```

## Storage

Technical state data stored in `~/.openclaw/workspace/project/`. Auto-created on first use.

## Dependencies

- Node.js >= 18

## License

MIT
