"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserNav() {
  const { data: session } = useSession();
  
  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-600">
        Hi, <span className="font-semibold text-slate-800">{session.user?.name || session.user?.email}</span>
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-xs h-8 border-slate-200 hover:bg-slate-50 hover:text-red-600 transition-colors"
      >
        登出
      </Button>
    </div>
  );
}
