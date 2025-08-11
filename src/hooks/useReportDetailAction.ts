import { useRouter } from "next/navigation";
import { deleteReport, fetchExcelFile } from "@/lib/report";
import { MouseEvent, useState } from "react";

export const useReportDetailActions = (reportId: string | number) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    // if (window.confirm("本当にこの報告書を削除しますか？")) {
    try {
      // await deleteReport(reportId);
      console.info("報告書が正常に削除されました");
      router.push("/reports");
    } catch (error) {
      console.error("報告書の削除に失敗しました。:", error);
    }
    // }
  };

  const handleExcelExport = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 親のリンクへの遷移を防ぐ
    event.stopPropagation(); // イベントのバブリングも停止する

    try {
      await fetchExcelFile(reportId);
    } catch (error) {
      alert("Excelファイルのダウンロードに失敗しました。");
    }
  };

  return {
    handleDelete,
    handleExcelExport,
    isModalOpen,
    setIsModalOpen,
  };
};
