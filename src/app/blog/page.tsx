"use client";

import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

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

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={14} />
            返回首頁
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            思想與見解
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl text-base leading-relaxed">
            撰寫關於 AI、工程實踐、Kubernetes 及各種值得探討的主題。
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured post */}
          {featured && (
            <motion.div variants={itemVariants} className="lg:col-span-8">
              <Link
                href={`/blog/${featured.slug}`}
                className="block h-full bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-10 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors duration-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 block">
                    最新文章
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-5 text-base leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <time>{featured.date}</time>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {getReadingTime(featured.content)} 分鐘閱讀
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      閱讀文章
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Post count card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 bg-blue-600 rounded-[28px] p-8 text-white flex flex-col justify-between"
          >
            <div className="text-xs font-mono uppercase tracking-[0.15em] text-blue-200 mb-6">
              寫作
            </div>
            <div className="space-y-5 flex-1">
              <div>
                <div className="text-4xl font-bold leading-none">
                  {blogPosts.length}
                </div>
                <div className="text-sm text-blue-200 mt-1">篇文章</div>
              </div>
              <div>
                <div className="text-4xl font-bold leading-none">2026</div>
                <div className="text-sm text-blue-200 mt-1">活躍年份</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 text-xs font-mono text-blue-300 uppercase tracking-widest">
              AI · DevOps · 架構
            </div>
          </motion.div>

          {/* Rest of posts */}
          {rest.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="lg:col-span-4"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full bg-white dark:bg-[#111111] rounded-[28px] p-7 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors duration-200 flex flex-col"
              >
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                  <time>{post.date}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} />
                    {getReadingTime(post.content)} 分
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

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
            與我合作 →
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
