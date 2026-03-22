export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default async function DashboardPage() {
  const totalInquiries = await prisma.inquiry.count();
  const pendingInquiries = await prisma.inquiry.count({
    where: { status: "PENDING" },
  });
  const signedInquiries = await prisma.inquiry.count({
    where: { status: "SIGNED" },
  });

  const stats = [
    {
      title: "總詢問數",
      value: totalInquiries,
      icon: <Users className="h-4 w-4 text-slate-500" />,
      description: "所有時間的累積",
    },
    {
      title: "待處理",
      value: pendingInquiries,
      icon: <Clock className="h-4 w-4 text-orange-500" />,
      description: "需要儘快回覆",
    },
    {
      title: "已成交",
      value: signedInquiries,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      description: "已簽約專案數",
    },
    {
      title: "轉換率",
      value: totalInquiries > 0 
        ? `${((signedInquiries / totalInquiries) * 100).toFixed(1)}%` 
        : "0%",
      icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
      description: "成交佔總詢問比例",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">數據總覽 Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">歡迎使用 CRM 後台</h2>
        <p className="text-slate-600 mb-4">
          這裡是您的接案中心。您可以在此查看所有新進案件，追蹤客戶聯絡狀況，並管理您的接案流程。
        </p>
        <div className="flex gap-4">
          <a 
            href="/admin" 
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            → 前往管理詢問單清單
          </a>
        </div>
      </div>
    </div>
  );
}
