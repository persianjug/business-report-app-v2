import { useState, useCallback } from "react";
import { BannerState } from "@/types/modal";

export const useBanner = () => {
  const [bannerState, setBannerState] = useState<BannerState>({
    isVisible: false,
    message: "",
    type: null,
  });

  const showBanner = useCallback((state: BannerState) => {
    setBannerState(state);
  }, []);

  const closeBanner = useCallback(() => {
    setBannerState(prev => ({
      ...prev,
      isVisible: false,
      message: "",
      type: null,
    }));
  }, []);

  return {
    bannerState,
    showBanner,
    closeBanner,
  };
};