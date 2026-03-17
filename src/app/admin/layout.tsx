import { UserNav } from "./UserNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b h-16 flex items-center px-8 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-lg">
                CRM
              </span>
              <span className="font-semibold text-slate-800 tracking-tight">
                Freelance Manager
              </span>
            </div>
            <nav className="flex gap-6 items-center">
              <a href="/admin/dashboard" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                儀表板
              </a>
              <a href="/admin" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                詢問單清單
              </a>
              <a href="/admin/customers" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                客戶聯絡簿
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <UserNav />
            <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-700 border-l pl-6">
              回前台
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t py-6 text-center text-slate-400 text-sm">
        &copy; 2026 Freelance Portfolio & CRM Dashboard
      </footer>
    </div>
  );
}
