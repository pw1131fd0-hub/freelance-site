import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Briefcase, Calendar, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { client: true, milestones: true },
    orderBy: { createdAt: 'desc' }
  })

  const statuses = [
    { label: "DISCOVERY", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Clock },
    { label: "IN_PROGRESS", color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: Briefcase },
    { label: "REVIEW", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Calendar },
    { label: "COMPLETED", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle },
  ]

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white font-sans">
      <div className="flex justify-between items-end">
        <div className="space-y-2 text-left">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-white">Project Command</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase">Track progress and milestones</p>
        </div>
        <Button className="rounded-none bg-white text-black hover:bg-zinc-200 h-12 px-6 gap-2 font-bold uppercase tracking-widest text-xs">
          <Plus className="w-4 h-4" /> NEW PROJECT
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((s) => (
          <div key={s.label} className="bg-zinc-950 border border-zinc-900 p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <s.icon className={`w-3 h-3 ${s.color.split(' ')[1]}`} />
                 <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold uppercase">{s.label}</span>
               </div>
               <Badge className={`text-[10px] ${s.color}`}>{projects.filter(p => p.status === s.label).length}</Badge>
            </div>
            
            <div className="flex flex-col gap-3 min-h-[400px]">
               {projects.filter(p => p.status === s.label).map((p) => (
                 <Link key={p.id} href={`/admin/projects/${p.id}`}>
                   <Card className="bg-zinc-900 border-zinc-800 rounded-none cursor-pointer hover:border-zinc-700 transition-all group">
                     <CardHeader className="p-4 border-b border-zinc-800 group-hover:bg-zinc-950/50">
                       <CardTitle className="text-sm font-heading font-bold uppercase tracking-tight">{p.title}</CardTitle>
                       <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{p.client.name}</p>
                     </CardHeader>
                     <CardContent className="p-4 space-y-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-600 tracking-widest">
                             <span>Milestones</span>
                             <span>{p.milestones.filter(m => m.status === 'COMPLETED').length} / {p.milestones.length}</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-950 border border-zinc-900 overflow-hidden">
                             <div 
                               className="h-full bg-white transition-all duration-1000" 
                               style={{ width: p.milestones.length ? `${(p.milestones.filter(m => m.status === 'COMPLETED').length / p.milestones.length) * 100}%` : '0%' }}
                             />
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <Badge variant="outline" className="text-[9px] font-mono border-zinc-800 text-zinc-600 bg-zinc-950">
                             {p.budget ? `$${p.budget.toLocaleString()}` : 'N/A'}
                          </Badge>
                        </div>
                     </CardContent>
                   </Card>
                 </Link>
               ))}
               
               {projects.filter(p => p.status === s.label).length === 0 && (
                 <div className="flex-grow border border-dashed border-zinc-900 flex items-center justify-center opacity-10">
                    <span className="text-[10px] font-mono uppercase">Empty</span>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
