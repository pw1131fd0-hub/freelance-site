'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginInput } from '@/lib/schemas'
import { login } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    setError(null)
    try {
      const result = await login(data)
      if (result.success) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(result.error || 'Login failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
             <Lock className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-white">COMMAND CENTER</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">RESTRICTED ACCESS — SOLOPRENEUR v1.0</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 rounded-none">
          <CardHeader className="p-8 border-b border-zinc-800 bg-zinc-950/50">
            <CardTitle className="text-xl font-heading font-bold uppercase tracking-tight">Login</CardTitle>
            <CardDescription className="text-zinc-500 font-mono text-[10px] uppercase">AUTHENTICATE TO MANAGE YOUR BUSINESS</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@solopreneur.one"
                  className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 h-12 rounded-none"
                  {...form.register('email')}
                />
                {form.formState.errors.email && <p className="text-xs text-destructive font-mono uppercase">{form.formState.errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700 h-12 rounded-none"
                  {...form.register('password')}
                />
                {form.formState.errors.password && <p className="text-xs text-destructive font-mono uppercase">{form.formState.errors.password.message}</p>}
              </div>

              {error && <p className="text-xs text-destructive font-mono bg-destructive/10 p-3 border border-destructive/20">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-none bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest transition-all"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE SESSION'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-zinc-700 text-[10px] font-mono uppercase tracking-widest">
           SECURE ENCRYPTION ACTIVE
        </p>
      </div>
    </div>
  )
}
