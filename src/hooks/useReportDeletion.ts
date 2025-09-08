import { deleteReport } from "@/lib/report";
import { useModal } from "./useModal";
import { useToastsAndNavigation } from "./useToastsAndNavigation";
import { createReportDeletionModalState } from "@/utils/modelHelper";

// useModalから返される型を明示的に使用
type UseModalReturn = ReturnType<typeof useModal>;

export const useReportDeletion = (useModalReturn: UseModalReturn) => {
  // モーダルの表示状態
  // const { showModal, closeModal } = useModal();
  const { showModal, closeModal } = useModalReturn;
  // 成功、エラー時の通知
  const { handleSuccess, handleError } = useToastsAndNavigation();

  // 報告書を物理的に削除するコアな処理
  const performRemoveReport = async (reportId: string | number, status: "published" | "draft") => {
    const message = `${status === "published" ? "報告書" : "下書きデータ"}（ID:${reportId}）`;
    try {
      await deleteReport(reportId);
      handleSuccess(`${message}が削除されました。`, "/reports");
    } catch (error) {
      handleError(error as Error, `${message}の削除が失敗しました。`);
    } finally {
      closeModal();
    }
  };

  // 削除確認モーダルを表示し、削除処理を実行するハンドラー
  const handleRemoveReport = (reportId: string | number, status: "published" | "draft") => {
    showModal(createReportDeletionModalState(reportId, status, () => performRemoveReport(reportId, status), closeModal));
  };

  return {
    handleRemoveReport,
    performRemoveReport,
    modalState: { isOpen: false, onClose: () => { }, onConfirm: () => { } }
  }; // modalStateは useModal から取得し、必要な部分だけ返す
};