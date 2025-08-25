import { ReactNode, useRef, useEffect } from "react";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  children?: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  variant?: "confirm" | "success" | "error" | "loading";
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmButtonText = "OK",
  cancelButtonText = "キャンセル",
  variant = "confirm",
}: ConfirmationModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // モーダル開閉の制御
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const getConfirmButtonVariant = () => {
    if (variant === "error") return "danger";
    if (variant === "success") return "success";
    return "primary";
  };

  // variantが'loading'の場合、コンテンツを置き換える
  if (variant === "loading") {
    return (
      <dialog
        ref={dialogRef}
        className="backdrop:bg-gray-500/90 rounded-lg shadow-xl p-0 w-full max-w-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col items-center justify-center p-8">
          <LoadingSpinner />
          <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{message}</p>
        </div>
      </dialog>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-gray-500/90 rounded-lg shadow-xl p-0 w-full max-w-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onClose={onClose} // Escキーが押されたときにonCloseを呼び出す
    >
      <div className="px-6 py-4 border-b border-b-gray-400">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>

      <div className="px-6 py-4 mt-4">
        <p className="text-sm">{message}</p>
        {children}
      </div>

      <div className="px-6 py-4 mt-6 sm:flex sm:flex-row gap-x-4 justify-end">
        <Button
          variant="outline"
          onClick={onClose}
          className="mt-3 w-full sm:mt-0 sm:w-auto"
        >
          {cancelButtonText}
        </Button>
        {/* 確認/OKボタンをvariantに応じて表示 */}
        <Button
          variant={getConfirmButtonVariant()}
          onClick={onConfirm}
          className="w-full sm:ml-3 sm:w-auto"
        >
          {confirmButtonText}
        </Button>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;