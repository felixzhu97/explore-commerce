# E AI Agent BFF（Agentforce 形态）

← [用户故事地图](../User-Story-Map.md)

## 背景

对标 Salesforce Agentforce 领域 Agent：Commerce 不嵌入 Salesforce SDK，经薄 BFF 调用 Explore AI Gallery（含 `support`），可选把订单摘要拼进 invoke message（Grounding）。

---

## US-AI-01 经 Commerce 代理调用 Gallery Agent

**As a** 已登录的 Commerce API 调用方  
**I want** 列出并调用 Explore AI Agents  
**So that** 客服/运营能力复用 Explore AI，浏览器与店铺前端不持有 AI 服务密钥

### 验收标准

1. **Scenario** 列表  
   **GIVEN** `EXPLORE_AI_BASE_URL` 与 `EXPLORE_AI_SERVICE_KEY` 已配置  
   **WHEN** `GET /api/ai/agents`（带 JWT）  
   **THEN** 转发 `GET {AI}/api/agents`，请求头含 `X-Service-Key` 与 `X-Client-Id`

2. **Scenario** 带订单摘要提问  
   **GIVEN** 同上  
   **WHEN** `POST /api/ai/agents/support/invoke` body 含 `message` 与可选 `orderSummary`  
   **THEN** 上游收到合并后的 message，并返回 `reply`

### 状态

已实现
