"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const caseStudies = [
  {
    id: 1,
    title: "客戶流失預測系統",
    emoji: "📉",
    category: "分類問題",
    challenge:
      "電商平台每月流失 15% 的用戶，缺乏主動預防機制。需要準確識別即將離開的用戶，以便及時進行保留策略。",
    solution:
      "構建基於 XGBoost 的二分類模型，整合用戶行為序列、購買模式、登入頻率等特徵。使用 SHAP 進行特徵解釋，使業務團隊能理解模型決策邏輯。",
    results: [
      "模型準確率達 92%，精準度 89%",
      "預防流失客戶比例提升 34%",
      "年度營收增加 $280K",
      "減少客戶獲取成本 45%",
    ],
    techStack: ["XGBoost", "Python", "Pandas", "SHAP", "FastAPI", "Redis"],
  },
  {
    id: 2,
    title: "圖像識別與分類系統",
    emoji: "🖼️",
    category: "計算機視覺",
    challenge:
      "製造企業需要自動檢測產品缺陷，目前仍依賴人工檢驗，效率低、漏檢率高。",
    solution:
      "採用預訓練的 ResNet50 進行遷移學習，針對特定缺陷類型微調。建立自動化檢驗管道，整合於產線的影像識別系統中。",
    results: [
      "缺陷檢測準確率 96.5%",
      "檢驗速度提升 8 倍",
      "不良品逃逸率降低 92%",
      "年度成本節省 $150K",
    ],
    techStack: ["ResNet50", "PyTorch", "TensorFlow Lite", "OpenCV", "ONNX"],
  },
  {
    id: 3,
    title: "多語言情感分析平台",
    emoji: "💬",
    category: "自然語言處理",
    challenge:
      "國際平台需要分析來自 8 種語言的用戶評論，實現實時情感監控，但目前工具無法準確處理多語言、方言和行業術語。",
    solution:
      "微調多語言 BERT 模型 (mBERT)，針對金融和電商領域進行特定訓練。建構 REST API，支援批量和實時請求，整合進後端系統。",
    results: [
      "多語言情感分類 F1 分數達 0.88",
      "支援 8 種語言，部署延遲 < 200ms",
      "每日處理 500K+ 評論",
      "用戶滿意度提升 28%",
    ],
    techStack: [
      "BERT",
      "Transformers",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: 4,
    title: "時間序列預測引擎",
    emoji: "📈",
    category: "時間序列",
    challenge:
      "零售企業需要精準的銷售預測，以優化庫存與採購決策。傳統的 ARIMA 模型無法捕捉複雜的季節性和異常模式。",
    solution:
      "實現 LSTM 和 Transformer 時間序列模型，整合多個外部特徵（天氣、假期、營銷活動）。建立 ML Pipeline 自動化訓練與評估。",
    results: [
      "預測準確度 (MAPE) 降至 6.2%",
      "庫存成本降低 22%",
      "缺貨事件減少 78%",
      "營運資本效率提升 35%",
    ],
    techStack: [
      "LSTM",
      "Transformer",
      "PyTorch",
      "MLflow",
      "Airflow",
      "InfluxDB",
    ],
  },
];

export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={14} />
            返回首頁
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            案例研究
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            詳細了解我如何為不同領域的客戶打造 AI 解決方案，從問題分析到結果交付。
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-10 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{study.emoji}</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      {study.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">
                      挑戰
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">
                      解決方案
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium border border-slate-200 dark:border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Results */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/30">
                  <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-4">
                    成果
                  </h3>
                  <ul className="space-y-3">
                    {study.results.map((result, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              您也有類似的挑戰嗎？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              讓我們一起探討如何將 AI 轉化為您的競爭優勢。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              討論您的項目 <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="mt-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-mono border-t border-slate-100 dark:border-white/[0.05] pt-8"
        >
          <span>© {new Date().getFullYear()} OpenClaw</span>
          <div className="flex gap-6">
            <Link
              href="/projects"
              className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
            >
              作品集
            </Link>
            <Link
              href="/services"
              className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
            >
              服務項目
            </Link>
          </div>
        </motion.footer>
      </motion.div>
    </main>
  );
}
