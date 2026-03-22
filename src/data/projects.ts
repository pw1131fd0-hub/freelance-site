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
    id: 'cyclegan-style-transfer',
    name: 'CycleGAN 圖像風格轉換',
    description: '以非配對圖像訓練 CycleGAN，實現跨域風格轉換——無需成對訓練資料即可完成照片轉油畫、馬轉斑馬等任務。',
    longDescription: '基於論文《Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks》的完整實作。以 PyTorch 訓練雙生成器 + 雙判別器架構，導入循環一致損失（Cycle-Consistency Loss）解決非配對問題。支援多種風格域（照片↔莫內、馬↔斑馬、夏↔冬），並提供 Gradio Demo 界面讓使用者上傳圖片即時體驗轉換效果。',
    highlights: [
      '實作 Cycle-Consistency Loss，有效解決無配對訓練資料的圖像翻譯問題',
      '雙判別器 (D_X, D_Y) + 雙生成器 (G, F) 對抗訓練架構',
      '整合 Identity Loss 保留來源圖片色彩結構，提升輸出品質',
      'Gradio 互動 Demo：使用者上傳任意圖片，即時返回風格轉換結果',
      '在 NVIDIA V100 以混合精度 (AMP) 訓練，縮短 40% 訓練時間',
    ],
    techStack: ['PyTorch', 'Python', 'Gradio', 'CUDA', 'NumPy'],
    githubUrl: 'https://github.com/pw1131fd0-hub/cyclegan-style-transfer',
    status: '✅ 生產就緒',
    emoji: '🎨',
  },
  {
    id: 'customer-churn-ml',
    name: '客戶流失預測 ML Pipeline',
    description: '端對端機器學習流水線，預測電信客戶流失率，F1-score 達 0.89，並以 SHAP 解釋模型決策。',
    longDescription: '為電信業打造的完整 ML 解決方案：從原始 CSV 到生產 API 的全流程自動化。特徵工程覆蓋 70+ 個衍生特徵，以 Optuna 進行超參數調優，最終選定 LightGBM 作為主模型。透過 SHAP 值分析解釋每位客戶的流失風險因子，輸出可解釋的報告供業務團隊決策。模型以 FastAPI 包裝，支援批次與即時預測。',
    highlights: [
      '特徵工程：70+ 衍生特徵，含 RFM 分析、滾動視窗統計與類別編碼',
      'Optuna 超參數調優：LightGBM 在測試集達到 F1=0.89, AUC=0.94',
      'SHAP 全局與局部解釋性報告，轉化為業務可用的流失因子排名',
      'MLflow 實驗追蹤：版本管理 30+ 次模型訓練記錄',
      'FastAPI 包裝部署，支援批次推論與即時單筆預測',
    ],
    techStack: ['Python', 'LightGBM', 'SHAP', 'FastAPI', 'MLflow', 'Optuna'],
    githubUrl: 'https://github.com/pw1131fd0-hub/churn-prediction-pipeline',
    status: '✅ 生產就緒',
    emoji: '📊',
  },
  {
    id: 'realtime-bi-dashboard',
    name: '即時 BI 分析儀表板',
    description: '以 Streamlit + Plotly 打造的互動式商業智慧儀表板，整合多資料源，支援自助式分析與自動報表。',
    longDescription: '為中小企業打造的一站式 BI 解決方案，整合 PostgreSQL、Google Sheets 與第三方 API 資料源。以 Streamlit 為前端框架，Plotly Express 繪製互動圖表，支援多維度篩選與交叉分析。後端以 Apache Airflow 排程自動化 ETL，每日清晨更新資料；並整合 Great Expectations 進行資料品質驗證，確保儀表板數字可信。',
    highlights: [
      'Multi-source ETL：整合 PostgreSQL、Google Sheets、REST API，以 Airflow 排程每日自動化',
      'Great Expectations 資料品質門檻：異常資料觸發 Slack 告警，防止錯誤數字上儀表板',
      '30+ 互動圖表：漏斗圖、熱力圖、時序分析、地理分布——全部支援即時篩選',
      '自動化報表：每週五定時生成 PDF 摘要並寄送給訂閱者',
      '角色權限控制：不同部門看見不同資料視圖，敏感財務數字加密處理',
    ],
    techStack: ['Python', 'Streamlit', 'Plotly', 'Airflow', 'PostgreSQL', 'pandas'],
    githubUrl: 'https://github.com/pw1131fd0-hub/realtime-bi-dashboard',
    status: '✅ 生產就緒',
    emoji: '📈',
  },
  {
    id: 'nlp-sentiment-analyzer',
    name: 'NLP 多語言情感分析器',
    description: '以 Transformers 微調 BERT 系列模型，支援繁中、英、日三語情感分類，準確率達 93%，部署為 REST API。',
    longDescription: '以 Hugging Face Transformers 為基礎，微調多語言 mBERT 與 XLM-RoBERTa 於自建三語情感語料庫（含繁中電商評論、英文社群媒體、日文新聞）。針對繁中分詞問題導入 CKIP Transformers 前處理，有效提升繁中準確率 8 個百分點。以 ONNX Runtime 量化模型，推論速度提升 3x，並透過 FastAPI + Docker 部署為生產 API。',
    highlights: [
      'mBERT + XLM-RoBERTa 跨語言微調：繁中/英/日三語，準確率 93%',
      'CKIP Transformers 繁中分詞前處理，解決繁中斷詞問題，準確率提升 8%',
      'ONNX Runtime INT8 量化：模型大小縮減 75%，推論速度提升 3x',
      '自建標注工具：Label Studio 工作流，累積 15,000 筆三語標注資料',
      'FastAPI + Docker 生產部署，支援批次推論，每秒處理 200+ 請求',
    ],
    techStack: ['Python', 'Transformers', 'PyTorch', 'ONNX', 'FastAPI', 'Docker'],
    githubUrl: 'https://github.com/pw1131fd0-hub/multilingual-sentiment',
    status: '✅ 生產就緒',
    emoji: '🗣️',
  },
  {
    id: 'mlops-platform',
    name: 'MLOps 輕量化平台',
    description: '整合 MLflow、DVC、GitHub Actions 的 ML 工程平台，讓資料科學家從實驗到生產部署只需一個 PR。',
    longDescription: '為中小型 ML 團隊設計的 MLOps 工具鏈整合平台。以 DVC 進行資料版本控制，MLflow 追蹤實驗與模型登記，GitHub Actions 自動化訓練、評估與部署流水線。核心設計理念：資料科學家只需專注於模型程式碼，其餘基礎設施由平台自動處理。支援 A/B 測試流量分配與模型效能監控告警。',
    highlights: [
      'DVC 資料版本控制：大型訓練集版本管理，搭配 S3 遠端存儲',
      'MLflow Model Registry：完整的模型生命週期管理，從實驗到生產只需按一個按鈕',
      'GitHub Actions CI/CD：PR 合併自動觸發訓練 → 評估 → Staging 部署',
      'Evidently AI 模型漂移監控：特徵分布偏移自動觸發重新訓練警報',
      'A/B 測試框架：流量分配、指標追蹤、統計顯著性自動判斷',
    ],
    techStack: ['Python', 'MLflow', 'DVC', 'GitHub Actions', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/pw1131fd0-hub/mlops-platform',
    status: '✅ 生產就緒',
    emoji: '⚙️',
  },
];
