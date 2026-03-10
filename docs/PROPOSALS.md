# 接案網站開發提案 (Freelance Portfolio)

老闆，目前接案網站的 SA/SD 已完成，準備進入實作階段。

## 🛠️ 開發計畫 (v1.0 MVP)
我們將使用 **Next.js 14 (App Router)** + **Tailwind CSS** + **Framer Motion** 進行開發。

### 第一階段：環境初始化與核心架構 (預計 1 小時)
- [ ] 執行 `npx create-next-app@latest` 初始化專案。
- [ ] 設定基礎目錄結構 (`src/components`, `src/app`, `src/lib`)。
- [ ] 安裝核心套件 (`framer-motion`, `lucide-react`, `zod`, `react-hook-form`)。

### 第二階段：靜態資料與 UI 元件 (預計 2 小時)
- [ ] 建立專案與部落格的 TypeScript 資料定義。
- [ ] 實作 Navbar, Footer 與作品集卡片元件。
- [ ] 導入首頁 (Hero Section) 的入場動畫。

### 第三階段：聯絡功能與部署 (預計 1 小時)
- [ ] 實作 `POST /api/contact` 與 Resend API 串接。
- [ ] 撰寫 GitHub Actions 進行 Vercel 自動部署。

## 💡 建議老闆下一步
1. **確認信箱服務**：MVP 建議使用 [Resend](https://resend.com/)，免費額度充足且設定極快。
2. **準備作品集內容**：您可以提供 2-3 個希望展示的專案名稱與描述，我會將它們寫入靜態資料中。

老闆確認沒問題的話，回覆「開始開發」，我就讓 OpenCode 啟動第一階段任務！🦞🚀
