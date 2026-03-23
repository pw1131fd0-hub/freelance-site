"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

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

const faqs = [
  {
    category: "項目與合作",
    items: [
      {
        q: "您的典型項目週期是多長？",
        a: "大部分項目通常需要 4-12 週，具體取決於複雜度。我會在初期咨詢中提供精確的時程估計。",
      },
      {
        q: "如何開始第一個項目？",
        a: "很簡單：(1) 與我進行 30 分鐘的免費咨詢電話，討論您的需求；(2) 我會提供詳細的提案和時程；(3) 簽署合同並開始開發。無風險，無隱藏費用。",
      },
      {
        q: "您接受哪些付款方式？",
        a: "我接受銀行轉賬、信用卡、PayPal 和加密貨幣。對於長期項目，我提供分期付款方案。",
      },
      {
        q: "項目中途可以改變需求嗎？",
        a: "當然可以。我會定期與您同步進度，適應合理的需求變更。如果變更增加了工作量，我會透明地與您溝通新的估計。",
      },
    ],
  },
  {
    category: "技術與能力",
    items: [
      {
        q: "您最擅長哪些技術？",
        a: "我的專長是 Python、PyTorch、TensorFlow、Scikit-learn、XGBoost 以及雲基礎設施（AWS、GCP）。我也精通全棧開發（JavaScript、Node.js、Next.js）和 MLOps（Docker、Kubernetes、MLflow）。",
      },
      {
        q: "如果項目需要您不熟悉的技術怎麼辦？",
        a: "我會誠實地告訴您。如果這超出我的能力，我會介紹值得信賴的合作夥伴。但大多數情況下，我的學習能力很強，可以快速掌握新技術。",
      },
      {
        q: "您能提供技術諮詢嗎？",
        a: "當然。我提供按小時計費的技術顧問服務，幫助您的團隊制定架構、審查代碼或解決複雜問題。",
      },
      {
        q: "項目完成後會提供支援嗎？",
        a: "會的。所有項目都包括 30 天的免費支援期。之後可以按需購買延展支援。",
      },
    ],
  },
  {
    category: "數據與隱私",
    items: [
      {
        q: "我的數據安全嗎？",
        a: "絕對安全。我遵循企業級安全標準，所有敏感數據都會加密存儲。我可以簽署 NDA 和數據處理協議。",
      },
      {
        q: "您會分享我的項目或數據嗎？",
        a: "不會。除非您明確同意，否則您的項目和數據完全保密。我不會用您的案例作為案例研究，除非您同意。",
      },
      {
        q: "數據處理符合 GDPR 嗎？",
        a: "符合。我遵守 GDPR、CCPA 和其他隱私法規。所有數據處理都有簽署的協議。",
      },
    ],
  },
  {
    category: "定價與合同",
    items: [
      {
        q: "您如何定價？",
        a: "我的定價基於項目複雜度、工作量和時程。固定價格或時間&材料（T&M）取決於項目需求的清晰度。",
      },
      {
        q: "有隱藏費用嗎？",
        a: "沒有。所有費用在合同中詳細列出，包括潛在的額外成本。如果需要超出原定範圍的工作，我會提前告知。",
      },
      {
        q: "如果不滿意該怎麼辦？",
        a: "我保證高品質交付。如果您對結果不滿意，我們會坐下來討論，我會免費修改直到滿意。",
      },
    ],
  },
  {
    category: "企業與團隊",
    items: [
      {
        q: "您能與我的團隊合作嗎？",
        a: "當然。我經常與內部團隊合作，提供指導、代碼審查和知識轉移。",
      },
      {
        q: "您提供培訓嗎？",
        a: "提供。我可以為您的團隊提供定制化培訓課程，涵蓋機器學習、深度學習或 MLOps 等主題。",
      },
      {
        q: "您能簽署企業級合同嗎？",
        a: "可以。我熟悉企業採購流程，可以與您的法務團隊合作。",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors text-left"
      >
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="p-5 bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-white/[0.05]">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            常見問題
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            關於我的服務、技術能力、定價和合作流程的常見問題。
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-12">
          {faqs.map((section) => (
            <motion.div key={section.category} variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <FAQItem key={idx} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              還有其他問題嗎？
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              歡迎隨時聯絡我。我很樂意直接為您解答。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              直接聯絡
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
