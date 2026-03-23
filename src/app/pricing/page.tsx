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

const pricingPlans = [
  {
    name: "諮詢與評估",
    emoji: "💡",
    description: "適合剛開始探索 AI 的企業或新創",
    price: "$1,500",
    period: "/ 次",
    features: [
      "業務需求分析（2 小時）",
      "技術可行性評估",
      "初步方案設計",
      "成本與時間估計",
      "後續合作建議",
    ],
    cta: "預約諮詢",
    highlighted: false,
  },
  {
    name: "中型項目",
    emoji: "🚀",
    description: "單個 ML 模型或數據分析系統",
    price: "$15k - $45k",
    period: "/ 項目",
    features: [
      "完整的需求分析與設計",
      "數據準備與探索性分析",
      "模型開發與優化",
      "性能評估與文檔",
      "部署支援與初期監控",
      "30 天技術支援",
    ],
    cta: "討論項目",
    highlighted: true,
  },
  {
    name: "複雜系統",
    emoji: "⚙️",
    description: "端對端 AI 平台或 MLOps 基礎設施",
    price: "$45k - $150k+",
    period: "/ 項目",
    features: [
      "完整的系統架構設計",
      "多模型協調與優化",
      "生產級別的代碼與測試",
      "MLOps Pipeline 建構",
      "實時監控與告警系統",
      "完整交接與培訓",
      "90 天技術支援",
    ],
    cta: "規劃合作",
    highlighted: false,
  },
  {
    name: "長期顧問",
    emoji: "🤝",
    description: "持續的技術支援與指導",
    price: "$5k - $15k",
    period: "/ 月",
    features: [
      "每週技術諮詢會議",
      "架構設計與代碼審查",
      "性能優化建議",
      "團隊能力建設",
      "新技術探索評估",
      "優先問題響應",
    ],
    cta: "開啟合作",
    highlighted: false,
  },
];

const comparison = [
  { feature: "需求分析", base: true, pro: true, enterprise: true },
  { feature: "模型開發", base: false, pro: true, enterprise: true },
  { feature: "性能優化", base: false, pro: true, enterprise: true },
  { feature: "生產部署", base: false, pro: true, enterprise: true },
  { feature: "系統架構", base: false, pro: true, enterprise: true },
  { feature: "MLOps Pipeline", base: false, pro: false, enterprise: true },
  { feature: "團隊培訓", base: false, pro: false, enterprise: true },
  { feature: "技術支援", base: "5 天", pro: "30 天", enterprise: "90 天+" },
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
            定價方案
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed mx-auto">
            透明、靈活的定價，根據您的需求和預算進行調整。沒有隱藏費用。
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[28px] p-8 border transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30 border-blue-300 dark:border-blue-700/50 ring-2 ring-blue-400/50 dark:ring-blue-600/50 md:col-span-2 lg:col-span-1"
                  : "bg-white dark:bg-[#111111] border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-4xl mb-2 block">{plan.emoji}</span>
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="my-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <Check
                      size={16}
                      className="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`w-full py-3 px-4 rounded-xl font-bold text-center transition-colors inline-flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 dark:bg-white/[0.06] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.08]"
                }`}
              >
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            方案對比
          </h2>
          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.05]">
                  <th className="text-left py-4 px-4 font-bold">功能</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600 dark:text-blue-400">
                    諮詢
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600 dark:text-blue-400">
                    中型項目
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600 dark:text-blue-400">
                    複雜系統
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 dark:border-white/[0.05] last:border-b-0"
                  >
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.base === "boolean" ? (
                        row.base ? (
                          <Check size={18} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {row.base}
                        </span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check size={18} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {row.pro}
                        </span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check size={18} className="text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {row.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Mini */}
        <motion.div variants={itemVariants} className="mb-12 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
          <h2 className="text-2xl font-bold mb-8">定價常見問題</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">這些費用包括什麼？</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                費用包括所有開發工作、文檔、部署支援和初期技術支援。不包括客戶提供的基礎設施成本（如雲端服務）。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">支付方式如何安排？</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                通常分三期：簽約時 30%，中期 40%，完成時 30%。可根據項目大小和風險進行調整。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">可以提供自定義定價嗎？</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                當然可以。這些是標準方案，但我很樂意根據您的具體需求和預算提供定制方案。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">超期或超支會怎樣？</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                對於固定價格合同，我確保在合理的範圍內。對於 T&M 模式，會提前通知任何額外費用。
              </p>
            </div>
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
              找不到適合的方案？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              我很樂意根據您的具體情況設計一個客製化的方案。讓我們聊聊您的需求。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              開始對話 <ArrowRight size={18} />
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
            href="/faq"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            查看常見問題
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
