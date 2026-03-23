"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";

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

const testimonials = [
  {
    id: 1,
    name: "李明昇",
    role: "技術總監",
    company: "電商平台 TechStore",
    content:
      "與 OpenClaw 合作是我們團隊最好的決定。他的客戶流失預測模型在短短 3 個月內就幫我們回收了投資成本，而且他非常專業和易於溝通。",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "王佳慈",
    role: "產品經理",
    company: "金融科技新創 PayFlow",
    content:
      "他深入理解我們的業務需求，並提出了我們從未想過的解決方案。完成度很高，文檔也很清楚，可以直接交給工程團隊進行整合。",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 3,
    name: "陳建宏",
    role: "執行長",
    company: "製造企業 SmartFactory",
    content:
      "在 OpenClaw 的幫助下，我們的品質檢驗從人工變成了全自動化。不僅提升了效率，還大幅降低了誤檢率。他的 MLOps 架構讓我們能自主迭代模型。",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 4,
    name: "黃琴雯",
    role: "數據分析主管",
    company: "零售連鎖 RetailPro",
    content:
      "多語言情感分析項目超出預期。他不只提供模型，還建立了完整的監控和反饋機制。現在我們能即時掌握客戶聲音，這改變了我們的決策方式。",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 5,
    name: "劉傑",
    role: "運營總監",
    company: "物流平台 LogiNext",
    content:
      "時間序列預測模型幫助我們的庫存管理節省了 22% 的成本。OpenClaw 在整個項目中提供的指導和技術支援都無可挑剔。",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 6,
    name: "吳美真",
    role: "首席技術官",
    company: "AI 研究機構 DataLab",
    content:
      "他在深度學習領域的專業知識令人印象深刻。不只是完成了技術任務，還在過程中為我們的團隊提供了寶貴的知識轉移。",
    rating: 5,
    avatar: "👩‍💼",
  },
];

const stats = [
  { value: "20+", label: "已交付項目" },
  { value: "15+", label: "企業客戶" },
  { value: "98%", label: "客戶滿意度" },
  { value: "4.9/5.0", label: "平均評分" },
];

export default function Testimonials() {
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
            客戶評價
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
            來自全球各地客戶的真實評價——他們如何通過 AI 轉化業務。
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#111111] rounded-[28px] p-6 border border-slate-100 dark:border-white/[0.05] text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-[#111111] rounded-[28px] p-7 border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-1 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-white/[0.05]">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <h3 className="font-bold text-sm">{testimonial.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-12 text-white relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-300 text-yellow-300"
                />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed max-w-2xl">
              "OpenClaw 在 AI 領域的專業知識和執行能力令人難以置信。他不只是一名技術顧問，更是一位策略合作夥伴。"
            </p>
            <div className="flex items-center gap-3">
              <span className="text-5xl">👨‍💼</span>
              <div>
                <h3 className="font-bold text-lg">張進豐</h3>
                <p className="text-blue-100">
                  執行長 · AI 創新咨詢有限公司
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-[#111111] rounded-[28px] p-12 border border-slate-100 dark:border-white/[0.05] text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            加入我們的成功客戶名單
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            讓我們幫您打造下一個突破性的 AI 項目。從初始咨詢到完整部署，我們全力支持您的成功。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            開始您的項目
          </Link>
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
