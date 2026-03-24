export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      inquiries: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">客戶聯絡簿</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>客戶姓名</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>詢問次數</TableHead>
              <TableHead>最近活動</TableHead>
              <TableHead>電話/備註</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                  目前尚無客戶資料
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.inquiries.length}</TableCell>
                  <TableCell>
                    {format(new Date(customer.updatedAt), "yyyy/MM/dd")}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500 italic">
                    {customer.phone || customer.notes || "-"}
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
