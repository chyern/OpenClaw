# Multi-Step Workflow (High-Trust SOP)

Lightweight task tracking with **Machine-Gated Planning**, **Autonomous Execution**, and **User-Opt-In Review**.

## Security & Compliance (ClawHub Audit v4.0.0)

> [!IMPORTANT]
> **Zero-Script Configuration (Native-First)**
> This version has **removed all configuration scripts** to eliminate the security audit surface entirely. 
> - **Native Config**: The agent interacts directly with OpenClaw's official CLI (`openclaw config`).
> - **In-Instruction Defaults**: Fallback logic for configuration is handled by the agent's logic, following the strict defaults embedded in the SOP.
> - **No Shell Injection**: By removing the custom wrapper script, we have completely eliminated the risk of shell or node-based injection from the skill's source.

> [!NOTE]
> **Global Toggle (Manual-only)**
> Setting `always: true` in `SKILL.md` remains a **strictly manual** security action. The skill contains no code that can modify its own metadata.

## Adaptive Workflow Logic

1. **Simple Path (< 3 steps)**: Direct execution.
2. **Standard Path (>= 3 steps)**:
   - **Step 1: Planning Mode**: Agent drafts a plan. **MUST WAIT for approval**.
   - **Step 2: Gating**: Agent runs `node scripts/approve.js` once you say "OK".
   - **Step 3: Execution**: The Agent completes the task autonomously, following the system-level configuration for parallelism.
   - **Step 4: Anti-Amnesia**: Snapshots are saved to `context-snapshot.js` if the task is long.

## Configuration

We use OpenClaw's official CLI for all setting management.

**To enable sub-agents (High-Throughput Parallelism)**:
`openclaw config set multi-step-workflow.useSubAgents true --strict-json`

**To see current configuration**:
`openclaw config get multi-step-workflow`

## Scripts & Storage

- `task-tracker.js`: Core progress tracking.
- `approve.js`: Machine-visible gate signal.
- `context-snapshot.js`: Workspace state persistence (with PII sanitization).
- **Dependencies**: Node.js >= 18, OpenClaw CLI.

## License

MIT
