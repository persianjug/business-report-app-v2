import { MouseEvent } from "react";
import { useModal } from "./useModal";
import { useReportDeletion } from "./useReportDeletion";
import { useReportExcelExport } from "./useReportExcelExport";

export const useReportDetail = (reportId: string | number) => {
  // モーダルの表示状態
  const { modalState, showModal, closeModal } = useModal();
  // データ削除のハンドラー
  const { handleRemoveReport } = useReportDeletion({ modalState, showModal, closeModal });
  // Excel出力のハンドラー
  const { handleExcelExport } = useReportExcelExport();

  return {
    handleRemoveReport,
    handleExcelExport: (event: MouseEvent<HTMLButtonElement>) => handleExcelExport(event, reportId),
    modalState,
    closeModal,
  }
}
