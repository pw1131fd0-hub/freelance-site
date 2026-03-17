'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Clock, Loader2 } from 'lucide-react'
import { updateMilestone } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Milestone } from '@prisma/client'

interface MilestoneListProps {
  milestones: Milestone[]
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const toggleStatus = async (id: string, currentStatus: string) => {
    setLoadingId(id)
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
    await updateMilestone(id, newStatus)
    setLoadingId(null)
  }

  return (
    <div className="flex flex-col">
      {milestones.length === 0 ? (
        <div className="p-12 text-center text-zinc-600 font-mono text-sm uppercase italic">
          No milestones defined for this project.
        </div>
      ) : (
        milestones.map((m) => (
          <div 
            key={m.id} 
            className={cn(
              "flex items-center justify-between p-8 border-b border-zinc-800 last:border-0 hover:bg-zinc-950 transition-colors group",
              m.status === 'COMPLETED' ? "bg-emerald-500/5" : "bg-transparent"
            )}
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                {m.status === 'COMPLETED' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-zinc-800" />
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-full bg-zinc-900 -z-10 group-last:hidden" />
              </div>
              <div className="space-y-1">
                <h3 className={cn("text-lg font-heading font-bold uppercase tracking-tight", m.status === 'COMPLETED' ? "text-zinc-400 line-through" : "text-white")}>
                  {m.title}
                </h3>
                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                  Order: {m.order + 1} / {m.status}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => toggleStatus(m.id, m.status)}
              disabled={loadingId === m.id}
              variant="outline"
              className={cn(
                "rounded-none h-10 px-6 font-mono text-[10px] uppercase tracking-widest transition-all",
                m.status === 'COMPLETED' 
                  ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10" 
                  : "border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900"
              )}
            >
              {loadingId === m.id ? (
                <Loader2 className="w-3 h-3 animate-spin mr-2" />
              ) : null}
              {m.status === 'COMPLETED' ? 'REVERT TO PENDING' : 'MARK AS COMPLETE'}
            </Button>
          </div>
        ))
      )}
    </div>
  )
}
