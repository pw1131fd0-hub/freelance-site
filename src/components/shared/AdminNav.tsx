'use client'

import Link from "next/link";
import { Users, FileText, Briefcase, Zap, Home, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter()
  const items = [
    { label: "DASHBOARD", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "CRM / LEADS", icon: Users, href: "/admin/crm" },
    { label: "PROJECTS", icon: Briefcase, href: "/admin/projects" },
    { label: "CLIENTS", icon: FileText, href: "/admin/clients" },
    { label: "ASSET VAULT", icon: Zap, href: "/admin/assets" },
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="w-64 border-r border-zinc-900 flex flex-col gap-8 p-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 h-screen overflow-y-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-heading font-bold uppercase tracking-tighter">COMMAND CENTER</h2>
        <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest leading-none">SOLOPRENEUR v1.0</p>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-none font-mono text-xs font-medium tracking-widest group">
              <item.icon className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="pt-8 border-t border-zinc-900 flex flex-col gap-2">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-600 hover:text-white hover:bg-zinc-900 rounded-none font-mono text-[10px] uppercase tracking-widest">
            <Home className="w-4 h-4" />
            BACK TO PORTFOLIO
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-none font-mono text-[10px] uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" />
          TERMINATE SESSION
        </Button>
      </div>
    </nav>
  )
}
