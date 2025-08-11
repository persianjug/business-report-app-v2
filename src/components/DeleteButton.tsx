"use client";

import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface DeleteButtonProps {
  reportId: string | number;
}

export default function DeleteButton({ reportId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("本当にこの報告書を削除しますか？")) {
      try {
        await api.delete(`/reports/${reportId}`);
        alert("報告書が正常に削除されました");
        router.push("/reports");
      } catch (error) {
        console.error("報告書の削除に失敗しました:", error);
        alert("報告書の削除に失敗しました");
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>削除</Button>
  );
}
