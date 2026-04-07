# 多步骤工作流 (SOP)

轻量级 AI Agent 任务追踪工具。将复杂任务拆解为步骤，追踪进度，并在上下文压缩时保留关键发现。

## 为什么需要

AI Agent 在处理复杂任务时，经常会丢失进度——尤其是上下文被压缩之后。这个 Skill 给 Agent 提供了两个简单的工具来保持条理。

## 安全与 ClawHub 说明

> [!IMPORTANT]
> **为什么使用 `always: true`?**
> 本技能提供了一套标准作业程序 (SOP)。通过设置 `always: true`，可以让 Agent 始终意识到应对复杂任务时*应该*采用结构化的工作流。本技能不含后台常驻进程，风险极低。
>
> **存储与路径说明**
> - **运行状态 (Technical State)**：脚本（如 `task-tracker.js`）会将技术性的 JSON 数据保存到 `~/.openclaw/workspace/project/`，用于引擎内部追踪进度。
> - **复盘记录 (Review Result)**：在任务结束阶段（Phase 6），Agent 被要求将人类可读的总结写进其长期记忆 `memory/YYYY-MM-DD.md` 或 `MEMORY.md`。这存储的是经验教训，而非运行状态。
>
> **任务范围**
> 第 1 阶段（分析阶段）的文件读取指令严格限制在工作区 (Workspace) 范围内。Agent 会遵循您的系统文件访问策略。

## 脚本

| 脚本 | 用途 |
|------|------|
| `task-tracker.js` | 拆分任务为步骤，标记完成，查看进度 |
| `context-snapshot.js` | 在上下文压缩前保存关键发现 |

## 使用方式

### 任务追踪

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

# 清理
node scripts/context-snapshot.js clear
```

## 存储

技术状态数据存储在 `~/.openclaw/workspace/project/`，首次使用时自动创建。

## 依赖

- Node.js >= 18

## License

MIT
