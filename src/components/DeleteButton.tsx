"use client";

import api from "@/utils/axios";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({ reportId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("本当にこの報告書を削除しますか？")) {
      try {
        await api.delete(`/reports/${reportId}`);
        alert("報告書が正常に削除されました");
        router.push("/reports"); // 削除後に一覧ページへ戻る
      } catch (error) {
        console.error("報告書の削除に失敗しました:", error);
        alert("報告書の削除に失敗しました");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm">
      削除
    </button>
  );
}
