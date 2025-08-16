type ModalType = "confirm" | "success" | "error" | "backToList" | "backToDetail" | "removeTask" | null;
type BannerType = "success" | "error" | null;

export interface modalState {
  isOpen: boolean;
  type: ModalType;
  message: string;
  title: string;
}

export interface ModalBannerState {
  modal: {
    isOpen: boolean;
    type: ModalType;
    message: string;
    title: string
  };
  banner: {
    isVisible: boolean;
    message: string;
    type: BannerType
  };
}