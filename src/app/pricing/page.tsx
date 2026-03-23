"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

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

const plans = [
  {
    name: "小時顧詢",
    emoji: "📞",
    price: "$150",
    unit: "/ 小時",
    description: "適合快速問題、代碼審查或指導",
    features: [
      "即時技術諮詢",
      "代碼審查與反饋",
      "架構指導",
      "知識轉移會話",
      "按需彈性預約",
    ],
    cta: "預約諮詢",
    highlighted: false,
  },
  {
    name: "小型項目",
    emoji: "🚀",
    price: "$5,000",
    unit: "起",
    description: "4-8 週的獨立項目或模型開發",
    features: [
      "完整項目交付",
      "定期進度同步",
      "30 天免費支援",
      "源代碼和文檔",
      "代碼審查",
      "生產部署協助",
    ],
    cta: "開始項目",
    highlighted: true,
  },
  {
    name: "中型項目",
    emoji: "⚙️",
    price: "$15,000",
    unit: "起",
    description: "8-16 週的複雜系統或完整 ML 管道",
    features: [
      "端對端開發",
      "架構設計與實施",
      "完整 MLOps 管道",
      "60 天免費支援",
      "團隊知識轉移",
      "生產監控設置",
      "雲基礎設施配置",
    ],
    cta: "討論項目",
    highlighted: false,
  },
  {
    name: "企業合作",
    emoji: "🏢",
    price: "定制",
    unit: "/ 季度或年度",
    description: "長期策略性合作、團隊擴展或多項目",
    features: [
      "專屬技術顧問",
      "優先支援",
      "團隊培訓計畫",
      "多項目優化定價",
      "SLA 保障",
      "全年知識轉移",
      "戰略規劃會議",
    ],
    cta: "聯絡我們",
    highlighted: false,
  },
];

const addOns = [
  {
    title: "快速交付 (+50%)",
    description: "加速項目進度，優先完成",
  },
  {
    title: "額外培訓 ($2,000)",
    description: "為團隊提供定制化培訓課程",
  },
  {
    title: "部署與監控 ($3,000)",
    description: "完整的生產環境設置和 24/7 監控",
  },
  {
    title: "持續支援 ($500/月)",
    description: "無限的技術支援和優化",
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 font-medium justify-center"
          >
            <ArrowLeft size={14} />
            返回首頁
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            透明的定價
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base leading-relaxed mx-auto">
            無隱藏費用，無驚喜。選擇適合您需求和預算的方案。
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-[28px] p-8 border transition-all ${
                plan.highlighted
                  ? "bg-blue-600 text-white border-blue-600 md:scale-105 shadow-2xl"
                  : "bg-white dark:bg-[#111111] border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50"
              }`}
            >
              <div className="text-4xl mb-4">{plan.emoji}</div>
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-white" : ""}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${
                plan.highlighted
                  ? "text-blue-100"
                  : "text-slate-600 dark:text-slate-400"
              }`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? "text-white" : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${
                    plan.highlighted
                      ? "text-blue-100"
                      : "text-slate-600 dark:text-slate-400"
                  }`}>
                    {plan.unit}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-sm ${
                      plan.highlighted
                        ? "text-blue-100"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <Check
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-blue-200" : "text-emerald-500"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Add-ons */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            增值服務
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#111111] rounded-[28px] p-6 border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
              >
                <h3 className="font-bold mb-2">{addon.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How Pricing Works */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">定價是如何計算的？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">1</span> 需求評估
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                我們進行免費的初期咨詢，了解您的項目範圍、複雜度和時程要求。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">2</span> 詳細提案
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                根據需求，我提供帶有固定價格或 T&M 估計的詳細提案。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">3</span> 透明合同
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                所有費用、交付物和條款都在合同中明確列出，無隱藏費用。
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <h3 className="font-bold mb-4">如何選擇合適的方案？</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              如果您有一個簡單問題或需要快速的代碼審查，選擇「小時諮詢」。
              對於完整的項目或模型開發，選擇「小型」或「中型項目」。
              對於長期合作或多項目，選擇「企業合作」。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline underline-offset-4"
            >
              我還是不確定 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <h3 className="font-bold mb-4">可以分期付款嗎？</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              當然。對於項目超過 $10,000，我提供靈活的分期付款選項：
              初始 50%，完成 50%。企業客戶可以協商自定義計費周期。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline underline-offset-4"
            >
              討論付款選項 <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              準備好啟動您的項目了嗎？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              讓我們進行免費的初期咨詢，了解您的需求並提供精準的報價。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              預約免費咨詢 <ArrowRight size={16} />
            </Link>
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
