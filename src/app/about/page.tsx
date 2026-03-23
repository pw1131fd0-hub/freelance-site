"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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

const timeline = [
  {
    year: "2024 - 現在",
    title: "自由職業 AI 顧問",
    description:
      "幫助企業從策劃到部署，構建端對端的 ML 解決方案。領導超過 20 個企業級項目，涵蓋 CV、NLP、時間序列預測等領域。",
  },
  {
    year: "2022 - 2024",
    title: "資深機器學習工程師",
    company: "TechCorp Asia",
    description:
      "領導 ML 研發團隊，開發推薦系統、客戶分析平台和實時異常檢測系統。管理 3 位數據科學家，建立 MLOps 基礎設施。",
  },
  {
    year: "2020 - 2022",
    title: "數據科學家",
    company: "FinanceAI Solutions",
    description:
      "從零開始構建風險評估模型和信用評分系統。提升準確率 34%，年度收益增加 $2.8M。",
  },
  {
    year: "2018 - 2020",
    title: "數據分析師",
    company: "StartupXYZ",
    description:
      "初創期間的第一位數據雇員。建立數據基礎設施、儀表板和分析流程，支援業務決策。",
  },
];

const expertise = [
  {
    icon: "🤖",
    title: "機器學習",
    skills: ["分類與回歸", "特徵工程", "超參數調優", "模型解釋性"],
  },
  {
    icon: "🧠",
    title: "深度學習",
    skills: ["CNN / RNN", "Transformers", "遷移學習", "微調"],
  },
  {
    icon: "📊",
    title: "數據工程",
    skills: ["ETL 管道", "數據版本控制", "云基礎設施", "實時數據"],
  },
  {
    icon: "⚙️",
    title: "MLOps",
    skills: ["模型部署", "監控告警", "CI/CD", "容器化"],
  },
];

const languages = [
  { lang: "Python", level: 95 },
  { lang: "SQL", level: 90 },
  { lang: "Kubernetes", level: 80 },
  { lang: "JavaScript/TypeScript", level: 75 },
];

export default function About() {
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
          <div className="flex items-start gap-6">
            <div className="text-7xl">🧑‍💻</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                關於 OpenClaw
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                機器學習工程師 | 數據科學家 | 創業者
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <h2 className="text-2xl font-bold mb-6">我的故事</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                我叫 OpenClaw，一位熱衷於用機器學習解決真實業務問題的工程師。從
                2018 年開始從事數據工作，我見證了 AI
                如何從實驗室概念轉變成企業級資產。
              </p>
              <p>
                在過去 6
                年中，我為超過 15
                家企業交付了變革性的 AI
                解決方案，從初創公司到上市企業。我的專長跨越機器學習、深度學習和
                MLOps——即：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  設計與訓練模型，讓複雜問題變簡單
                </li>
                <li>
                  建立生產級基礎設施，確保模型穩定高效
                </li>
                <li>
                  用數據驅動決策，為業務帶來實質收益
                </li>
              </ul>
              <p>
                我相信好的 AI
                不只是高精度模型，而是能真正融入業務流程、為用戶創造價值的解決方案。每個項目我都投入完整的熱情和專業知識。
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[28px] p-6 text-white">
              <div className="text-4xl font-bold mb-2">6+</div>
              <div className="text-sm text-blue-200">年行業經驗</div>
            </div>
            <div className="bg-white dark:bg-[#111111] rounded-[28px] p-6 border border-slate-100 dark:border-white/[0.05]">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                20+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                已交付企業項目
              </div>
            </div>
            <div className="bg-white dark:bg-[#111111] rounded-[28px] p-6 border border-slate-100 dark:border-white/[0.05]">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                98%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                客戶滿意度
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold mb-8">核心專長</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((exp) => (
              <div
                key={exp.title}
                className="bg-white dark:bg-[#111111] rounded-[28px] p-6 border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
              >
                <div className="text-4xl mb-4">{exp.icon}</div>
                <h3 className="font-bold text-lg mb-4">{exp.title}</h3>
                <ul className="space-y-2">
                  {exp.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">技術棧與語言</h2>
          <div className="space-y-6">
            {languages.map((skill) => (
              <div key={skill.lang}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{skill.lang}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold mb-8">職業歷程</h2>
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-8 pb-8 border-l-2 border-blue-600/30 dark:border-blue-400/20 last:pb-0 last:border-l-transparent"
              >
                <div className="absolute -left-3.5 top-1 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-[#F8FAFC] dark:border-[#080808]" />
                <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-slate-100 dark:border-white/[0.05]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  {item.company && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                      @ {item.company}
                    </p>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="font-bold text-lg mb-2">所有者心態</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              我將您的成功視為自己的成功，全力投入每個項目。
            </p>
          </div>
          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="font-bold text-lg mb-2">結果導向</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              不是完美的代碼，而是能為業務帶來實質收益的方案。
            </p>
          </div>
          <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-bold text-lg mb-2">持續學習</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              AI 領域日新月異，我致力於始終走在技術最前沿。
            </p>
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
              準備開始一次對話了嗎？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              無論您是在規劃一個新項目，還是正在優化現有系統，我很樂意幫助。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              聯絡我
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
