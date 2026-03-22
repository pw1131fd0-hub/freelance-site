export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cyclegan-image-translation',
    title: '用 GAN 實現更全面的圖像風格轉換：CycleGAN 解析',
    date: '2026-03-10',
    excerpt: '深入解析 CycleGAN 如何以非配對圖像資料完成跨域風格轉換——循環一致損失為何是突破性設計，以及 PyTorch 實作細節。',
    content: `
# 用 GAN 實現更全面的圖像風格轉換：CycleGAN

傳統的圖像翻譯模型（如 pix2pix）需要成對的訓練資料——每一張輸入圖片都必須有對應的目標圖片。這在現實中幾乎不可能取得：你不可能讓同一匹馬同時拍「馬的照片」和「斑馬的照片」。

**CycleGAN** 解決了這個根本問題。

## 核心設計：循環一致損失 (Cycle-Consistency Loss)

CycleGAN 的精髓在於這個直觀的約束：

> 若把一張馬的照片轉成斑馬，再把結果轉回馬，應該要得到與原圖相近的結果。

數學上表示為：
\`F(G(x)) ≈ x\`  且  \`G(F(y)) ≈ y\`

這個約束迫使生成器不能「捏造」內容——它必須學習真正的跨域映射，而非任意改變圖像。

## 架構組成

- **生成器 G**: X → Y（例如馬 → 斑馬）
- **生成器 F**: Y → X（斑馬 → 馬）
- **判別器 D_X**: 分辨真實 X 與假 X
- **判別器 D_Y**: 分辨真實 Y 與假 Y

損失函數由三部分組成：
1. **對抗損失** (Adversarial Loss)：欺騙判別器
2. **循環一致損失** (Cycle-Consistency Loss)：保持語義一致
3. **身份損失** (Identity Loss)：防止不必要的色彩偏移

## 訓練要點

- **學習率調度**：前半段固定 lr=0.0002，後半段線性衰減
- **圖像緩衝區 (Image Pool)**：儲存前 50 個生成圖像，防止模式崩潰
- **混合精度訓練**：AMP 加速，V100 上訓練時間縮短 40%

## 實際效果

| 任務 | FID ↓ | 訓練時間 |
|------|-------|----------|
| 馬 ↔ 斑馬 | 77.2 | 12h |
| 照片 ↔ 莫內 | 65.3 | 18h |
| 夏 ↔ 冬 | 82.1 | 10h |

完整程式碼與預訓練權重請見 GitHub。
    `,
    tags: ['Deep Learning', 'GAN', 'PyTorch', 'Computer Vision'],
  },
  {
    slug: 'ml-pipeline-production',
    title: '打造生產級 ML Pipeline：從 Notebook 到 API 的完整路徑',
    date: '2026-02-20',
    excerpt: '大多數 ML 專案死在 Jupyter Notebook 裡。以下是將實驗原型轉化為可靠生產系統的架構模式與工程實踐。',
    content: `
# 打造生產級 ML Pipeline

Notebook 是探索的起點，不是終點。把機器學習模型推上生產，需要的不只是「model.predict()」——它需要完整的工程思維。

## 常見的「Notebook 陷阱」

1. 資料前處理邏輯散落各處，訓練與推論時行為不一致
2. 無法重現：跑了兩次得到不同結果
3. 無版本控制：不知道哪個模型對應哪份資料
4. 無監控：模型上線後不知道它是否仍然準確

## 生產 Pipeline 的五個支柱

### 1. 資料版本控制（DVC）
把資料當程式碼管理。每次訓練都記錄用的是哪個版本的資料：
\`\`\`bash
dvc add data/train.csv
dvc push
git commit -m "add training data v2.1"
\`\`\`

### 2. 特徵工程管道化（sklearn Pipeline）
把所有前處理步驟封裝進 \`Pipeline\`，確保訓練與推論使用完全相同的邏輯：
\`\`\`python
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('model', LGBMClassifier()),
])
\`\`\`

### 3. 實驗追蹤（MLflow）
每次訓練自動記錄參數、指標與模型：
\`\`\`python
with mlflow.start_run():
    mlflow.log_params(params)
    mlflow.log_metric("f1", f1_score)
    mlflow.sklearn.log_model(pipeline, "model")
\`\`\`

### 4. CI/CD 自動化
PR 合併觸發自動化訓練評估，低於基線則自動拒絕部署。

### 5. 漂移監控
以 Evidently 每日比對生產資料與訓練資料的分布，偵測特徵漂移。

## 最重要的一課

比起選哪個演算法，**基礎設施的可靠性**對生產系統更重要。
一個 F1=0.85 的可靠 pipeline，遠勝於 F1=0.92 的不穩定 Notebook。
    `,
    tags: ['MLOps', 'Python', 'ML Engineering', '工程'],
  },
  {
    slug: 'shap-model-explainability',
    title: 'SHAP 值：讓黑盒模型說話的方法',
    date: '2026-02-03',
    excerpt: '業務團隊問「為什麼這位客戶被預測為高流失風險？」——SHAP 值是回答這個問題最嚴謹的工具。從數學直覺到實際應用。',
    content: `
# SHAP 值：讓黑盒模型說話

機器學習模型的準確率再高，如果沒辦法解釋預測結果，業務團隊就不會信任它——更不會根據它做決策。

**SHAP（SHapley Additive exPlanations）** 是目前最理論扎實的模型解釋工具。

## 數學直覺

SHAP 借用了賽局理論中的 **Shapley 值**概念：
> 每個特徵對最終預測貢獻多少「功勞」（或「罪責」）？

對一個預測結果，SHAP 值的加總等於模型輸出與基線（所有樣本均值）的差：
\`sum(shap_values) = model_output - baseline\`

## 三種常用圖表

### 1. 瀑布圖 (Waterfall Plot)
單筆樣本解釋：從基線值出發，每個特徵的貢獻疊加到最終預測。
\`\`\`python
shap.waterfall_plot(shap_values[0])
\`\`\`

### 2. 蜂群圖 (Beeswarm Plot)
全局特徵重要性：每個點是一筆樣本，X 軸是 SHAP 值，顏色代表特徵原始值。
\`\`\`python
shap.summary_plot(shap_values, X_test)
\`\`\`

### 3. 依賴圖 (Dependence Plot)
特徵交互作用：特定特徵的 SHAP 值如何隨其數值變化，並揭示與其他特徵的交互。

## 在業務報告中的應用

客戶流失預測的 SHAP 分析可以轉化為：
- 「這位客戶被標記為高風險，主要因為：近 30 天無登入（-0.23）、服務申訴次數增加（-0.18）、合約到期倒數 < 14 天（-0.15）」

這種解釋讓客服團隊可以主動介入，而不是只接受一個「流失概率 87%」的數字。

## 效能考量

SHAP 對 TreeSHAP 演算法有原生支援（LightGBM/XGBoost/CatBoost），計算速度比暴力 Permutation 快 10-100x。對深度學習模型則使用 DeepSHAP 或 GradientSHAP。
    `,
    tags: ['Machine Learning', 'SHAP', 'Explainability', 'Python'],
  },
  {
    slug: 'pandas-performance-tips',
    title: '10 個讓 pandas 快 10 倍的技巧',
    date: '2026-01-15',
    excerpt: 'pandas 的預設設定是為了方便，不是為了速度。以下是資料工程師日常用來處理大資料集的效能優化清單。',
    content: `
# 10 個讓 pandas 快 10 倍的技巧

pandas 是資料科學的瑞士刀，但對大資料集用錯方法，速度慢到令人崩潰。以下技巧是我在處理 100 萬到 1 億列資料集後沉澱的實戰心得。

## 1. 讀取時指定 dtype

讓 pandas 自動猜測型別，它會把所有整數讀成 int64，浮點數讀成 float64。
\`\`\`python
# 慢
df = pd.read_csv('data.csv')

# 快：減少 60% 記憶體
df = pd.read_csv('data.csv', dtype={
    'user_id': 'int32',
    'score': 'float32',
    'category': 'category',
})
\`\`\`

## 2. 用 category 型別處理低基數欄位

字串欄位如果只有幾十種不同值，改用 \`category\`：
\`\`\`python
df['status'] = df['status'].astype('category')
# 記憶體用量從 8MB 降到 0.1MB
\`\`\`

## 3. 向量化運算，避免 iterrows

\`iterrows()\` 是 pandas 最慢的操作之一。
\`\`\`python
# 慢：iterrows
for idx, row in df.iterrows():
    df.at[idx, 'new_col'] = row['a'] * row['b']

# 快：向量化
df['new_col'] = df['a'] * df['b']
\`\`\`

## 4. 善用 query() 做條件篩選

\`\`\`python
# 較慢
df[df['age'] > 25 & df['city'] == 'Taipei']

# 較快（尤其對大資料集）
df.query('age > 25 and city == "Taipei"')
\`\`\`

## 5. groupby + transform 取代 merge 計算群組統計

\`\`\`python
# 慢：先 groupby 再 merge 回去
means = df.groupby('group')['value'].mean()
df = df.merge(means.rename('group_mean'), on='group')

# 快：直接 transform
df['group_mean'] = df.groupby('group')['value'].transform('mean')
\`\`\`

## 6-10 快速清單

- **6**: 用 \`pd.read_parquet\` 取代 CSV——快 5x，支援型別保留
- **7**: \`chunksize\` 分批讀取超大檔案，避免 OOM
- **8**: \`eval()\` 處理複雜數值運算，使用 numexpr 後端
- **9**: 多核心並行：\`swifter\` 或 \`pandarallel\` 自動利用所有 CPU
- **10**: 對 10GB+ 資料集改用 \`polars\`——同樣的 API，快 5-20x

資料科學的效能優化不只是寫出正確的結果，更是讓迭代速度快到可以在一個工作天內嘗試 20 種假設。
    `,
    tags: ['pandas', 'Python', '資料工程', '效能'],
  },
];
