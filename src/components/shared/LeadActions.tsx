'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Trash2, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react'
import { qualifyLead, convertLead, deleteInquiry } from '@/actions/admin'

interface LeadActionsProps {
  id: string
  email: string
  projectType: string
}

export function LeadActions({ id, email, projectType }: LeadActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleQualify = async () => {
    setIsLoading(true)
    await qualifyLead(id, 'QUALIFIED')
    setIsLoading(false)
  }

  const handleConvert = async () => {
    setIsLoading(true)
    await convertLead(id)
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    setIsLoading(true)
    await deleteInquiry(id)
    setIsLoading(false)
  }

  return (
    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={`mailto:${email}?subject=Re: Your ${projectType} inquiry`}>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800">
          <Mail className="h-4 w-4" />
        </Button>
      </a>
      
      <Button 
        size="icon" 
        variant="ghost" 
        disabled={isLoading}
        onClick={handleQualify}
        className="h-8 w-8 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10"
      >
        <CheckCircle className="h-4 w-4" />
      </Button>

      <Button 
        size="icon" 
        variant="ghost" 
        disabled={isLoading}
        onClick={handleConvert}
        className="h-8 w-8 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>

      <Button 
        size="icon" 
        variant="ghost" 
        disabled={isLoading}
        onClick={handleDelete}
        className="h-8 w-8 text-zinc-500 hover:text-destructive hover:bg-destructive/10"
      >
        {isLoading ? <Loader2 className="h-4 h-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
