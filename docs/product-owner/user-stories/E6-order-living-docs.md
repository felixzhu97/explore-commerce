# E6 订单域活文档

← [用户故事地图](../User-Story-Map.md)

## 背景

Order / Payment 的统一语言与领域结构未写入 Glossary 与 C4 领域图，评审只能靠代码猜测状态机与支付边界。

---

## US-14 Glossary 补齐订单与支付术语

**As a** 跨仓开发者  
**I want** Glossary 写明 Order、OrderStatus、PaymentIntent 及取消与支付不变量  
**So that** 实现与故事使用同一套 Preferred Terms

### 验收标准

1. **Scenario** 核心术语入表  
   **GIVEN** 打开 `docs/Glossary.md`  
   **WHEN** 查阅订单与支付相关条目  
   **THEN** 含 Order、OrderStatus、PaymentIntent（或等价 Preferred Term）及中文对照与定义

2. **Scenario** 不变量可核对  
   **GIVEN** Glossary 中的状态与取消说明  
   **WHEN** 对照 E5 验收场景  
   **THEN** 合法迁移与取消窗口与故事表述一致

### 状态

规划中

---

## US-15 订单领域模型图

**As a** 跨仓开发者  
**I want** `C4-Code-Domain-Model.puml` 画出 Order 聚合、行项目、状态与领域行为  
**So that** 评审可对照代码中的聚合边界与方法

### 验收标准

1. **Scenario** 聚合与实体入图  
   **GIVEN** 仓库 `docs/developer/c4-model/`  
   **WHEN** 打开 `C4-Code-Domain-Model.puml`  
   **THEN** 图中含 Order 聚合及订单行等实体/值对象，并标注 stereotype

2. **Scenario** 领域行为可核对  
   **GIVEN** 订单存在状态迁移、取消等行为  
   **WHEN** 对照领域图  
   **THEN** 图中以 `+method` 列出对应公共领域 API（或服务层编排所依赖的领域方法）

### 状态

规划中

---

## US-16 结账与支付动态图

**As a** 架构评审参与者  
**I want** `C4-Dynamic-Checkout-Payment.puml` 描述下单到支付结果再到履约起点  
**So that** 运行时路径与 E5 支付/履约边界一致

### 验收标准

1. **Scenario** 主路径完整  
   **GIVEN** 打开该 Dynamic 图  
   **WHEN** 沿顾客结账路径阅读  
   **THEN** 覆盖创建订单、发起支付、支付结果回写、进入履约起点

2. **Scenario** 与术语一致  
   **GIVEN** Glossary 中的 Order / PaymentIntent 术语  
   **WHEN** 阅读图中参与者与消息  
   **THEN** 命名使用 Preferred Terms，不另造同义名

### 状态

规划中
