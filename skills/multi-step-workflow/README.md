# Multi-Step Workflow (High-Trust SOP)

Lightweight task tracking with **Machine-Gated Planning** and **Autonomous Parallel Execution**. This skill is designed for complex engineering where alignment and speed are both critical.

## Security & Compliance (ClawHub Audit v2.6.0)

> [!IMPORTANT]
> **Why `always: true`?**
> This skill encodes a Standard Operating Procedure (SOP). By setting `always: true`, the agent is constantly aware that for any complex task (>= 3 steps), it *must* follow a structured plan. It is a logic engine, not a background process.
>
> **Machine-Enforceable Gate**
> To address "human-in-the-loop" concerns, the agent is instructed to run `node scripts/approve.js` **ONLY** after you have explicitly approved the Implementation Plan. This provides a machine-verifiable signal that the planning phase has passed.
>
> **Sub-agent Isolation**
> The Manager Agent uses `spawn` (max 3 workers). Sub-agents are instructed to follow strict file-level isolation, focusing only on their assigned modules without modifying global state or tracker progress.
>
> **Runtime Requirement**
> This skill requires **Node.js >= 18**. The `node` binary must be available in the agent's path.

## Adaptive Workflow Logic

1. **Simple Path (< 3 steps)**: Direct execution. No tracking via scripts.
2. **Standard Path (>= 3 steps)**:
   - **Step 1: Planning Mode**: Agent drafts a plan. **MUST WAIT for your approval**.
   - **Step 2: Gating**: Agent runs `node scripts/approve.js` once you say "OK".
   - **Step 3: Parallel Execution**: The Manager spawns workers and completes the task autonomously.

## Scripts & Storage

- `task-tracker.js`: Core progress tracking.
- `approve.js`: **NEW** Machine-visible gate signal.
- `context-snapshot.js`: Workspace state persistence.
- **Paths**: Technical JSON stored in `~/.openclaw/workspace/project/`.
- **Dependencies**: Node.js >= 18.

## Standard Usage

1. **Analysis**: Agent identifies task complexity.
2. **Planning**: Agent creates steps and an implementation plan. 
3. **Approval**: Agent says "In Planning Mode" and **STOPS**. 
4. **Execution**: You say "OK". Agent runs **approve.js** and starts the autonomous loop.

## License

MIT
