---
name: multi-step-workflow
version: 2.2.0
description: "Adaptive SOP for any task. Efficiently handles both simple tasks (1-3 steps) and complex engineering tasks via a branching workflow (Analyze → Triage → Standard/Simple Path)."
metadata:
  openclaw:
    always: true
  clawdbot:
    name: multi-step-workflow
    version: 2.2.0
    environment:
      bins:
        - node
---
# Standard Task SOP (Adaptive)

When you receive a task, follow this branching workflow to ensure efficiency and reliability.

## Phase 0: Triage & Analyze (分析与分流)
1. **Analyze**: Perform a quick analysis of the task scope within the workspace.
2. **Threshold Check**: Decide on the execution path:
   - **Simple Path**: If the task is straightforward (e.g., read 1-2 files, explain code, run 1 command) and can be completed in **3 or fewer steps**.
   - **Standard Path**: If the task involves research, debugging, multi-file refactoring, or **more than 3 steps**.

---

## [Path A] Simple Path (快速路径)
1. **Confirm**: Briefly state what you are about to do.
2. **Execute**: Perform the task directly. No need for `task-tracker`.
3. **Report**: Deliver the result to the user.
4. **End**: No formal Review (Phase 6) or Memory file update required.

---

## [Path B] Standard Path (标准流程)
Follow the full structured SOP for complex tasks.

### Phase 1: Confirm (核对)
Summarize your understanding back to the user. Ask clarifying questions. Do NOT proceed until alignment is confirmed.

### Phase 2: Decompose (拆解)
Break the task into concrete steps, then register them in the task-tracker:

```bash
# Internal state is saved to ~/.openclaw/workspace/project/ for engine tracking
node scripts/task-tracker.js new "<task>" "<step1|step2|step3|...>"
```

### Phase 3: Execute (执行)
Work through steps **one at a time**. For each step:
1. Execute the current step.
2. Mark it done: `node scripts/task-tracker.js done "<task>" <step_number>`
3. Briefly report what was done.
4. Then proceed to the next step.

**Do NOT batch multiple steps together. Complete one, report, then move to the next.**

### Phase 4: Validate (验收)
Verify the results match expectations. Run tests, check outputs, and confirm with the user.
**If validation fails:** Go back to Phase 3 — fix the issues, then re-validate. Do NOT proceed until all checks pass.

### Phase 5: Review (复盘)
Briefly summarize: what was done, what was learned, and follow-up items.
**IMPORTANT:** Write this summary into your workspace memory files (`memory/YYYY-MM-DD.md` or `MEMORY.md`) to preserve the lesson across sessions.

### Phase 6: Complete (结束)
Task is done. Clean up tracker state if needed.
