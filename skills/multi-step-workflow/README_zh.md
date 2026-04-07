# 多步骤工作流 (自适应 SOP)

轻量级 AI Agent 任务追踪工具。将复杂任务拆解为步骤，追踪进度，并在上下文压缩时保留关键发现。该技能使用**自适应工作流**，可高效处理简单和复杂的任务。

## 自适应工作流逻辑

为了防止简单任务过度工程化，Agent 遵循以下分流逻辑：

1. **快速路径 (Simple Path < 3 步)**：针对简单任务（如读取单个文件、解释代码片段）。Agent 直接执行，无需正式的任务追踪。
2. **标准路径 (Standard Path >= 3 步)**：针对工程任务（如重构、调试、研究，或任何需要 3 步及以上的任务）。Agent 遵循完整的 7 阶段 SOP，并使用 `task-tracker.js`。

## 为什么需要

AI Agent 在处理复杂任务时，经常会丢失进度——尤其是上下文被压缩之后。这个 Skill 既给 Agent 提供了保持条理的工具，又兼顾了处理小请求的灵活性。

## 安全与 ClawHub 说明

> [!IMPORTANT]
> **为什么使用 `always: true`?**
> 本技能提供了一套标准作业程序 (SOP)。通过设置 `always: true`，可以让 Agent 始终意识到应对复杂任务时*应该*采用结构化的工作流。本技能不含后台常驻进程，风险极低。
>
> **存储与路径说明**
> - **运行状态 (Technical State)**：脚本（如 `task-tracker.js`）会将技术性的 JSON 数据保存到 `~/.openclaw/workspace/project/`，用于引擎内部追踪进度。
> - **复盘记录 (Review Result)**：在标准路径任务结束时，复盘总结会写进其长期记忆 `memory/YYYY-MM-DD.md` 或 `MEMORY.md`。简单路径任务会跳过此步骤。

## 脚本

| 脚本 | 用途 |
|------|------|
| `task-tracker.js` | 拆分任务为步骤，标记完成，查看进度 |
| `context-snapshot.js` | 在上下文压缩前保存关键发现 |

## 使用方式

### 任务追踪 (标准路径)

```bash
# 创建带步骤的任务
node scripts/task-tracker.js new "重构认证" "分析|设计|实现|测试"

# 标记步骤 1 完成
node scripts/task-tracker.js done "重构认证" 1

# 查看所有任务
node scripts/task-tracker.js list
```

### 上下文快照

```bash
# 压缩前保存
node scripts/context-snapshot.js save "重构认证" "发现3个模式" "剩余实现部分"

# 压缩后恢复
node scripts/context-snapshot.js load
```

## 存储

技术状态数据存储在 `~/.openclaw/workspace/project/`，首次使用时自动创建。

## 依赖

- Node.js >= 18

## License

MIT
