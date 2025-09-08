import { MouseEvent } from "react";
import { fetchExcelFile } from "@/lib/report";
import { useToastsAndNavigation } from "./useToastsAndNavigation";

export const useReportExcelExport = () => {
  // 成功、エラー時の通知
  const { handleSuccess, handleError } = useToastsAndNavigation();

  // 「Excel出力」ボタン押下時のハンドラー
  const handleExcelExport = async (event: MouseEvent<HTMLButtonElement>, reportId: string | number) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await fetchExcelFile(reportId);
      handleSuccess(`報告書（ID:${reportId}）のExcelダウンロードしました。`);
    } catch (error) {
      handleError(error as Error, `報告書（ID:${reportId}）のExcelダウンロードが失敗しました。`);
    }
  };

  return {
    handleExcelExport,
  };
};