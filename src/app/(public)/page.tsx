import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";
import { LeadForm } from "@/components/shared/LeadForm";
import prisma from "@/lib/prisma";

export default async function LandingPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'COMPLETED' },
    take: 4,
    orderBy: { createdAt: 'desc' }
  })

  // Fallback if no completed projects
  const displayProjects = projects.length > 0 ? projects : [
    {
      title: "Obsidian Dashboard",
      description: "Web App",
      slug: "obsidian-dashboard",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Chrome Extension",
      description: "Tools",
      slug: "chrome-extension",
      image: "https://images.unsplash.com/photo-1614850523296-e811cf9ee177?auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <div className="flex flex-col gap-24 pb-24 bg-zinc-950">
      {/* Hero Section */}
      <section className="px-6 pt-32 lg:pt-48 max-w-7xl mx-auto text-center flex flex-col items-center gap-8">
        <Badge variant="outline" className="px-4 py-1 border-zinc-800 text-zinc-500 font-mono">
          AVAILABLE FOR NEW PROJECTS
        </Badge>
        <h1 className="text-6xl lg:text-8xl font-heading font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          Crafting <span className="text-zinc-600">Exceptional</span> Digital Experiences.
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">
          Independent designer and developer focusing on high-end branding and full-stack architecture.
          Bridging the gap between aesthetics and performance.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-zinc-200">
            View Work
          </Button>
          <a href="#contact">
            <Button size="lg" variant="outline" className="rounded-full px-8 border-zinc-800 hover:bg-zinc-900">
              Get in Touch
            </Button>
          </a>
        </div>
      </section>

      {/* Featured Work */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12 border-l-4 border-white pl-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-heading font-bold uppercase tracking-tighter">Featured Projects</h2>
            <p className="text-zinc-500 font-mono text-sm uppercase">Selected work / 2024 - 2026</p>
          </div>
          <Link href="/portfolio" className="text-sm font-medium flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono">
            VIEW ALL <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayProjects.map((project, i) => (
            <Link key={i} href={`/portfolio/${'slug' in project ? project.slug : project.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="bg-zinc-900/50 border-zinc-900 overflow-hidden group cursor-pointer hover:border-zinc-800 transition-all rounded-none">
                <div className="aspect-video relative overflow-hidden bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={'image' in project ? project.image : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="object-cover w-full h-full opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </div>
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-heading font-bold uppercase tracking-tight">{project.title}</CardTitle>
                      <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest">{project.description || 'Project'}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-32 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Palette className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold font-heading uppercase tracking-tight">Creative Direction</h3>
            <p className="text-zinc-500 leading-relaxed font-body">
              Branding, UI/UX, and creative direction. I help startups define their visual language and stand out in crowded markets.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Code className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold font-heading uppercase tracking-tight">Full-Stack Dev</h3>
            <p className="text-zinc-500 leading-relaxed font-body">
              Full-stack architecture with a focus on performance, scalability, and clean code. Built on the modern web stack.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold font-heading uppercase tracking-tight">Performance</h3>
            <p className="text-zinc-500 leading-relaxed font-body">
              SEO, speed optimization, and high-conversion landing pages that actually work for your business goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-7xl font-heading font-bold uppercase tracking-tighter">Let&apos;s build <br/> something new.</h2>
          <p className="text-zinc-500 font-mono text-sm uppercase">Estimated response time: 24 hours</p>
        </div>
        <LeadForm />
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 max-w-7xl mx-auto w-full border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-xs font-mono uppercase tracking-widest">
         <span>© 2026 SOLOPRENEUR ONE — COMMAND CENTER</span>
         <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="hover:text-white transition-colors">GITHUB</a>
            <a href="#" className="hover:text-white transition-colors">DRIBBBLE</a>
         </div>
      </footer>
    </div>
  );
}