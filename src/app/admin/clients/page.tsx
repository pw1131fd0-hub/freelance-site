import prisma from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: { projects: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-white">Client Directory</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase">Manage client relationships and history</p>
        </div>
        <Badge variant="outline" className="border-zinc-800 text-zinc-500 font-mono px-4 h-10">{clients.length} ACTIVE CLIENTS</Badge>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 rounded-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-950">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Client Name</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Email</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Company</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-center">Active Projects</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-right">Acquisition Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-zinc-600 font-mono italic">
                    NO CLIENTS REGISTERED
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id} className="border-zinc-800 hover:bg-zinc-950 transition-colors group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                           <Users className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-bold uppercase tracking-tight">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-500 font-mono text-xs">{client.email}</TableCell>
                    <TableCell className="text-zinc-500 font-mono text-xs uppercase">{client.company || 'Personal'}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono text-[10px] border-zinc-800 text-zinc-400">
                        {client.projects.length} PROJECTS
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-zinc-600 text-xs font-mono">
                      {client.createdAt.toLocaleDateString()}
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