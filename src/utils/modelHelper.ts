import { ModalState } from "@/types/modal";

/**
 * 入力内容の破棄確認モーダルの状態を生成します。
 * @param onConfirm - 確定時に実行される関数
 * @param onClose - キャンセル時に実行される関数
 * @returns ModalState
 */
export const createDiscardModalState = (onConfirm: () => void, onClose: () => void): ModalState => ({
  isOpen: true,
  type: "backToList",
  title: "入力内容の破棄確認",
  message: "入力中の内容が破棄されますがよろしいですか？",
  variant: "error",
  confirmButtonText: "入力内容を破棄する",
  cancelButtonText: "キャンセル",
  onConfirm,
  onClose,
});

/**
 * 最新報告書読み込み確認モーダルの状態を生成します。
 * @param onConfirm - 確定時に実行される関数
 * @param onClose - キャンセル時に実行される関数
 * @returns ModalState
 */
export const createLoadLatestModalState = (onConfirm: () => void, onClose: () => void): ModalState => ({
  isOpen: true,
  type: "confirm",
  title: "最新報告書の読み込み",
  message: "現在入力中の内容は保存されません。最新の報告書を読み込みますか？",
  variant: "error",
  confirmButtonText: "最新報告書を読み込む",
  cancelButtonText: "キャンセル",
  onConfirm,
  onClose,
});

/**
 * タスク削除確認モーダルの状態を生成します。
 * @param index - 削除対象のタスクインデックス
 * @param onConfirm - 確定時に実行される関数
 * @param onClose - キャンセル時に実行される関数
 * @returns ModalState
 */
export const createTaskDeletionModalState = (index: number, onConfirm: () => void, onClose: () => void): ModalState => ({
  isOpen: true,
  type: "removeTask",
  title: `タスクの削除（タスク${index + 1}）`,
  message: "本当にこのタスクを削除しますか？元にに戻せません。",
  variant: "error",
  confirmButtonText: "タスクを削除する",
  cancelButtonText: "キャンセル",
  onConfirm,
  onClose,
});

/**
 * 報告書削除確認モーダルの状態を生成します。
 * @param reportId - 削除対象の報告書ID
 * @param status - 報告書のステータス ("published" or "draft")
 * @param onConfirm - 確定時に実行される関数
 * @param onClose - キャンセル時に実行される関数
 * @returns ModalState
 */
export const createReportDeletionModalState = (reportId: string | number, status: "published" | "draft", onConfirm: () => void, onClose: () => void): ModalState => {
  const title = `${status === "published" ? "報告書" : "下書きデータ"}の削除（ID:${reportId}）`;
  const message = `${status === "published" ? "報告書" : "下書きデータ"}`;

  return {
    isOpen: true,
    type: "removeReport",
    title,
    message: `本当にこの${message}を削除しますか？元にに戻せません。`,
    variant: "error",
    confirmButtonText: `${message}を削除する`,
    cancelButtonText: "キャンセル",
    onConfirm,
    onClose,
  };
};
