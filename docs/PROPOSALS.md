# 🌐 接案網站 + CRM 一體化旗艦版 (Bento-Elite Redesign)

## 🎯 設計願景
拋棄傳統的「表單優先」邏輯，改為「專業證據優先 (Proof-First)」。採用 2026 年主流的 Bento Grid 佈局，建立高端 AI 顧問的信任感，並透過引導式表單獲取高價值客戶。

## 🏗️ 旗艦版架構 (v2.0)

### 🎨 前台：Bento-Grid 門面
- **Hero Unit**: 極簡文字定位「The Architect of AI-Driven Futures」。
- **Portfolio Bento**: 
  - [大] 主力專案展示 (含動態效果)。
  - [中] 技術棧牆 (Next.js, Tailwind, K8s, AI Agents)。
  - [小] GitHub 活動圖 (即時數據)。
  - [小] 客戶評價/信任標章。
- **CTA Box**: 「Let's Collaborate」引導式按鈕。

### 💬 獲客漏斗：引導式 Inquiry
- **Step-by-step UI**: 使用 Framer Motion 製作平滑切換。
- **智慧過濾**: 根據用戶選擇的預算與專案類型，自動在 CRM 標註為 P1 (高潛力) 或 P2 (一般)。
- **即時入庫**: 每一步資料皆透過 Server Actions 寫入 Prisma/SQLite。

### 🔐 後台：精英管理介面
- **Dashboard**: 客戶價值熱力圖。
- **Project Tracking**: Kanban 形式追蹤詢問到成交的過程。

## 🚀 開發階段 (Redesign Sprint)

### Phase 1: UI 重構 (3小時)
- [ ] 引入 `framer-motion` 與 `lucide-react`。
- [ ] 實作 Bento Grid 響應式佈局。
- [ ] 恢復並美化作品集展示內容。

### Phase 2: 對話式表單開發 (2小時)
- [ ] 實作多分步表單組件。
- [ ] 整合資料驗證 (Zod)。
- [ ] 串接後端 Prisma 寫入邏輯。

### Phase 3: CRM 深度優化 (1小時)
- [ ] 客戶狀態自動化 (New -> Quoted -> Active)。
- [ ] 簡單的 Analytics 統計。

## 🎯 下一步行動
OpenCode 立即執行 Phase 1，將首頁改造成 Bento Grid 旗艦版佈局。

**當前狀態**: 重新設計中...
## 🚀 最新進度 (2026-03-17 10:45 Taipei)\n- 啟動 Bento-Elite 旗艦版首頁 UI 重構計畫。\n- 確保首頁展示優先於 CRM 詢問單。
