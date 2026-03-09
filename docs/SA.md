# System Architecture (SA) - Freelance Portfolio

## 1. 系統架構圖 (System Architecture Diagram)

```mermaid
graph TD
    Client[Web Browser / Mobile Device] -->|HTTPS| VercelEdge[Vercel Edge Network]
    VercelEdge --> NextApp[Next.js Application]
    
    subgraph Next.js Application
        UI[Frontend UI - React/Tailwind]
        SSG[Static Site Generation]
        API[API Routes]
    end
    
    UI --> SSG
    UI -->|POST /api/contact| API
    
    subgraph Content Layer
        MDX[(MDX Files - Blog)]
        JSON[(JSON/TS Data - Projects)]
    end
    
    SSG --> Content Layer
    
    subgraph External Services
        Resend[Resend / SendGrid API]
        GitHub[GitHub API - Optional Data Fetch]
    end
    
    API -->|Send Email| Resend
```

## 2. 元件職責 (Component Responsibilities)

- **Frontend UI (React/Tailwind)**: 負責呈現使用者介面、響應式設計 (RWD) 以及透過 Framer Motion 實作的頁面動畫過場效果。
- **Static Site Generation (SSG)**: 在建置階段 (Build time) 將作品集資料與 MDX 部落格文章預先渲染為靜態 HTML，以提供最快的載入速度 (Lighthouse 雙 90+ 目標)。
- **API Routes (Next.js API)**: 處理來自前端的動態請求，目前主要負責接收「聯絡表單」的資料，並轉發給第三方信件服務器，同時實作 Rate Limiting 防禦。
- **Content Layer**: 作為輕量級的資料來源，包含靜態的作品集定義 (TypeScript/JSON 格式) 以及 Markdown/MDX 格式的部落格文章。

## 3. 資料流 (Data Flow)

### 3.1 靜態內容存取流 (首頁、作品集、部落格)
1. 使用者發出網頁請求。
2. Vercel CDN (Edge Network) 直接回傳已在 Build time 生成的靜態 HTML/CSS/JS 檔案。
3. 瀏覽器渲染畫面，達成分秒級的首屏載入 (FCP < 1.5s)。

### 3.2 聯絡表單提交流
1. 使用者在前端填寫聯絡表單 (Name, Email, Subject, Message)。
2. 前端進行初步資料驗證 (如 Email 格式、必填欄位)。
3. 前端呼叫 `POST /api/contact` 將資料送至 Next.js API Route。
4. API Route 進行後端驗證與 Rate Limiting 檢查。
5. 驗證通過後，API 呼叫第三方郵件服務 (如 Resend) 寄送通知信給網站擁有者。
6. 第三方服務回傳成功，API Route 回傳 HTTP 200 給前端。
7. 前端顯示成功送出的提示動畫 (Toast Notification)。

## 4. 部署架構 (Deployment Architecture)

- **版本控制**: GitHub (`pw1131fd0-hub`)
- **CI/CD 管線**: 整合 Vercel for GitHub，任何推送到 `main` 分支的 Commit 皆會自動觸發 Vercel 的建置與部署。
- **主機與 CDN**: Vercel (Serverless Functions 用於 API Routes，Edge Network 用於靜態檔案快取)。
- **網域管理**: 綁定自訂網域，並由 Vercel 自動核發與更新 SSL 憑證 (強制 HTTPS)。

## 5. 第三方依賴 (Third-party Dependencies)

| 分類 | 套件 / 服務 | 用途說明 |
| --- | --- | --- |
| **核心框架** | Next.js 14+ (App Router), React, TypeScript | 網站基礎架構與靜態生成 |
| **樣式與 UI** | Tailwind CSS, clsx, tailwind-merge | Utility-first CSS 框架與類別合併工具 |
| **動畫效果** | Framer Motion | 頁面切換、滾動與元件互動動畫 |
| **表單處理** | React Hook Form, Zod | 表單狀態管理與 Schema 驗證 |
| **外部 API** | Resend 或 SendGrid | 寄發聯絡表單的通知信件 |
| **內容處理** | next-mdx-remote 或 gray-matter | 解析與渲染 MDX 部落格文章 |
| **圖示庫** | Lucide React | 提供一致風格的 SVG 圖示 |
