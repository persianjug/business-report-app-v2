type ModalType = "confirm" | "success" | "error" | "backToList" | "backToDetail" | "removeTask" | "removeReport" | null;
type BannerType = "success" | "error" | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  message: string;
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  variant?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export interface BannerState {
  isVisible: boolean;
  message: string;
  type: BannerType
  onClose?: () => void;
}

export interface ModalBannerState {
  modal: {
    isOpen: boolean;
    type: ModalType;
    message: string;
    title: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    variant?: string;
    onClose?: () => void;
    onConfirm?: () => void;
  };
  banner: {
    isVisible: boolean;
    message: string;
    type: BannerType
    onClose?: () => void;
  };
}