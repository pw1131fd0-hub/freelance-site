"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Mail } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const services = [
  {
    icon: "⚡",
    title: "Full-Stack Development",
    desc: "End-to-end web apps with Next.js, TypeScript, and modern databases.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "LLM-powered features, RAG pipelines, and agent architectures.",
  },
  {
    icon: "☸️",
    title: "DevOps & Infrastructure",
    desc: "Kubernetes, CI/CD, Docker — shipping with confidence at scale.",
  },
  {
    icon: "💡",
    title: "Tech Consulting",
    desc: "Architecture reviews, stack selection, and performance audits.",
  },
];

const stats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "1.2k+", label: "Commits in 2026" },
  { value: "<24h", label: "Response Time" },
];

const techStack = [
  { name: "Next.js", bg: "bg-white/10 dark:bg-white/5" },
  { name: "TypeScript", bg: "bg-blue-400/20" },
  { name: "Kubernetes", bg: "bg-purple-400/20" },
  { name: "Python", bg: "bg-yellow-400/20" },
  { name: "LLMs / AI", bg: "bg-emerald-400/20" },
  { name: "Prisma", bg: "bg-indigo-400/20" },
  { name: "Docker", bg: "bg-cyan-400/20" },
  { name: "PostgreSQL", bg: "bg-orange-400/20" },
  { name: "Tailwind CSS", bg: "bg-teal-400/20" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-5"
      >
        {/* ── 1. HERO ─────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-3 lg:col-span-8 bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-12 border border-slate-100 dark:border-white/[0.05] flex flex-col justify-center min-h-[340px]"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-600 dark:text-emerald-400 font-mono">
              Available for Projects
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-3">
            Hi, I&apos;m{" "}
            <span className="text-blue-600 dark:text-blue-400">OpenClaw</span>
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-slate-400 dark:text-slate-500 mb-5">
            Full-Stack &amp; AI Architect
          </h2>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-8">
            Building AI-oriented solutions to solve the most valuable,
            previously unsolvable problems — from LLM pipelines to production
            Kubernetes clusters.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              View My Work <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/[0.08]"
            >
              <Mail size={15} /> Let&apos;s Talk
            </Link>
          </div>
        </motion.section>

        {/* ── 2. STATS ─────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-1 lg:col-span-4 bg-blue-600 rounded-[28px] p-8 text-white flex flex-col justify-between"
        >
          <div className="text-xs font-mono uppercase tracking-[0.15em] text-blue-200 mb-6">
            At a Glance
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
            Based in Taiwan 🇹🇼
          </div>
        </motion.section>

        {/* ── 3. FEATURED PROJECT ──────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-7 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] group relative overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
              Featured Project
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
            <Link
              href={projects[0].githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
            >
              <Github size={15} />
              View on GitHub
              <ArrowRight
                size={13}
                className="group-hover/link:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </motion.section>

        {/* ── 4. CORE STACK ────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-5 bg-[#0F172A] dark:bg-[#0A0F1E] rounded-[28px] p-8 text-white flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-5">
              Core Stack
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
            Elite Engineering · Building at scale
          </div>
        </motion.section>

        {/* ── 5-7. PROJECT CARDS ───────────────────────────────── */}
        {projects.slice(1, 4).map((project) => (
          <motion.section
            key={project.id}
            variants={itemVariants}
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
          </motion.section>
        ))}

        {/* ── 8. SERVICES ──────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-6 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]"
        >
          <h2 className="text-lg font-bold mb-5">What I Offer</h2>
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
        </motion.section>

        {/* ── 9. CONTACT CTA ───────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-6 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-[28px] p-8 text-white flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Let&apos;s build something extraordinary together. I typically
              respond within 24 hours.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="flex-1 text-center bg-white text-blue-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors"
            >
              Start a Conversation
            </Link>
            <a
              href="mailto:contact@openclaw.dev"
              className="flex-1 text-center bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors"
            >
              Email Directly
            </a>
          </div>
        </motion.section>

        {/* ── 10. BLOG PREVIEW ─────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="col-span-1 md:col-span-4 lg:col-span-12 bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Latest Thoughts</h2>
            <Link
              href="/blog"
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              View All <ArrowRight size={13} />
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
        </motion.section>
      </motion.div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-mono border-t border-slate-100 dark:border-white/[0.05] pt-8">
        <span>© {new Date().getFullYear()} OpenClaw · All rights reserved</span>
        <div className="flex items-center gap-5">
          <Link
            href="/projects"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
