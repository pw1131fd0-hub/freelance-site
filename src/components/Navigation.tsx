"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-slate-900 dark:text-white"
        >
          OpenClaw<span className="text-blue-500">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/#work"
            className="hidden sm:block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/blog"
            className="hidden sm:block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hidden sm:block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Contact
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <Link
            href="/contact"
            className="hidden sm:inline-flex ml-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
