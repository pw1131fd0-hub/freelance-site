# 🌐 接案網站 + CRM 一體化系統開發 

## 🎯 整合目標
將現有的接案網站與 CRM 客戶管理系統整合為統一平台，提供完整的業務解決方案。

## 🏗️ 系統架構

### 前台區域 (公開展示)
- **首頁** - Hero Section + 技能展示
- **關於我** - 個人簡介與專業經歷  
- **作品集** - 專案展示與案例研究
- **聯絡我** - 客戶詢問表單 (整合 CRM)

### 後台區域 (管理介面)
- **Dashboard** - 總覽儀表板 (客戶統計、專案狀態)
- **Clients** - 客戶列表與詳情管理
- **Projects** - 專案狀態追蹤與更新
- **Settings** - 系統設定與個人資料

### 資料庫設計
```prisma
model Client {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  phone     String?
  company   String?
  source    String?   // "contact_form", "referral", "direct"
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  projects  Project[]
  notes     ClientNote[]
}

model Project {
  id             Int      @id @default(autoincrement())
  clientId       Int
  title          String
  description    String?
  budgetRange    String?
  status         String   @default("inquiry") // inquiry, quoted, approved, in_progress, completed, cancelled
  priority       String   @default("medium")  // low, medium, high, urgent
  estimatedHours Int?
  quotedAmount   Float?
  actualHours    Float?
  startDate      DateTime?
  endDate        DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  client         Client   @relation(fields: [clientId], references: [id])
  tasks          ProjectTask[]
}

model ClientNote {
  id        Int      @id @default(autoincrement())
  clientId  Int
  content   String
  type      String   @default("general") // general, meeting, phone, email
  createdAt DateTime @default(now())
  client    Client   @relation(fields: [clientId], references: [id])
}

model ProjectTask {
  id          Int     @id @default(autoincrement())
  projectId   Int
  title       String
  description String?
  completed   Boolean @default(false)
  createdAt   DateTime @default(now())
  project     Project @relation(fields: [projectId], references: [id])
}
```

## 🚀 開發階段

### Phase 1: CRM 基礎架構整合 (2小時)
**目標**: 在現有網站基礎上整合資料庫與 API

#### 1.1 Prisma 設定
```bash
cd /home/crawd_user/project/freelance-site
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

#### 1.2 資料庫 Migration
- 建立 `prisma/schema.prisma` (上述設計)
- 執行 `npx prisma migrate dev --name init`
- 生成 Prisma Client: `npx prisma generate`

#### 1.3 API 路由建立
- `src/app/api/admin/clients/route.ts` - 客戶 CRUD
- `src/app/api/admin/projects/route.ts` - 專案 CRUD
- `src/app/api/admin/auth/route.ts` - 簡單認證
- 修改現有 `src/app/api/contact/route.ts` 整合客戶建立

### Phase 2: 後台管理介面 (2.5小時)  
**目標**: 建立完整的管理介面

#### 2.1 認證中介軟體
- `src/middleware.ts` - 保護 `/admin` 路由
- 簡單的密碼認證 (環境變數 `ADMIN_PASSWORD`)

#### 2.2 後台頁面開發
- `src/app/admin/login/page.tsx` - 登入頁面
- `src/app/admin/dashboard/page.tsx` - 總覽儀表板
- `src/app/admin/clients/page.tsx` - 客戶列表
- `src/app/admin/clients/[id]/page.tsx` - 客戶詳情
- `src/app/admin/projects/page.tsx` - 專案列表
- `src/app/admin/projects/[id]/page.tsx` - 專案詳情

#### 2.3 UI 組件建立
- `ClientTable` - 客戶表格組件
- `ProjectStatusBadge` - 專案狀態標籤
- `StatsCard` - 統計卡片組件
- `AdminLayout` - 後台佈局組件

### Phase 3: 前後台整合與優化 (1.5小時)
**目標**: 無縫整合與使用者體驗優化

#### 3.1 聯絡表單升級
- 表單提交自動建立客戶記錄
- Email 通知機制 (客戶確認信 + 管理員通知)
- 表單驗證與錯誤處理強化

#### 3.2 UI/UX 統一
- 後台介面採用與前台一致的設計語言
- 響應式設計確保移動端體驗
- 載入狀態與互動反饋

#### 3.3 效能優化
- 資料庫查詢優化
- 分頁與搜尋功能
- 快取策略

## 🔧 技術規格

### 核心技術棧
- **框架**: Next.js 14 (App Router)
- **資料庫**: SQLite + Prisma ORM  
- **樣式**: Tailwind CSS
- **UI組件**: Headless UI + Heroicons
- **認證**: 簡單密碼認證
- **部署**: 現有環境 (localhost:3001)

### 環境變數
```env
# 資料庫
DATABASE_URL="file:./dev.db"

# 管理員認證  
ADMIN_PASSWORD="your_secure_password"

# Email (選配)
RESEND_API_KEY="re_xxxxx" # 如需 email 功能
FROM_EMAIL="contact@yourdomain.com"
```

## ✅ 完成檢查清單

### Phase 1 - CRM 基礎
- [ ] Prisma 安裝與設定完成
- [ ] 資料庫 schema 建立
- [ ] Migration 執行成功
- [ ] 基本 API 路由實作
- [ ] 聯絡表單 API 整合

### Phase 2 - 後台介面  
- [ ] 認證系統實作
- [ ] 管理員登入頁面
- [ ] Dashboard 總覽頁面
- [ ] 客戶列表與詳情頁面
- [ ] 專案管理介面
- [ ] 基本 CRUD 操作完成

### Phase 3 - 整合優化
- [ ] 前後台 UI 風格統一
- [ ] Email 通知功能 (選配)
- [ ] 響應式設計完善
- [ ] 效能優化實施
- [ ] 完整測試通過

## 🎯 下一步行動
OpenCode 開始執行整合開發，從 Phase 1 的 Prisma 設定開始。

**預計總開發時間**: 6 小時  
**當前狀態**: 準備開始 Phase 1