"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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

const services = [
  {
    title: "機器學習建模",
    icon: "🤖",
    description: "端對端的 ML 解決方案，從數據清理、特徵工程到模型訓練和部署",
    features: [
      "分類與回歸模型",
      "時間序列預測",
      "特徵工程與選擇",
      "超參數調優",
      "模型解釋性分析 (SHAP)",
      "生產環境部署",
    ],
  },
  {
    title: "深度學習應用",
    icon: "🧠",
    description:
      "Transformer、CNN、RNN 等高級深度學習架構的開發與優化",
    features: [
      "Transformer 微調",
      "圖像生成 (GAN, Diffusion)",
      "自然語言處理 (NLP)",
      "計算機視覺 (CV)",
      "多模態學習",
      "模型量化與蒸餾",
    ],
  },
  {
    title: "資料分析與視覺化",
    icon: "📊",
    description:
      "從原始資料到可視化洞察，打造互動式儀表板和深度分析報告",
    features: [
      "統計分析",
      "數據清理與轉換",
      "互動式儀表板 (Dashboards)",
      "數據視覺化",
      "BI 系統整合",
      "實時數據管道",
    ],
  },
  {
    title: "MLOps 與資料工程",
    icon: "⚙️",
    description:
      "建構完整的 ML 管道，確保模型的持續訓練、監控和部署",
    features: [
      "ML Pipeline 自動化",
      "實驗追蹤與管理",
      "數據版本控制",
      "模型監控與告警",
      "CI/CD 集成",
      "雲端部署 (AWS, GCP, Azure)",
    ],
  },
];

const workflows = [
  {
    step: 1,
    title: "需求分析",
    description: "深入瞭解您的業務痛點與目標，設計最優解決方案",
  },
  {
    step: 2,
    title: "數據準備",
    description: "數據蒐集、清理、標註，建構高品質的訓練集",
  },
  {
    step: 3,
    title: "模型開發",
    description: "實驗多個模型架構，選擇最優方案並調優",
  },
  {
    step: 4,
    title: "評估與驗證",
    description: "嚴格的測試流程，確保模型可靠性和安全性",
  },
  {
    step: 5,
    title: "部署上線",
    description: "整合到您的系統中，確保無縫過渡",
  },
  {
    step: 6,
    title: "監控維護",
    description: "持續監控模型效能，定期迭代優化",
  },
];

export default function Services() {
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
            服務項目
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            提供端對端的機器學習、深度學習和資料工程解決方案，幫助您從數據中提取價值，加速業務轉型。
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2.5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <Check
                      size={16}
                      className="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Workflow Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            完整的合作流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <div
                key={workflow.step}
                className="relative bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {workflow.step}
                  </span>
                  {workflow.step < workflows.length && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-blue-400">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{workflow.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {workflow.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              準備啟動您的 AI 項目嗎？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              我會根據您的具體需求，提供定制化的解決方案。無論是原型開發還是生產部署，我都能幫助您。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-center"
              >
                開始對話
              </Link>
              <a
                href="mailto:contact@openclaw.dev"
                className="px-8 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-center"
              >
                直接寄信
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="mt-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-mono border-t border-slate-100 dark:border-white/[0.05] pt-8"
        >
          <span>© {new Date().getFullYear()} OpenClaw</span>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            有興趣合作嗎？
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
