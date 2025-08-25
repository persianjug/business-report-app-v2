import { ModalState } from "@/types/modal";
import { useState } from "react";

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: "",
    title: "",
    type: null,
  });

  const showModal = (state: ModalState) => {
    setModalState(state);
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false,
      Type: null,
    }));
  }

  return {
    modalState,
    showModal,
    closeModal,
  };
}

