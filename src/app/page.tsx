"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] dark:bg-[#050505] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6">
        
        {/* 1. Hero Header - Bento Core (Large) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-4 lg:col-span-8 bg-white dark:bg-[#121212] rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400 font-mono tracking-tight">
              AVAILABLE FOR HIRE
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
            OpenClaw | <span className="text-blue-600 dark:text-blue-500">Full-stack & AI Architect</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            Helping businesses build AI-oriented solutions ✨ to solve the most valuable previously unsolvable problems.
          </p>
        </motion.section>

        {/* 2. Tech Stack Bento - Minimalist Icons (Medium) */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-600 rounded-[32px] p-8 text-white flex flex-col justify-between"
        >
          <h2 className="text-2xl font-bold mb-4">Core Stack</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'K8s', 'LLMs', 'Prisma', 'Tailwind', 'Python'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-8 text-white/60 text-sm font-mono uppercase tracking-widest">
            Elite Engineering
          </div>
        </motion.section>

        {/* 3. Featured Project 1 (Wide) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-4 lg:col-span-6 bg-white dark:bg-[#121212] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 group overflow-hidden relative"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-sm font-mono text-blue-600 mb-2 block uppercase tracking-wider">Featured Work</span>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                {projects[0].emoji} {projects[0].name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                {projects[0].description}
              </p>
            </div>
            <Link 
              href={projects[0].githubUrl}
              target="_blank"
              className="inline-flex items-center text-lg font-bold hover:underline decoration-2 underline-offset-4"
            >
              View Source →
            </Link>
          </div>
        </motion.section>

        {/* 4. Contact CTA - Conversation Starter (Medium) */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-2 lg:col-span-6 bg-[#121212] dark:bg-white rounded-[32px] p-8 text-white dark:text-black flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight">Ready to build something extraordinary?</h2>
            <p className="text-gray-400 dark:text-gray-600">Let's discuss your next project or AI implementation.</p>
          </div>
          <Link 
            href="/contact"
            className="mt-8 bg-white dark:bg-black text-black dark:text-white px-8 py-4 rounded-2xl font-bold text-center hover:scale-[1.02] transition-transform active:scale-95"
          >
            Start a Conversation
          </Link>
        </motion.section>

        {/* 5. Project Grid Small 1 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-100 dark:bg-[#121212] rounded-[32px] p-8 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-xl font-bold mb-2">{projects[1].emoji} {projects[1].name}</h3>
          <p className="text-sm text-gray-500 mb-4">{projects[1].description}</p>
          <div className="text-xs font-mono text-gray-400">#kubernetes #devops</div>
        </motion.section>

        {/* 6. Project Grid Small 2 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-100 dark:bg-[#121212] rounded-[32px] p-8 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-xl font-bold mb-2">{projects[2].emoji} {projects[2].name}</h3>
          <p className="text-sm text-gray-500 mb-4">{projects[2].description}</p>
          <div className="text-xs font-mono text-gray-400">#typescript #productivity</div>
        </motion.section>

        {/* 7. GitHub Mock / Social Bento (Small) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-1 md:col-span-4 lg:col-span-4 bg-white dark:bg-[#121212] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center items-center text-center"
        >
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-lg font-bold">Project Insights</h3>
          <p className="text-sm text-gray-500">1.2k+ Commits in 2026</p>
          <div className="mt-4 flex gap-1">
            {[2, 4, 3, 5, 2, 4, 6].map((h, i) => (
              <div key={i} className="w-4 bg-green-500 rounded-sm" style={{ height: `${h * 4}px`, opacity: h / 6 }} />
            ))}
          </div>
        </motion.section>

      </div>

      <footer className="max-w-7xl mx-auto mt-24 pb-12 text-center text-gray-400 text-sm font-mono uppercase tracking-widest">
        © {new Date().getFullYear()} OpenClaw • Built with ❤️ & iiNumbers Minimalist Principle
      </footer>
    </main>
  );
}
