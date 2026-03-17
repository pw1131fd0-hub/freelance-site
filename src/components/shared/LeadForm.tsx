'use client'

import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InquirySchema, type InquiryInput } from '@/lib/schemas'
import { submitInquiry } from '@/actions/inquiry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Loader2 } from 'lucide-react'

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InquiryInput>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      projectType: 'Web Development',
    }
  });

  async function onSubmit(data: InquiryInput) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitInquiry(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch {
      setError('Unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-center p-12 flex flex-col items-center gap-6">
        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        <div className="space-y-2">
          <CardTitle className="text-3xl font-heading">Inquiry Received!</CardTitle>
          <CardDescription className="text-zinc-400 text-lg">
            Thank you for reaching out. I&apos;ll review your brief and get back to you within 24-48 hours.
          </CardDescription>
        </div>
      </Card>
    );
  } else {
    return (
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex justify-between items-start mb-4">
             <Badge variant="outline" className="text-zinc-500 font-mono">BUILD YOUR QUOTE</Badge>
             <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">NEW PROJECTS 2026</Badge>
          </div>
          <CardTitle className="text-3xl font-heading font-bold">What are we building?</CardTitle>
          <CardDescription className="text-zinc-500">Provide some context and I&apos;ll send you a custom proposal.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 focus:border-zinc-700 h-12"
                  {...form.register('name')}
                />
                {form.formState.errors.name && <p className="text-xs text-destructive font-mono uppercase">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 focus:border-zinc-700 h-12"
                  {...form.register('email')}
                />
                {form.formState.errors.email && <p className="text-xs text-destructive font-mono uppercase">{form.formState.errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="projectType" className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Project Category</Label>
                <select
                  id="projectType"
                  className="flex h-12 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...form.register('projectType')}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Branding & Identity">Branding & Identity</option>
                  <option value="Product Design">Product Design</option>
                  <option value="SEO & Strategy">SEO & Strategy</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Estimated Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 focus:border-zinc-700 h-12"
                  {...form.register('budget')}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Project Brief</Label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your goals, target audience, and key requirements..."
                className="flex min-h-[120px] w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register('message')}
              />
              {form.formState.errors.message && <p className="text-xs text-destructive font-mono uppercase">{form.formState.errors.message.message}</p>}
            </div>

            {error && <p className="text-sm text-destructive font-mono bg-destructive/10 p-3 border border-destructive/20 rounded-lg">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-bold transition-all"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Send Proposal Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
