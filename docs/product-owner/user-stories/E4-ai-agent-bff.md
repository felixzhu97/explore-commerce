# E4 AI Agent BFF

← [用户故事地图](../User-Story-Map.md)

## 背景

Commerce 经薄 BFF 调用 Explore AI Gallery（含 `support` Agent），不在店铺前端或浏览器持有 AI 服务密钥；调用时可把订单摘要并入 invoke message 作为上下文。

---

## US-10 经 Commerce 代理调用 Gallery Agent

**As a** 已登录的 Commerce API 调用方  
**I want** 列出并调用 Explore AI Agents  
**So that** 客服与运营经本服务访问 Gallery，且 AI 密钥仅留在服务端

### 验收标准

1. **Scenario** 列出可用 Agent  
   **GIVEN** `EXPLORE_AI_BASE_URL` 与 `EXPLORE_AI_SERVICE_KEY` 已配置  
   **WHEN** `GET /api/ai/agents`（带 JWT）  
   **THEN** 转发 `GET {AI}/api/agents`，请求头含 `X-Service-Key` 与 `X-Client-Id`

2. **Scenario** 带订单摘要调用 support  
   **GIVEN** 同上  
   **WHEN** `POST /api/ai/agents/support/invoke` body 含 `message` 与可选 `orderSummary`  
   **THEN** 上游收到合并后的 message，并返回 `reply`

### 状态

已实现
