import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Circle, Clock, Mail, User, DollarSign } from "lucide-react"
import Link from "next/link"
import { MilestoneList } from "./MilestoneList"
import { StatusSelector } from "./StatusSelector"

interface ProjectDetailPageProps {
  params: { id: string }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      milestones: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!project) notFound()

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-zinc-900">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter">{project.title}</h1>
            <StatusSelector id={project.id} currentStatus={project.status} />
          </div>
          <p className="text-zinc-500 font-mono text-sm uppercase">Project Manifest / ID: {project.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Milestones */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-zinc-900 border-zinc-800 rounded-none border-l-4 border-l-white">
            <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-heading font-bold uppercase tracking-tight">Project Milestones</CardTitle>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Progress: {project.milestones.filter(m => m.status === 'COMPLETED').length} / {project.milestones.length}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <MilestoneList milestones={project.milestones} />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden">
            <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-950/50">
               <CardTitle className="text-2xl font-heading font-bold uppercase tracking-tight">Brief & Specs</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
               <p className="text-zinc-400 font-body leading-relaxed whitespace-pre-wrap italic">
                 &quot;{project.description || 'No description provided.'}&quot;
               </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Project & Client Info */}
        <div className="space-y-8">
          <Card className="bg-zinc-900 border-zinc-800 rounded-none">
            <CardHeader className="p-6 border-b border-zinc-800">
               <CardTitle className="text-lg font-heading font-bold uppercase tracking-tight flex items-center gap-2">
                 <User className="w-4 h-4 text-zinc-500" /> Client Intelligence
               </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="space-y-1">
                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Name</p>
                 <p className="font-bold uppercase tracking-tight">{project.client.name}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Email</p>
                 <a href={`mailto:${project.client.email}`} className="text-sm font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-2 uppercase">
                   {project.client.email} <Mail className="w-3 h-3" />
                 </a>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Company</p>
                 <p className="text-sm uppercase text-zinc-400">{project.client.company || 'Personal'}</p>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 rounded-none">
            <CardHeader className="p-6 border-b border-zinc-800">
               <CardTitle className="text-lg font-heading font-bold uppercase tracking-tight flex items-center gap-2">
                 <DollarSign className="w-4 h-4 text-zinc-500" /> Commercials
               </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="space-y-1">
                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Budget Allocation</p>
                 <p className="text-2xl font-heading font-bold text-white tracking-tighter">
                   {project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}
                 </p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Start Date</p>
                 <p className="text-sm text-zinc-400 font-mono uppercase">
                   {project.startDate ? project.startDate.toLocaleDateString() : project.createdAt.toLocaleDateString()}
                 </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
