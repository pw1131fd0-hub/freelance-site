import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, Github } from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found | OpenClaw" };
  return {
    title: `${project.emoji} ${project.name} | OpenClaw`,
    description: project.description,
    openGraph: {
      title: `${project.name} | OpenClaw`,
      description: project.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${project.name} | OpenClaw`,
      description: project.description,
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
              Case Study
            </span>
            <span className="text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
              {project.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            {project.emoji} {project.name}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Long Description */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111111] rounded-[24px] p-8 border border-slate-100 dark:border-white/[0.05]">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              About This Project
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-[#0F172A] dark:bg-[#0A0F1E] rounded-[24px] p-7 text-white flex flex-col">
            <div className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-5">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-sm font-medium border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-2">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors"
              >
                <Github size={14} />
                View Source
                <ExternalLink size={11} />
              </Link>
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white dark:bg-[#111111] rounded-[24px] p-8 border border-slate-100 dark:border-white/[0.05] mb-8">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            Key Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="text-blue-500 shrink-0 mt-0.5"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prev / Next Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="flex-1 flex items-center gap-3 p-5 bg-white dark:bg-[#111111] rounded-2xl border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors group"
            >
              <ArrowLeft
                size={14}
                className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
              />
              <div>
                <div className="text-xs font-mono text-slate-400 mb-0.5">
                  Previous
                </div>
                <div className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {prev.emoji} {prev.name}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="flex-1 flex items-center justify-end gap-3 p-5 bg-white dark:bg-[#111111] rounded-2xl border border-slate-100 dark:border-white/[0.05] hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors group text-right"
            >
              <div>
                <div className="text-xs font-mono text-slate-400 mb-0.5">
                  Next
                </div>
                <div className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {next.emoji} {next.name}
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
              />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </main>
  );
}
