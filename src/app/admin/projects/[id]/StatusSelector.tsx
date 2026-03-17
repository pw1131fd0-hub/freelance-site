'use client'

import { useState } from 'react'
import { updateProjectStatus } from '@/actions/admin'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STATUSES = ['DISCOVERY', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ON_HOLD']

const statusColors: Record<string, string> = {
  'DISCOVERY': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'IN_PROGRESS': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'REVIEW': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'COMPLETED': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'ON_HOLD': 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
}

interface StatusSelectorProps {
  id: string
  currentStatus: string
}

export function StatusSelector({ id, currentStatus }: StatusSelectorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (newStatus: string) => {
    if (newStatus === currentStatus) return
    setIsLoading(true)
    await updateProjectStatus(id, newStatus)
    setIsLoading(false)
  }

  return (
    <Select value={currentStatus} onValueChange={handleUpdate} disabled={isLoading}>
      <SelectTrigger className={cn(
        "h-8 border-zinc-800 bg-zinc-950 text-[10px] font-mono uppercase tracking-widest rounded-none min-w-[140px]",
        statusColors[currentStatus]
      )}>
        {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800 rounded-none text-white font-mono uppercase text-[10px] tracking-widest">
        {STATUSES.map((status) => (
          <SelectItem 
            key={status} 
            value={status}
            className="focus:bg-zinc-800 focus:text-white cursor-pointer"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}