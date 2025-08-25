"use client";

import { useEffect } from "react";

/**
 * 複数のオーバーレイコンポーネントの状態に基づいて、bodyのスクロールを制御するカスタムフック
 * @param states スクロールをロックすべきかを示す真偽値の配列
 */
export const useScrollLock = (states: boolean[]) => {
  useEffect(() => {
    // 少なくとも1つの状態がtrueであればスクロールをロックする
    const shouldLock = states.some(state => state);
    
    document.body.style.overflow = shouldLock ? "hidden" : "";

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "";
    };
  }, [states]);
};