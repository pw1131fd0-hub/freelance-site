import AdminNav from "@/components/shared/AdminNav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <AdminNav />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
