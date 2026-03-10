# Product Requirements Document (PRD) - Freelance Portfolio

## 1. 產品願景與核心痛點 (Product Vision & Core Pain Points)
- **願景 (Vision)**: 打造一個高度專業、載入快速且具備現代感的個人接案網站，充分展現全端 (Full-stack)、DevOps 與 AI 的綜合技術能力，讓潛在客戶能快速了解專業背景並主動建立聯繫。
- **痛點 (Pain Points)**:
  - 潛在客戶無法透過單一管道快速且全面地了解工程師的技術廣度與深度。
  - 缺乏一個專業展示平台來突顯如遊戲開發 (Three.js)、AI 應用、DevOps 工具及系統架構等多元作品集。
  - 現有開源作品散落於 GitHub，缺乏視覺化的介面與商業價值的詮釋。

## 2. 目標用戶畫像與使用場景 (Target Personas & User Stories)
- **Persona A: 企業技術主管 (CTO/VP of Engineering)**
  - 需求：尋找能獨立完成從基礎設施到前端應用的全端工程師或技術顧問。
  - **User Story 1**: 身為企業技術主管，我想要看到候選人過去的架構設計與 DevOps 經驗，以便評估其是否能勝任我們公司的核心基礎設施重建專案。
- **Persona B: 專案發包方/創辦人 (Founders/Clients)**
  - 需求：尋求具備 AI 與系統整合能力的開發者來實現商業 MVP。
  - **User Story 2**: 身為新創創辦人，我想要快速瀏覽開發者的實作案例與聯絡方式，以便我能立即發送專案合作詢問。
- **Persona C: HR 或技術招募人員 (Tech Recruiters)**
  - 需求：篩選具備特定技術棧 (如 Go, Kubernetes, TypeScript, Three.js) 的人才。
  - **User Story 3**: 身為技術招募人員，我想要在網站上看到清晰的技術棧清單與開源專案連結，以便快速確認候選人是否符合我們的職缺要求。

## 3. 功能需求清單 (Feature Requirements)
| 功能模組 | 功能描述 | 優先級 | 驗收標準 (Acceptance Criteria) |
| --- | --- | --- | --- |
| **首頁與技術棧介紹** | 提供專業的個人簡介、技術專長 (Full-stack, DevOps, AI) 標籤。 | P0 | 頁面載入後立即顯示姓名、核心標語及技術棧圖示；支援 RWD。 |
| **作品集展示 (核心)** | 展示五大指定核心專案，包含名稱、技術棧、連結、描述與截圖。 | P0 | 必須從 `pw1131fd0-hub` 擷取/展示以下 5 個專案：<br>1. openclaw-fps<br>2. k8s-copilot<br>3. Openclaw-crm<br>4. CKAD-exec<br>5. openclaw-deployer<br>皆包含 GitHub 連結與展示圖。 |
| **聯絡表單** | 讓訪客可以直接發送訊息至指定信箱。 | P1 | 表單包含姓名、Email、主旨、訊息內容；提交後有成功提示並防止垃圾訊息 (如 reCAPTCHA 或簡易驗證)。 |
| **部落格整合** | 展示技術文章或過往心得，提升 SEO 與專業度。 | P2 | 提供 Markdown 渲染或串接外部文章平台 API (如 Medium/Dev.to)；支援分頁或無限滾動。 |
| **SEO 與效能優化** | 確保網站能被搜尋引擎良好索引。 | P1 | Lighthouse 分數雙 90+；具備正確的 meta tags、Open Graph 標籤。 |

## 4. 非功能需求 (Non-functional Requirements)
- **效能 (Performance)**:
  - 首屏載入時間 (FCP) < 1.5 秒。
  - 核心網頁指標 (Core Web Vitals): LCP < 2.5s, FID < 100ms, CLS < 0.1。
- **安全 (Security)**:
  - 全站強制使用 HTTPS。
  - 聯絡表單需具備防 XSS 與 CSRF 機制，並限制 Rate Limiting (每分鐘最多 3 次發送)。
- **可用性 (Usability)**:
  - 支援主流現代瀏覽器 (Chrome, Firefox, Safari, Edge 最新兩版)。
  - 無障礙設計 (a11y) 符合 WCAG 2.1 AA 標準。
- **擴展性 (Scalability)**:
  - 作品集與部落格內容應易於透過 CMS 或 JSON/Markdown 檔案擴充，無需修改核心程式碼。

## 5. 技術限制與選型建議 (Tech Stack Selection)
- **前端框架**: Next.js (React) 搭配 TypeScript，利用 SSG/ISR 提升載入速度與 SEO。
- **樣式與 UI**: Tailwind CSS 搭配 Framer Motion (提供專業流暢的動畫體驗)，確保專業簡潔質感。
- **部署方式**: Vercel，結合 GitHub Actions 實現 CI/CD 自動化部署。
- **資料儲存 (聯絡表單/部落格)**: 聯絡表單可整合 Resend 或 SendGrid API；部落格使用本地 MDX 檔案。

## 6. 競品分析與替代方案 (Competitor Analysis)
- **傳統履歷 (PDF/CakeResume)**: 缺乏互動性，無法動態展示 Three.js 等複雜專案。自建網站能突破此限制。
- **通用作品集平台 (Behance)**: 偏向設計師，無法突顯 DevOps/架構設計/API 整合等後端技術能力。
- **純靜態 GitHub Pages**: 若僅用 Jekyll 模板，風格容易受限且缺乏現代前端框架的高效互動體驗。因此選用 Next.js 加上自訂設計能最大化展現前端實力。

## 7. MVP 範圍與迭代路線圖 (MVP Scope & Roadmap)
- **Phase 1 (MVP - 目前階段)**:
  - 靜態首頁、專業簡介、技術棧呈現。
  - 實作「老闆回饋」指定的 5 大作品集區塊 (openclaw-fps, k8s-copilot, Openclaw-crm, CKAD-exec, openclaw-deployer)。
  - 基礎 RWD 響應式佈局與靜態聯絡方式 (Email/LinkedIn 連結)。
  - 部署上線。
- **Phase 2**: 實作動態聯絡表單 (串接寄信 API) 與進階動畫效果。
- **Phase 3**: 整合 Markdown 部落格系統與進階 SEO 優化。

## 8. UI/UX 設計規範 (UI/UX Design Guide)
- **設計哲學 (Design Philosophy)**: 遵循 [iiNumbers](http://data-sci.info/) 的極簡主義 (Minimalism)。以文字為核心，去除不必要的裝飾、陰影與複雜背景，強調資訊密度與直接性。
- **色彩計畫 (Color Palette)**:
  - **背景色 (Background)**: 純白 (`#FFFFFF`) / 純黑 (`#000000`)
  - **文字色 (Text)**: 深灰/黑 (`#111827`) / 淺灰/白 (`#F9FAFB`)
  - **強調色 (Accent)**: 僅用於連結與重要關鍵字，使用專業藍 (`#2563EB`) 或 綠色 (`#10B981`)
- **字型 (Typography)**:
  - 標題與內文: `Inter` 或系統內建黑體 (Sans-serif)，強調易讀性。
  - 裝飾性元素: 善用 Emoji (👋, ✨, 💡, 💰, 🔍, 📍) 來增加視覺層次而非圖片。
- **元件風格**:
  - 去除卡片陰影與邊框，改以間距 (Spacing) 與水平線 (Rule) 區隔。
  - 移除複雜動畫，僅保留基礎的連結 Hover 效果。
- **RWD 斷點 (Breakpoints)**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **主題切換**: 支援系統級深色/淺色模式 (Dark/Light mode) 切換。

## 9. 成功指標 (Success Metrics/KPIs)
- **曝光度**: Google Search Console 索引成功且自然搜尋點擊率 (CTR) > 2%。
- **效能表現**: Lighthouse 綜合評分 (Performance, Accessibility, Best Practices, SEO) 四項均 > 90。
- **轉換率**: 訪客停留時間 > 1 分鐘，且每 100 位訪客至少產生 1 次點擊 GitHub 連結或填寫聯絡表單的行為 (1% 轉換率)。

---
**[注意] 老闆回饋 — 最高優先 (MVP 核心需求)**
作品集區塊需明確列出以下 GitHub (`pw1131fd0-hub`) 專案，展現全端 + DevOps + AI 的能力組合：
1. **openclaw-fps**: TypeScript 瀏覽器 FPS 遊戲 (Three.js + Cannon.js)
2. **k8s-copilot**: Python K8s 智慧助手
3. **Openclaw-crm**: TypeScript CRM 系統
4. **CKAD-exec**: Go CKAD 練習工具
5. **openclaw-deployer**: Shell 自動化部署工具
