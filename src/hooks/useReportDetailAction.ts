import { useRouter } from "next/navigation";
import { deleteReportTest, fetchExcelFile } from "@/lib/report";
import { MouseEvent, useState } from "react";
import { useBanner } from "./useBanner";
import { useModal } from "./useModal";
import { BannerState, ModalState } from "@/types/modal";

export const useReportDetailActions = (reportId: string | number) => {
  const router = useRouter();
  const { bannerState, showBanner, closeBanner } = useBanner();
  const { modalState, showModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const performRemoveReport = async (reportId: string | number | null) => {
    setIsLoading(true);
    try {
      // await deleteReport(reportId);
      await deleteReportTest(reportId);
      console.info("報告書が正常に削除されました");
      closeModal();
      const state: BannerState = {
        isVisible: true,
        message: `報告書データ（ID:${reportId}）が削除されました。`,
        type: "success",
        onClose: closeModal,
      }
      showBanner(state);

      // 2秒後に一覧ページへ遷移
      setTimeout(() => {
        router.push("/reports");
      }, 2000);
    } catch (error) {
      console.error("報告書の削除に失敗しました。:", error);
      closeModal();
      const state: BannerState = {
        isVisible: true,
        message: `報告書データ（ID:${reportId}）の削除が失敗しました。`,
        type: "error",
      }
      showBanner(state);

    } finally {
      setIsLoading(false);
    }
  }

  // onConfirmで実行される関数
  // const performRemoveReport = async () => {
  //   // API呼び出し中はモーダル内にローディング表示
  //   showModal({
  //     ...modalState, // 現在のモーダル状態を維持
  //     title: "削除中...",
  //     message: "報告書を削除しています。しばらくお待ちください。",
  //     // ローディング中はボタンを非表示にする
  //     confirmButtonText: "", 
  //     cancelButtonText: "",
  //     onConfirm: () => {}, // ローディング中は空の関数
  //     onClose: () => {}, // ローディング中は空の関数
  //     variant: "loading", // 新しいバリアント
  //   });
    
  //   try {
  //     // await deleteReport(reportId);
  //     console.info("報告書が正常に削除されました");
  //     // 成功したらモーダルの内容を更新
  //     showModal({
  //       isOpen: true,
  //       type: "success",
  //       title: "削除完了",
  //       message: `報告書データ（ID:${reportId}）が正常に削除されました。`,
  //       confirmButtonText: "OK",
  //       cancelButtonText: null, // ボタンを1つに
  //       onConfirm: () => {
  //         closeModal();
  //         // 画面遷移
  //         router.push("/reports");
  //       },
  //       onClose: () => {
  //         closeModal();
  //         router.push("/reports");
  //       },
  //     });
      
  //   } catch (error) {
  //     console.error("報告書の削除に失敗しました。:", error);
  //     showModal({
  //       isOpen: true,
  //       type: "error",
  //       title: "削除失敗",
  //       message: `報告書データ（ID:${reportId}）の削除が失敗しました。`,
  //       confirmButtonText: "閉じる",
  //       cancelButtonText: null,
  //       onConfirm: closeModal,
  //       onClose: closeModal,
  //     });
  //   }
  // };

  const handleRemoveReport = async (reportId: string | number | null) => {
    const state: ModalState = {
      isOpen: true,
      type: "removeReport",
      title: `報告書データの削除（ID:${reportId}）`,
      message: "本当にこの報告書データを削除しますか？元にに戻せません。",
      variant: "error",
      confirmButtonText: "報告書データを削除する",
      cancelButtonText: "キャンセル",
      onConfirm: () => performRemoveReport(reportId),
      onClose: closeModal,
    }
    showModal(state);
  }

  const handleExcelExport = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 親のリンクへの遷移を防ぐ
    event.stopPropagation(); // イベントのバブリングも停止する

    try {
      await fetchExcelFile(reportId);
      console.info("報告書データのExcelダウンロードしました。:");
      const state: BannerState = {
        isVisible: true,
        message: `報告書データ（ID:${reportId}）のExcelダウンロードしました。`,
        type: "error",
        onClose: closeBanner,
      }
      showBanner(state);
    } catch (error) {
      console.error("報告書データのExcelダウンロードが失敗しました。:", error);
      const state: BannerState = {
        isVisible: true,
        message: `報告書データ（ID:${reportId}）のExcelダウンロードが失敗しました。`,
        type: "error",
        onClose: closeBanner,
      }
      showBanner(state);
    }
  }

  return {
    handleRemoveReport,
    handleExcelExport,
    modalState,
    bannerState,
    isLoading,
    closeModal,
  }
}
