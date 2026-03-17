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
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft, Code, Palette, Zap, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'service', title: 'CHOOSE SERVICE' },
  { id: 'budget', title: 'BUDGET & TIMELINE' },
  { id: 'contact', title: 'CONTACT INFO' },
]

export function LeadForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InquiryInput>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      projectType: 'Web Development',
      name: '',
      email: '',
      message: '',
      budget: '',
      timeline: '',
    }
  });

  const nextStep = async () => {
    // Validate current step
    let fieldsToValidate: (keyof InquiryInput)[] = []
    if (currentStep === 0) fieldsToValidate = ['projectType']
    if (currentStep === 1) fieldsToValidate = ['budget', 'timeline']
    
    const isValid = await form.trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

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

  const selectedType = form.watch('projectType');

  if (submitted) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-center p-16 flex flex-col items-center gap-8 rounded-none border-l-4 border-l-emerald-500 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <div className="space-y-4">
          <CardTitle className="text-4xl font-heading font-bold uppercase tracking-tighter">Transmission Received</CardTitle>
          <CardDescription className="text-zinc-500 text-lg font-mono uppercase tracking-widest max-w-md mx-auto">
            YOUR BRIEF HAS BEEN LOGGED IN THE COMMAND CENTER. I&apos;LL RESPOND WITHIN 24 HOURS.
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          className="rounded-none border-zinc-800 hover:bg-zinc-950 font-mono text-xs uppercase tracking-widest px-8"
          onClick={() => { setSubmitted(false); setCurrentStep(0); form.reset(); }}
        >
          SEND ANOTHER
        </Button>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden border-l-4 border-l-white">
      <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-950/50">
        <div className="flex justify-between items-center mb-6">
           <div className="flex gap-1">
             {STEPS.map((step, i) => (
               <div key={step.id} className={cn("h-1 w-12 transition-all duration-500", i <= currentStep ? "bg-white" : "bg-zinc-800")} />
             ))}
           </div>
           <Badge variant="outline" className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-zinc-800">
             STEP {currentStep + 1} OF {STEPS.length}
           </Badge>
        </div>
        <CardTitle className="text-4xl font-heading font-bold uppercase tracking-tighter">{STEPS[currentStep].title}</CardTitle>
        <CardDescription className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-2">Initialize project brief / 2026-03-17</CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* STEP 0: Service Selection */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-right-4 duration-500">
              {[
                { id: 'Web Development', icon: Code, desc: 'Next.js, React, Full-stack' },
                { id: 'Branding & Identity', icon: Palette, desc: 'Logos, Guidelines, Vision' },
                { id: 'Product Design', icon: Zap, desc: 'UI/UX, Prototypes, Mobile' },
                { id: 'SEO & Strategy', icon: BarChart3, desc: 'Growth, Content, Analytics' },
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => form.setValue('projectType', item.id)}
                  className={cn(
                    "p-6 border cursor-pointer transition-all group flex flex-col gap-4",
                    selectedType === item.id 
                      ? "bg-white border-white text-black" 
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  )}
                >
                  <item.icon className={cn("w-8 h-8", selectedType === item.id ? "text-black" : "text-zinc-700 group-hover:text-zinc-500")} />
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold uppercase tracking-tight text-lg">{item.id}</h3>
                    <p className={cn("text-[10px] font-mono uppercase tracking-widest", selectedType === item.id ? "text-zinc-600" : "text-zinc-600")}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Budget & Timeline */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Estimated Budget (USD)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="5000"
                    className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 h-14 rounded-none pl-8 text-xl font-heading font-bold"
                    {...form.register('budget')}
                  />
                </div>
                <p className="text-[10px] text-zinc-600 font-mono uppercase">Budget helps me prioritize and scope correctly.</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timeline" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Timeline Requirement</Label>
                <select
                  id="timeline"
                  className="flex h-14 w-full rounded-none border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 font-mono uppercase tracking-widest"
                  {...form.register('timeline')}
                >
                  <option value="Immediate (ASAP)">Immediate (ASAP)</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="3-6 Months">3-6 Months</option>
                  <option value="Flexible / Future">Flexible / Future</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Contact Info & Brief */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              {/* Honeypot field - HIDDEN */}
              <div className="hidden" aria-hidden="true">
                <input type="text" {...form.register('honeypot')} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="JOHN DOE"
                    className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 h-12 rounded-none font-bold uppercase tracking-tight"
                    {...form.register('name')}
                  />
                  {form.formState.errors.name && <p className="text-[10px] text-destructive font-mono uppercase">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="JOHN@EXAMPLE.COM"
                    className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 h-12 rounded-none font-bold uppercase tracking-tight"
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && <p className="text-[10px] text-destructive font-mono uppercase">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Project Brief</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="TELL ME ABOUT YOUR GOALS, CHALLENGES, AND VISION..."
                  className="flex min-h-[120px] w-full rounded-none border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm ring-offset-background placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 uppercase font-mono tracking-tight"
                  {...form.register('message')}
                />
                {form.formState.errors.message && <p className="text-[10px] text-destructive font-mono uppercase">{form.formState.errors.message.message}</p>}
              </div>

              {error && <p className="text-[10px] text-destructive font-mono bg-destructive/10 p-3 border border-destructive/20">{error}</p>}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="h-14 px-8 rounded-none border-zinc-800 hover:bg-zinc-950 text-zinc-500 font-mono text-xs uppercase tracking-widest gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> PREVIOUS
              </Button>
            )}
            
            {currentStep < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-grow h-14 rounded-none bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest gap-2 transition-all"
              >
                CONTINUE TO {STEPS[currentStep + 1].title} <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-grow h-14 rounded-none bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest gap-2 transition-all"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE TRANSMISSION'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}