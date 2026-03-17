import { getInquiries } from "@/app/actions/inquiry";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusUpdater } from "./StatusUpdater";
import { format } from "date-fns";

export default async function AdminPage() {
  const result = await getInquiries();
  const inquiries = result.data;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">管理後台 - 詢問單清單</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>時間</TableHead>
              <TableHead>客戶</TableHead>
              <TableHead>預算</TableHead>
              <TableHead>需求描述</TableHead>
              <TableHead>目前狀態</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  目前尚無詢問單
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(inquiry.createdAt), "yyyy/MM/dd HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{inquiry.customer.name}</span>
                      <span className="text-xs text-slate-500">
                        {inquiry.customer.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{inquiry.budget || "未填寫"}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {inquiry.description}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={inquiry.status} />
                  </TableCell>
                  <TableCell>
                    <StatusUpdater id={inquiry.id} currentStatus={inquiry.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; color: string }> = {
    PENDING: { label: "待處理", color: "bg-slate-200 text-slate-700 hover:bg-slate-200" },
    CONTACTING: { label: "聯繫中", color: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    QUOTING: { label: "報價中", color: "bg-orange-100 text-orange-700 hover:bg-orange-100" },
    SIGNED: { label: "已簽約", color: "bg-green-100 text-green-700 hover:bg-green-100" },
    CLOSED: { label: "已結案", color: "bg-gray-100 text-gray-700 hover:bg-gray-100" },
    CANCELLED: { label: "已取消", color: "bg-red-100 text-red-700 hover:bg-red-100" },
  };

  const current = statusMap[status] || statusMap.PENDING;

  return (
    <Badge className={`${current.color} font-medium border-none`}>
      {current.label}
    </Badge>
  );
}
