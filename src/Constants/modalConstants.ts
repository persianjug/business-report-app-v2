import { ModalBannerState, modalState } from "@/types/modal";

export const INITIAL_MODAL_STATE: modalState = {
  isOpen: false,
  type: null,
  message: "",
  title: "",
}

export const LOAD_LATEST_SUCCESS_MODAL_STATE: modalState = {
  isOpen: true,
  type: "success",
  title: "読み込み完了",
  message: "最新の報告書データを読み込みました。",
}

export const LOAD_LATEST_ERROR_MODAL_STATE: modalState = {
  isOpen: true,
  type: "error",
  title: "読み込み失敗",
  message: "最新の報告書データが見つかりませんでした。",
}

export const LOAD_LATEST_DIRTY_MODAL_STATE: modalState = {
  isOpen: true,
  type: "confirm",
  title: "最新報告書の読み込み",
  message: "現在入力中の内容は保存されません。最新の報告書を読み込みますか？",
}

export const INITIAL_MODAL_BANNER_STATE: ModalBannerState = {
  modal: {
    isOpen: false,
    type: null,
    message: "",
    title: ""
  },
  banner: {
    isVisible: false,
    message: "",
    type: null
  },
}

