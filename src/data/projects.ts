export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
  emoji: string;
}

export const projects: Project[] = [
  {
    id: 'openclaw-fps',
    name: "OpenClaw FPS",
    description: '3D WebGL 第一人稱射擊遊戲，具備即時物理引擎、敵人 AI 與波次管理系統。',
    longDescription: '以 Three.js 與 Cannon.js 打造的純瀏覽器 3D 第一人稱射擊遊戲。遊戲具備即時物理引擎，模擬子彈軌跡與環境互動；波次制敵人 AI 系統包含巡邏、追擊與攻擊狀態；並設計了關卡推進架構。可在現代瀏覽器以 60fps 流暢運行，無需任何原生外掛。',
    highlights: [
      '使用 Cannon.js 實現即時物理——碰撞偵測、重力模擬、拋體弧線',
      '敵人 AI 狀態機：閒置 → 巡邏 → 追擊 → 攻擊',
      '波次管理系統，具備動態難度調整機制',
      'WebGL 渲染流水線，搭配 Three.js PBR 材質與動態光照',
      '零依賴部署——單一 HTML 構建產物',
    ],
    techStack: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-fps',
    status: '✅ 生產就緒',
    emoji: '🎮',
  },
  {
    id: 'k8s-copilot',
    name: 'K8s Copilot',
    description: 'Kubernetes 自動化平台，具備自動部署、叢集監控與 GitOps 整合功能。',
    longDescription: 'K8s Copilot 是一款內部平台工程工具，整合 Kubernetes API 與 GitHub Actions，打造全自動 GitOps 部署流水線。可即時監控叢集健康狀況、根據自訂指標自動擴展工作負載，並提供儀表板呈現各命名空間的資源使用情況。專為需要生產級 K8s 自動化、但又不想承擔企業級工具複雜度的團隊而設計。',
    highlights: [
      'GitOps 流水線：推送至 main → 自動構建 → 金絲雀部署 → 升級或回滾',
      '即時叢集健康儀表板，支援命名空間級別資源視圖',
      '透過 Prometheus 支援基於應用自訂指標的 HPA 觸發器',
      'Slack 整合，支援部署通知與告警升級',
      'Helm Chart 模板化，支援各環境獨立值覆蓋',
    ],
    techStack: ['Node.js', 'Kubernetes', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/pw1131fd0-hub/k8s-copilot',
    status: '✅ 生產就緒',
    emoji: '☸️',
  },
  {
    id: 'crm',
    name: "OpenClaw CRM",
    description: '企業級 CRM 系統，具備客戶管理、業務管道追蹤與分析儀表板。',
    longDescription: '專為自由接案者與小型工作室打造的全功能 CRM 系統。將來自多個渠道的客戶詢問彙整至單一管道視圖，追蹤從首次接觸到簽約的各階段進度，並在分析儀表板上呈現收益預測。以 Next.js App Router 與 Server Actions 構建，提供快速的伺服器端體驗，最小化客戶端 JavaScript。',
    highlights: [
      '多階段業務管道，支援拖放式看板視圖',
      '從入站詢問表單自動建立客戶個人資料',
      '收益預測儀表板，提供月度與季度預測',
      '批量狀態更新與 CSV 匯出，支援離線報表',
      '基於 NextAuth.js 的角色權限控制——管理員與唯讀視圖',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-crm',
    status: '✅ 生產就緒',
    emoji: '📊',
  },
  {
    id: 'ckad-exec',
    name: 'CKAD Executor',
    description: 'Kubernetes 認證考試練習平台，具備自動化情境執行與評分功能。',
    longDescription: 'CKAD Executor 是一款自架式 CKAD（Kubernetes 應用開發者認證）模擬考試系統。每個考試工作階段會自動啟動隔離的 k3s 命名空間，注入考試風格的任務提示，並執行自動化驗證器，根據預期叢集狀態評分考生的 kubectl 指令與 YAML 配置。告別手動比對輸出——評分器會精確告知哪些物件缺失或配置錯誤。',
    highlights: [
      '每個考試工作階段啟動獨立 k3s 命名空間——零交叉污染',
      '自動評分引擎，驗證實際叢集狀態是否符合預期清單',
      '涵蓋 CKAD 全部 5 個領域：應用設計、部署、環境配置、網路與服務',
      '計時工作階段，提供即時倒數計時與自動提交',
      '每道題目的詳細得分明細，附帶失敗驗證的提示說明',
    ],
    techStack: ['TypeScript', 'Kubernetes', 'Docker', 'k3s'],
    githubUrl: 'https://github.com/pw1131fd0-hub/CKAD-exec',
    status: '✅ 生產就緒',
    emoji: '📝',
  },
  {
    id: 'openclaw-deployer',
    name: "OpenClaw Deployer",
    description: 'CI/CD 一鍵部署工具，整合自動化測試、構建與部署流水線。',
    longDescription: 'OpenClaw Deployer 是一款以 GitHub Actions 為基礎的輕量 CI/CD 編排工具，將複雜的多步驟部署流程簡化為單一 CLI 指令或 Webhook 觸發器。自動處理測試執行、Docker 映像構建、容器倉庫推送與滾動 Kubernetes 部署——若健康檢查在可設定的時間窗內失敗，將自動觸發回滾。專為希望在自有基礎架構上享受 Heroku 般簡潔體驗的獨立開發者與小型團隊設計。',
    highlights: [
      '一鍵部署：`npx openclaw-deployer deploy --env production`',
      '健康檢查失敗後在可設定時間窗內自動觸發回滾',
      'Docker 多階段構建，利用層快取實現 2 分鐘內完成構建',
      'GitHub Actions 整合，提供可重用的工作流程模板',
      '部署稽核日誌，記錄時間戳、操作者與差異摘要',
    ],
    techStack: ['Node.js', 'GitHub Actions', 'Docker', 'Shell'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-deployer',
    status: '✅ 生產就緒',
    emoji: '🚀',
  },
];
