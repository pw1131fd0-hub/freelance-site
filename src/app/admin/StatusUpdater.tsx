"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInquiryStatus } from "@/app/actions/inquiry";
import { toast } from "sonner";

export function StatusUpdater({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleValueChange(value: string | null) {
    if (!value || value === currentStatus) return;
    setLoading(true);
    try {
      const result = await updateInquiryStatus(id, value);
      if (result.success) {
        toast.success("狀態已更新");
      } else {
        toast.error("更新失敗");
      }
    } catch (error) {
      toast.error("發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleValueChange}
      disabled={loading}
    >
      <SelectTrigger className="w-[120px] h-8 text-xs">
        <SelectValue placeholder="切換狀態" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">待處理</SelectItem>
        <SelectItem value="CONTACTING">聯繫中</SelectItem>
        <SelectItem value="QUOTING">報價中</SelectItem>
        <SelectItem value="SIGNED">已簽約</SelectItem>
        <SelectItem value="CLOSED">已結案</SelectItem>
        <SelectItem value="CANCELLED">已取消</SelectItem>
      </SelectContent>
    </Select>
  );
}
