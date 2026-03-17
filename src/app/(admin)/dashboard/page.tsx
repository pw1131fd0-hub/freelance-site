import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Briefcase, Zap } from "lucide-react"

export default async function DashboardPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  const stats = [
    { label: "Total Leads", value: await prisma.inquiry.count(), icon: Users },
    { label: "Active Projects", value: await prisma.project.count({ where: { status: 'IN_PROGRESS' } }), icon: Briefcase },
    { label: "Completed", value: await prisma.project.count({ where: { status: 'COMPLETED' } }), icon: Zap },
    { label: "Clients", value: await prisma.client.count(), icon: FileText },
  ]

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter">Command Center</h1>
        <p className="text-zinc-500 font-mono text-sm uppercase">Overview / 2026-03-17</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-zinc-900 border-zinc-800 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase text-zinc-500 tracking-widest">{stat.label}</CardTitle>
              <stat.icon className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-heading font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800 rounded-none">
          <CardHeader className="border-b border-zinc-800 bg-zinc-950/50">
            <CardTitle className="text-xl font-heading font-bold uppercase tracking-tight">Recent Inquiries</CardTitle>
            <CardDescription className="text-zinc-500 text-xs font-mono">LATEST LEADS FROM LANDING PAGE</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-zinc-950">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Name</TableHead>
                  <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Category</TableHead>
                  <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Score</TableHead>
                  <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-zinc-600 font-mono italic">
                      NO INQUIRIES YET
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} className="border-zinc-800 hover:bg-zinc-950 transition-colors">
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell className="text-zinc-500 text-xs">{inquiry.projectType}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px] border-zinc-700">{inquiry.score}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">{inquiry.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Placeholder for Revenue Pipeline or something */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-none">
           <CardHeader className="border-b border-zinc-800 bg-zinc-950/50">
             <CardTitle className="text-xl font-heading font-bold uppercase tracking-tight">Revenue Pipeline</CardTitle>
             <CardDescription className="text-zinc-500 text-xs font-mono">ESTIMATED $ FROM QUALIFIED LEADS</CardDescription>
           </CardHeader>
           <CardContent className="h-[200px] flex items-center justify-center text-zinc-700 font-mono text-xs uppercase italic">
              [ Analytics Chart Placeholder ]
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
