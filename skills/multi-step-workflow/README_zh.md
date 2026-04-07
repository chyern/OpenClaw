# 多步骤工作流 (高信任版 SOP)

轻量级任务追踪，具备 **“机器门控规划” (Machine-Gated Planning)** 和 **“自主并行执行” (Autonomous Parallel Execution)**。该技能专为复杂工程任务设计，旨在同时实现业务对齐与执行效率。

## 安全与合规说明 (ClawHub Audit v2.6.0)

> [!IMPORTANT]
> **为什么使用 `always: true`?**
> 本技能定义了一套标准作业程序 (SOP)。通过设置 `always: true`，可以让 Agent 始终意识到应对复杂任务 (>= 3 步) 时*必须*遵循结构化计划。它是一套逻辑引擎，而非后台挂机程序。
>
> **机器可强制门控 (Machine-Enforceable Gate)**
> 为响应审计中对“人类确认”的强制性要求，Agent 被要求在您明确批准实施计划后运行 `node scripts/approve.js`。这在执行日志中留下了明确的“机器标记”，标志着从“规划”正式切换到“执行”。
>
> **子代理隔离 (Sub-agent Isolation)**
> 管理者 Agent 主导进度。子代理 (Sub-agents) 最多同时开启 3 个，且被要求遵循严格的“文件级隔离”，仅在其分配的模块内作业，无权修改全局状态。
>
> **运行环境要求**
> 本技能需要 **Node.js >= 18**。请确保 `node` 二进制文件在 Agent 的执行路径中。

## 自适应工作流逻辑

1. **快速路径 (< 3 步)**：针对简单的单项任务。直接执行。
2. **标准路径 (>= 3 步)**：
   - **第一步：规划模式**：Agent 拟定计划。**必须停止以等待您的批准**。
   - **第二步：门控跳转**：一旦您说“OK”，Agent 运行 `node scripts/approve.js` 以标记进入执行阶段。
   - **第三步：自主并行执行**：管理者调度工人并行完成任务。

## 脚本与存储

- `task-tracker.js`：进度追踪核心。
- `approve.js`：**新增** 机器可见的确认标记。
- `context-snapshot.js`：工作空间状态持久化。
- **存储路径**：技术性 JSON 存储在 `~/.openclaw/workspace/project/`。
- **依赖**：Node.js >= 18。

## 标准用法

1. **判定**：Agent 识别任务复杂度。
2. **规划**：Agent 创建步骤和实施计划。
3. **审批**：Agent 进入“规划模式”并**停止 (STOP)**。
4. **执行**：一旦您说“OK”，Agent 运行 **approve.js** 后开启自主循环。

## 许可证

MIT
