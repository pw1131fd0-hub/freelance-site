# 接案網站 CRM 客戶管理系統開發 

## 🎯 任務目標
在現有的接案網站基礎上，新增客戶管理系統 (CRM) 功能。

## 📋 技術規格
- **資料庫**: SQLite + Prisma ORM
- **認證**: 簡單密碼登入
- **框架**: 基於現有的 Next.js 14 架構

## 🚀 Phase 1: 資料庫設計與初始化

### 1.1 安裝依賴
```bash
npm install prisma @prisma/client sqlite3
npm install -D prisma
```

### 1.2 初始化 Prisma
```bash
npx prisma init --datasource-provider sqlite
```

### 1.3 資料庫 Schema 設計
建立 `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Client {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  phone     String?
  company   String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  projects  Project[]
}

model Project {
  id           Int      @id @default(autoincrement())
  clientId     Int
  title        String
  description  String?
  budgetRange  String?
  status       String   @default("pending") // pending, quoted, in_progress, completed, rejected
  priority     String   @default("medium")  // low, medium, high
  estimatedHours Int?
  quotedAmount   Float?
  notes        String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  client       Client   @relation(fields: [clientId], references: [id])
}
```

### 1.4 執行 Migration
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🎨 Phase 2: 後台管理介面

### 2.1 建立後台路由結構
- `src/app/admin/page.tsx` - 管理介面主頁
- `src/app/admin/login/page.tsx` - 登入頁面
- `src/app/admin/clients/page.tsx` - 客戶列表
- `src/app/admin/projects/page.tsx` - 專案列表
- `src/app/admin/projects/[id]/page.tsx` - 專案詳情

### 2.2 簡單認證系統
使用環境變數 `ADMIN_PASSWORD` 進行基本認證。

### 2.3 客戶與專案管理介面
- 客戶列表 (可搜尋、分頁)
- 專案狀態更新
- 快速統計：總客戶數、進行中專案、本月詢問數

## 📧 Phase 3: 表單整合與自動化

### 3.1 修改聯絡表單 API
更新 `src/app/api/contact/route.ts`:
- 收到表單提交後自動建立客戶記錄
- 建立專案詢問記錄
- 發送確認信給客戶

### 3.2 Email 範本
建立歡迎信與確認信範本。

## 🔧 Phase 4: 部署準備

### 4.1 環境變數設定
```env
ADMIN_PASSWORD=your_secure_password
DATABASE_URL="file:./dev.db"
```

### 4.2 生產部署調整
確保 SQLite 檔案在重新部署時不會遺失。

## ✅ 完成檢查清單
- [ ] Prisma 設定與 migration 完成
- [ ] 客戶與專案模型建立
- [ ] 後台管理介面實作
- [ ] 簡單認證系統
- [ ] 聯絡表單整合
- [ ] 基本測試通過
- [ ] 本地環境測試完畢

## 🎯 下一步行動
OpenCode 請開始執行 Phase 1，完成 Prisma 設定和資料庫初始化。