import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">
      <header className="px-6 py-8 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> BACK TO WORK
          </Link>
          <div className="font-bold tracking-tighter">SOLOPRENEUR ONE</div>
        </div>
      </header>

      <main className="px-6 pt-24 max-w-5xl mx-auto space-y-12">
        <div className="space-y-6 text-center">
           <Badge variant="outline" className="border-zinc-800 text-zinc-500 font-mono uppercase tracking-widest px-4 py-1">Case Study</Badge>
           <h1 className="text-5xl lg:text-8xl font-heading font-bold uppercase tracking-tighter leading-none">{params.slug.replace(/-/g, ' ')}</h1>
        </div>

        <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 font-mono text-xl uppercase italic">
           [ High Resolution Visual Placeholder ]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
           <div className="space-y-4">
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Client / Year</h3>
              <p className="font-heading font-bold text-xl uppercase">Internal Project / 2026</p>
           </div>
           <div className="space-y-4">
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Services</h3>
              <p className="font-heading font-bold text-xl uppercase">Design & Development</p>
           </div>
           <div className="space-y-4">
              <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Stack</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                 {['NEXT.JS', 'PRISMA', 'SQLITE', 'TAILWIND'].map(s => (
                   <Badge key={s} className="bg-white text-black font-mono text-[10px]">{s}</Badge>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8 pt-12 border-t border-zinc-900">
           <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">The Challenge</h2>
           <p className="text-zinc-400 text-lg leading-relaxed font-body">
             Detailed description of the problem and the objectives for this project. How we approached the user experience and technical requirements.
           </p>
           <h2 className="text-3xl font-heading font-bold uppercase tracking-tight">The Solution</h2>
           <p className="text-zinc-400 text-lg leading-relaxed font-body">
             Explanation of the architectural decisions and design choices made to solve the problem and deliver a high-performance result.
           </p>
        </div>
      </main>
    </div>
  )
}