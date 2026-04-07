# 多步骤工作流 (高信任版 SOP)

轻量级任务追踪，具备 **“机器门控规划” (Machine-Gated Planning)**、**“自主执行” (Autonomous Execution)** 和 **“用户授权式复盘” (User-Opt-In Review)**。

## 安全与合规说明 (ClawHub Audit v4.0.0)

> [!IMPORTANT]
> **零脚本配置 (Zero-Script Configuration)**
> 本版本彻底**移除**了所有配置管理脚本，转而利用 Agent 本身的逻辑推理能力。这彻底消除了审计系统中对 shell 或 node 注入的顾虑。
> - **原生配置**：Agent 直接使用官方 CLI (`openclaw config`) 读取。
> - **内置默认值**：如果配置文件不存在，Agent 会按照流程中明确定义的默认逻辑进行处理。
> - **加载安全**：移除了所有跨文件改写逻辑，所有元数据变更都必须由人工物理完成。

> [!NOTE]
> **物理安全开关 (需人工操作)**
> 在 `SKILL.md` 中设置 `always: true` 的行为依然是**严格的人工手动操作**。

## 自适应工作流逻辑

1. **快速路径 (< 3 步)**：针对简单的单项任务。直接执行。
2. **标准路径 (>= 3 步)**：
   - **第一步：规划模式**：Agent 拟定计划。**必须停止以等待您的批准**。
   - **第二步：门控跳转**：一旦您说“OK”，Agent 运行 `node scripts/approve.js` 以标记进入执行阶段。
   - **第三步：自主执行**：Agent 自动执行所有计划任务，并根据系统配置决定是否开启并行。
   - **第四步：防遗忘机制**：对于耗时极长的任务，Agent 会主动保存快照。

## 配置管理

本技能直接使用 OpenClaw 官方 CLI 及其标准审查流程进行配置。

**如需开启高吞吐量子代理并行模式**：
`openclaw config set multi-step-workflow.useSubAgents true --strict-json`

**如需查看当前生效配置**：
`openclaw config get multi-step-workflow`

## 脚本与存储说明

- `task-tracker.js`：进度追踪核心。
- `approve.js`：机器可见的确认标记。
- `context-snapshot.js`：状态快照（具备 PII 自动脱敏）。
- **依赖说明**：Node.js >= 18, OpenClaw CLI。

## 许可证

MIT
