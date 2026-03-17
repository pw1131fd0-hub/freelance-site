import prisma from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LeadActions } from "@/components/shared/LeadActions"

export default async function CRMPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-white">Inquiry Inbox</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase">Manage leads and potential projects</p>
        </div>
        <div className="flex gap-4">
           <Badge variant="outline" className="border-zinc-800 text-zinc-500 font-mono px-4 h-10">{inquiries.length} TOTAL LEADS</Badge>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 rounded-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-950">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Date</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Contact</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Project Type</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Budget</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Score</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Status</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-24 text-zinc-600 font-mono italic">
                    NO INQUIRIES FOUND
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} className="border-zinc-800 hover:bg-zinc-950 transition-colors group">
                    <TableCell className="text-zinc-500 text-xs font-mono">
                      {inquiry.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold uppercase tracking-tight">{inquiry.name}</span>
                        <span className="text-xs text-zinc-500">{inquiry.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] border-zinc-800 bg-zinc-950 font-mono uppercase">
                        {inquiry.projectType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-zinc-400">
                      {inquiry.budget ? `$${inquiry.budget.toLocaleString()}` : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden border border-zinc-900">
                           <div 
                             className="h-full bg-emerald-500" 
                             style={{ width: `${Math.min(inquiry.score, 100)}%` }}
                           />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">{inquiry.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-[10px] uppercase font-mono border-zinc-800", inquiry.status === 'NEW' ? "bg-zinc-800 text-zinc-400" : "bg-emerald-500/10 text-emerald-500")}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <LeadActions id={inquiry.id} email={inquiry.email} projectType={inquiry.projectType} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
