"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

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

const statusColors: Record<string, string> = {
  "✅ 生產就緒": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
};

export default function Projects() {
  const [featured, ...rest] = projects;

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
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl text-base leading-relaxed">
            A selection of things I&apos;ve built — from AI-powered platforms to
            Kubernetes tooling and beyond.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-10 border border-slate-100 dark:border-white/[0.05] group relative overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Featured
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    statusColors[featured.status] ??
                    "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                  }`}
                >
                  {featured.status}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featured.emoji} {featured.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 flex-1 text-base leading-relaxed">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium border border-slate-200 dark:border-white/[0.08]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
              >
                <Github size={15} />
                View on GitHub
                <ExternalLink
                  size={12}
                  className="group-hover/link:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </motion.div>

          {/* Stats / Summary card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 bg-[#0F172A] dark:bg-[#0A0F1E] rounded-[28px] p-8 text-white flex flex-col justify-between"
          >
            <div className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-6">
              Open Source Work
            </div>
            <div className="space-y-5 flex-1">
              <div>
                <div className="text-4xl font-bold leading-none">
                  {projects.length}
                </div>
                <div className="text-sm text-white/50 mt-1">
                  Projects Shipped
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold leading-none">100%</div>
                <div className="text-sm text-white/50 mt-1">
                  Production-Ready
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold leading-none">2026</div>
                <div className="text-sm text-white/50 mt-1">
                  Active Development
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-white/25 uppercase tracking-widest">
              AI · DevOps · Full-Stack
            </div>
          </motion.div>

          {/* Remaining project cards */}
          {rest.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="lg:col-span-4 bg-white dark:bg-[#111111] rounded-[28px] p-7 border border-slate-100 dark:border-white/[0.05] group hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors duration-200 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    statusColors[project.status] ??
                    "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                {project.techStack.length > 3 && (
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-500 rounded-full text-xs border border-slate-200 dark:border-white/[0.06]">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
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
            Interested in working together?
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
