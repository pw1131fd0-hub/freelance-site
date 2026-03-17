import prisma from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileCode, FileImage, FileText, Link, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({
    include: { project: true },
    orderBy: { createdAt: 'desc' }
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'IMAGE': return <FileImage className="w-4 h-4" />
      case 'DOCUMENT': return <FileText className="w-4 h-4" />
      case 'LINK': return <Link className="w-4 h-4" />
      default: return <FileCode className="w-4 h-4" />
    }
  }

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-white">Asset Vault</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase">Centralized file and link management</p>
        </div>
        <Badge variant="outline" className="border-zinc-800 text-zinc-500 font-mono px-4 h-10">{assets.length} TOTAL ASSETS</Badge>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 rounded-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-950">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Asset Name</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Type</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Linked Project</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-right">Created At</TableHead>
                <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-zinc-600 font-mono italic">
                    NO ASSETS FOUND
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset) => (
                  <TableRow key={asset.id} className="border-zinc-800 hover:bg-zinc-950 transition-colors group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                           {getIcon(asset.type)}
                        </div>
                        <span className="font-bold uppercase tracking-tight">{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-mono border-zinc-800 text-zinc-500 bg-zinc-950">
                        {asset.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500 font-mono text-xs uppercase">{asset.project.title}</TableCell>
                    <TableCell className="text-right text-zinc-600 text-xs font-mono">
                      {asset.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <a href={asset.url} target="_blank" rel="noopener noreferrer">
                           <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800">
                             <ExternalLink className="h-4 w-4" />
                           </Button>
                         </a>
                         <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800">
                           <Download className="h-4 w-4" />
                         </Button>
                       </div>
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