import Link from "next/link";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { ArrowRight, ExternalLink, Github, Mail } from "lucide-react";
import { HomeAnimatedGrid, AnimatedItem } from "@/components/HomeAnimatedGrid";

const services = [
  {
    icon: "🤖",
    title: "機器學習建模",
    desc: "端對端 ML 解決方案：特徵工程、模型訓練、SHAP 解釋性分析與生產部署。",
  },
  {
    icon: "📊",
    title: "資料分析與視覺化",
    desc: "從原始資料到洞察報告——互動式儀表板、統計分析與 BI 系統整合。",
  },
  {
    icon: "⚙️",
    title: "MLOps 與資料工程",
    desc: "ML Pipeline 自動化、實驗追蹤、模型監控與資料版本控制。",
  },
  {
    icon: "🧠",
    title: "深度學習 / NLP / CV",
    desc: "Transformer 微調、GAN 圖像生成、多語言 NLP 與電腦視覺應用開發。",
  },
];

const stats = [
  { value: "5+", label: "ML 專案交付" },
  { value: "93%", label: "最高模型準確率" },
  { value: "<24h", label: "回覆時間" },
];

const techStack = [
  { name: "Python", bg: "bg-yellow-400/20" },
  { name: "PyTorch", bg: "bg-orange-400/20" },
  { name: "scikit-learn", bg: "bg-blue-400/20" },
  { name: "Transformers", bg: "bg-yellow-300/20" },
  { name: "pandas / NumPy", bg: "bg-cyan-400/20" },
  { name: "LightGBM / XGBoost", bg: "bg-emerald-400/20" },
  { name: "MLflow / DVC", bg: "bg-indigo-400/20" },
  { name: "Airflow", bg: "bg-red-400/20" },
  { name: "FastAPI", bg: "bg-teal-400/20" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <HomeAnimatedGrid>
        {/* ── 1. HERO ─────────────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-3 lg:col-span-8 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-[#111111] dark:via-blue-950/10 dark:to-[#111111] rounded-[28px] p-8 md:p-12 border border-slate-100 dark:border-white/[0.05] flex flex-col justify-center min-h-[340px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 dark:bg-blue-900/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none group-hover:opacity-75 transition-opacity duration-500" />

          <div className="relative z-10 flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-600 dark:text-emerald-400 font-mono">
              接受專案委託 · 台灣 🇹🇼
            </span>
          </div>

          <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-3">
            嗨，我是{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500">
              OpenClaw
            </span>
          </h1>
          <h2 className="relative z-10 text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 mb-5">
            資料科學家 &amp; ML 工程師
          </h2>
          <p className="relative z-10 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8">
            以機器學習與深度學習解決真實業務問題。從客戶流失預測、NLP 情感分析到圖像生成，資料驅動，結果可解釋。
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
            >
              查看作品集 <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/[0.08] hover:border-blue-200 dark:hover:border-blue-800/30"
            >
              服務項目
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm hover:bg-white dark:hover:bg-white/[0.12] transition-all border border-slate-200 dark:border-white/[0.08]"
            >
              <Mail size={16} /> 立刻聯絡
            </Link>
          </div>
        </AnimatedItem>

        {/* ── 2. STATS ─────────────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-1 lg:col-span-4 bg-blue-600 rounded-[28px] p-8 text-white flex flex-col justify-between">
          <div className="text-xs font-mono uppercase tracking-[0.15em] text-blue-200 mb-6">
            數據一覽
          </div>
          <div className="space-y-5 flex-1">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold leading-none">{s.value}</div>
                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 text-xs font-mono text-blue-300 uppercase tracking-widest">
            台灣 🇹🇼
          </div>
        </AnimatedItem>

        {/* ── 3. FEATURED PROJECT ──────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-7 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] group relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              精選專案
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {projects[0].emoji} {projects[0].name}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-5 flex-1 text-sm md:text-base leading-relaxed">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {projects[0].techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium border border-slate-200 dark:border-white/[0.08]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <Link
                href={`/projects/${projects[0].id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors group/link"
              >
                案例研究
                <ArrowRight
                  size={13}
                  className="group-hover/link:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href={projects[0].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={14} />
                GitHub
              </Link>
            </div>
          </div>
        </AnimatedItem>

        {/* ── 4. CORE STACK ────────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-5 bg-[#0F172A] dark:bg-[#0A0F1E] rounded-[28px] p-8 text-white flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-5">
              技術棧
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3.5 py-1.5 ${tech.bg} text-white/80 rounded-full text-sm font-medium border border-white/10 backdrop-blur-sm`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 text-xs font-mono text-white/25 uppercase tracking-widest">
            資料驅動 · 結果可解釋
          </div>
        </AnimatedItem>

        {/* ── 5-7. PROJECT CARDS ───────────────────────────────── */}
        {projects.slice(1, 4).map((project) => (
          <AnimatedItem
            key={project.id}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-white dark:bg-[#111111] rounded-[28px] p-7 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors duration-200 flex flex-col"
          >
            <h3 className="text-base font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.emoji} {project.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 rounded-full text-xs border border-slate-200 dark:border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors"
              >
                Case Study <ArrowRight size={10} />
              </Link>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={12} />
                GitHub
                <ExternalLink size={10} />
              </Link>
            </div>
          </AnimatedItem>
        ))}

        {/* ── 8. SERVICES ──────────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-6 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
          <h2 className="text-lg font-bold mb-5">服務項目</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-4 bg-slate-50 dark:bg-white/[0.025] rounded-2xl border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors"
              >
                <div className="text-xl mb-2">{s.icon}</div>
                <h3 className="text-sm font-bold mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedItem>

        {/* ── 9. CONTACT CTA ───────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-6 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              有專案想法了嗎？
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              一起打造非凡的產品。通常 24 小時內回覆。
            </p>
          </div>
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="flex-1 text-center bg-white text-blue-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors"
            >
              開始對話
            </Link>
            <a
              href="mailto:contact@openclaw.dev"
              className="flex-1 text-center bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors"
            >
              直接寄信
            </a>
          </div>
        </AnimatedItem>

        {/* ── 10. BLOG PREVIEW ─────────────────────────────────── */}
        <AnimatedItem className="col-span-1 md:col-span-4 lg:col-span-12 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">最新文章</h2>
            <Link
              href="/blog"
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              查看全部 <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="p-5 bg-slate-50 dark:bg-white/[0.025] rounded-2xl border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors group block"
              >
                <time className="text-xs font-mono text-slate-400 mb-2 block">
                  {post.date}
                </time>
                <h3 className="text-sm font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </AnimatedItem>
      </HomeAnimatedGrid>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 pb-10 flex flex-col gap-6 text-slate-400 text-xs font-mono border-t border-slate-100 dark:border-white/[0.05] pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <p className="font-semibold text-slate-600 dark:text-slate-300 mb-2">產品</p>
            <div className="space-y-1 text-xs">
              <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">作品集</Link>
              <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">服務項目</Link>
              <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">定價方案</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-600 dark:text-slate-300 mb-2">案例</p>
            <div className="space-y-1 text-xs">
              <Link href="/case-studies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">案例研究</Link>
              <Link href="/testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">客戶評價</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-600 dark:text-slate-300 mb-2">關於</p>
            <div className="space-y-1 text-xs">
              <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">關於我</Link>
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">部落格</Link>
              <Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">常見問題</Link>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-3 md:col-span-3 flex flex-col gap-2">
            <p className="font-semibold text-slate-600 dark:text-slate-300">聯繫</p>
            <Link
              href="/contact"
              className="px-4 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit"
            >
              開始對話
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-white/[0.05]">
          <span>© {new Date().getFullYear()} OpenClaw · 版權所有</span>
          <Link
            href="/admin"
            className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-xs"
          >
            後台管理
          </Link>
        </div>
      </footer>
    </main>
  );
}
